// src/components/utils.js
// AI-enhanced offline matching utilities
import stringSimilarity from 'string-similarity'
import _ from 'lodash'

/*
 Configurable thresholds (can be changed via setThresholds)
 - invoiceSimThreshold: invoice-number similarity to treat as automatic match
 - gstinSimThreshold: GSTIN similarity (usually exact, but small tolerance)
 - amountTolerancePercent: percent tolerance to consider amount OK
 - suspiciousPercent: percent threshold to mark as suspicious instead of minor typo
*/
const DEFAULT_THRESHOLDS = {
  invoiceSimThreshold: 0.88,
  gstinSimThreshold: 0.95,
  amountTolerancePercent: 2,   // 2% tolerance => small rounding/formatting differences
  suspiciousPercent: 10       // >10% difference flagged as suspicious
}

const LOCAL_KEY = 'itc_thresholds_v1'

export function setThresholds(newThresh) {
  const cur = getThresholds()
  const merged = {...cur, ...newThresh}
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(merged)) } catch(e) {}
  return merged
}

export function getThresholds() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (raw) return {...DEFAULT_THRESHOLDS, ...JSON.parse(raw)}
  } catch(e) {}
  return {...DEFAULT_THRESHOLDS}
}

/* small helpers */
function parseAmount(value) {
  if (value === undefined || value === null || value === '') return 0
  const s = String(value).replace(/[^0-9.-]+/g,'')
  const n = parseFloat(s || '0')
  return Number.isNaN(n) ? 0 : n
}

function normalizeInvoiceNo(s) {
  if (!s) return ''
  return String(s).trim().toUpperCase().replace(/[^A-Z0-9\\/-]/g,'')
}

function normalizeGstin(s) {
  if (!s) return ''
  return String(s).trim().toUpperCase().replace(/[^A-Z0-9]/g,'')
}

function parseDate(v) {
  if (!v) return new Date(0)
  // handle Date objects and common strings
  if (v instanceof Date) return v
  const d = new Date(v)
  if (!isNaN(d)) return d
  const parts = String(v).split(/[\\/\\-]/).map(p=>Number(p))
  if (parts.length>=3) return new Date(parts[2], parts[1]-1, parts[0])
  return new Date(0)
}

/* Natural-language helper to describe an item difference */
function explainDifference(invAmount, gstrAmount) {
  const diff = invAmount - gstrAmount
  const abs = Math.abs(diff)
  if (abs === 0) return 'Amounts equal'
  return diff > 0 ? `Invoice amount ₹${abs.toFixed(2)} higher than GSTR-2B` : `Invoice amount ₹${abs.toFixed(2)} lower than GSTR-2B`
}

/*
 Main computeMatches function (keeps same name as older code)
 Returns array of objects with fields:
  - gstin, invoiceNumber, invoiceDate, amount
  - matched (bool)
  - matchedRecord (the matched gstr row or null)
  - reason (string)
  - confidence (0..1)
  - difference (invoiceAmount - gstrAmount)
*/
export function computeMatches(invoicesRaw, gstrRaw) {
  const thresholds = getThresholds()

  // normalize inputs
  const invoices = invoicesRaw.map(r => ({
    raw: r,
    gstin: normalizeGstin(r['GSTIN'] || r.GSTIN || r.gstin || ''),
    invoiceNumber: normalizeInvoiceNo(r['Invoice No'] || r.InvoiceNumber || r.invoice || r['Invoice No'] || ''),
    invoiceDate: parseDate(r['Invoice Date'] || r.InvoiceDate || r.date || r.Date),
    amount: parseAmount(r['Amount'] || r.Total || r.Value || r['Invoice Amount'] || r.InvoiceAmount)
  }))

  const gstr2b = gstrRaw.map(r => ({
    raw: r,
    gstin: normalizeGstin(r['GSTIN'] || r.GSTIN || r.gstin || ''),
    invoiceNumber: normalizeInvoiceNo(r['Invoice No'] || r.InvoiceNumber || r.invoice || r['Invoice No'] || ''),
    invoiceDate: parseDate(r['Invoice Date'] || r.InvoiceDate || r.date || r.Date),
    amount: parseAmount(r['Amount'] || r.Total || r.Value || r['Invoice Amount'] || r.InvoiceAmount)
  }))

  // index gstr by GSTIN for quick lookup
  const gstrByGstin = _.groupBy(gstr2b, 'gstin')

  const results = invoices.map(inv => {
    const group = gstrByGstin[inv.gstin] || []

    if (group.length === 0) {
      // maybe GSTIN typed wrong — try fuzzy GSTIN search across all gstr2b
      const allGstins = [...new Set(gstr2b.map(g=>g.gstin).filter(Boolean))]
      if (allGstins.length > 0) {
        const bestGstin = stringSimilarity.findBestMatch(inv.gstin || '', allGstins)
        const bestScore = bestGstin.bestMatch.rating
        if (bestScore >= thresholds.gstinSimThreshold) {
          // suggest alternate gstin match
          const matchedList = gstr2b.filter(g => g.gstin === bestGstin.bestMatch.target)
          // fall through to matching in that group
          return matchWithinGroup(inv, matchedList, thresholds)
        }
      }
      // no gstin found — mark missing
      return {
        ...inv,
        matched: false,
        matchedRecord: null,
        reason: 'GSTIN not found in GSTR-2B',
        confidence: 0.05,
        difference: inv.amount
      }
    }

    // else try to match inside group
    return matchWithinGroup(inv, group, thresholds)
  })

  return results
}

/* matchWithinGroup: helper to match an invoice to items in gstr group */
function matchWithinGroup(inv, group, thresholds) {
  // 1) try exact invoice number match
  const exact = group.find(g => g.invoiceNumber && inv.invoiceNumber && g.invoiceNumber === inv.invoiceNumber)
  if (exact) {
    const diff = inv.amount - exact.amount
    const dateDiffDays = Math.abs((exact.invoiceDate - inv.invoiceDate)/(1000*60*60*24))
    const amtPct = exact.amount ? (Math.abs(diff) / Math.max(1, exact.amount)) * 100 : 0
    const amtOk = amtPct <= thresholds.amountTolerancePercent
    const dateOk = dateDiffDays <= 3
    const issues = []
    if (!amtOk) issues.push('amount')
    if (!dateOk) issues.push('date')
    const matched = issues.length === 0
    const confidence = matched ? 0.98 : Math.max(0.5, 1 - (amtPct/100))
    const reason = matched ? 'Exact match' : `Exact invoice matched with issues: ${issues.join(', ')} (${explainDifference(inv.amount, exact.amount)})`
    return {
      ...inv,
      matched,
      matchedRecord: exact,
      reason,
      confidence,
      difference: diff
    }
  }

  // 2) fuzzy invoice number matching using string-similarity
  const candidates = group.filter(g => g.invoiceNumber)
  if (candidates.length > 0) {
    const scores = candidates.map(g => ({
      g,
      score: stringSimilarity.compareTwoStrings(inv.invoiceNumber || '', g.invoiceNumber || '')
    }))
    scores.sort((a,b)=>b.score - a.score)
    const best = scores[0]
    if (best && best.score >= thresholds.invoiceSimThreshold) {
      // strong fuzzy match
      const diff = inv.amount - best.g.amount
      const amtPct = best.g.amount ? (Math.abs(diff)/Math.max(1,best.g.amount)) * 100 : 0
      const dateDiffDays = Math.abs((best.g.invoiceDate - inv.invoiceDate)/(1000*60*60*24))
      const issues = []
      if (amtPct > thresholds.amountTolerancePercent) issues.push('amount')
      if (dateDiffDays > 3) issues.push('date')
      const matched = issues.length === 0
      const confidence = Math.max(0.6, best.score * 0.95 - (amtPct/200))
      const reason = `Fuzzy invoice match (score ${best.score.toFixed(2)})` + (issues.length ? ` with issues: ${issues.join(', ')}` : '')
      return {
        ...inv,
        matched,
        matchedRecord: best.g,
        reason,
        confidence,
        difference: diff
      }
    }
  }

  // 3) try amount-based match (same/similar amount)
  const byAmount = group.map(g => ({ g, amtDiffPct: g.amount ? (Math.abs(g.amount - inv.amount)/Math.max(1,g.amount))*100 : 100 }))
    .sort((a,b)=>a.amtDiffPct - b.amtDiffPct)[0]

  if (byAmount && byAmount.amtDiffPct <= 3) { // <=3% amount similarity
    const g = byAmount.g
    const diff = inv.amount - g.amount
    const confidence = Math.max(0.4, 1 - (byAmount.amtDiffPct/100))
    const reason = `Matched by amount (diff ${byAmount.amtDiffPct.toFixed(2)}%)`
    return {
      ...inv,
      matched: Math.abs(diff) <= (g.amount * (thresholds.amountTolerancePercent/100)),
      matchedRecord: g,
      reason,
      confidence,
      difference: diff
    }
  }

  // 4) no match found in group
  return {
    ...inv,
    matched: false,
    matchedRecord: null,
    reason: 'No matching invoice found in GSTR-2B (within tolerance)',
    confidence: 0.08,
    difference: inv.amount
  }
}

/* Generate short natural-language summary to show on dashboard or email body */
export function generateSummary(results) {
  const total = results.length
  const matched = results.filter(r => r.matched).length
  const mismatched = total - matched
  const potentialLeak = results.reduce((acc,r) => acc + (r.difference && r.difference>0 ? r.difference : 0), 0)

  // top reasons counts
  const reasons = _.countBy(results.map(r => r.reason || 'Unknown'))
  const topReasons = Object.entries(reasons).sort((a,b)=>b[1]-a[1]).slice(0,4)

  const lines = []
  lines.push(`Total invoices checked: ${total}`)
  lines.push(`Matched: ${matched}, Mismatched/Missing: ${mismatched}`)
  lines.push(`Estimated potential ITC at risk: ₹${potentialLeak.toFixed(2)}`)
  lines.push(`Top reasons:`)
  topReasons.forEach(([reason, cnt]) => lines.push(`- ${reason} (${cnt})`))

  return lines.join('\\n')
}
