import React, { useState } from 'react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { computeMatches } from './utils'

export default function UploadForm({ onResults }) {
  const [invFile, setInvFile] = useState(null)
  const [gstrFile, setGstrFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const name = file.name.toLowerCase()
      if (name.endsWith('.csv')) {
        Papa.parse(file, { header: true, skipEmptyLines: true, complete: (res) => resolve(res.data), error: reject })
      } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result)
          const wb = XLSX.read(data, { type: 'array' })
          const sheet = wb.Sheets[wb.SheetNames[0]]
          const json = XLSX.utils.sheet_to_json(sheet, { defval: '' })
          resolve(json)
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      } else {
        reject(new Error('Unsupported file type'))
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!invFile || !gstrFile) { setError('Please select both files'); return }
    setError(''); setLoading(true)
    try {
      const inv = await readFile(invFile)
      const gstr = await readFile(gstrFile)
      const results = computeMatches(inv, gstr)
      const leak = results.reduce((acc, r) => acc + (r.difference && r.difference > 0 ? r.difference : 0), 0)
      onResults(results, leak)
    } catch (err) {
      console.error(err); setError(err.message || 'Error reading files')
    }
    setLoading(false)
  }

  const sendEmail = () => {
    if (!window.emailjs) { alert('EmailJS SDK not loaded. Add it from https://cdn.emailjs.com/sdk/2.3.2/email.min.js'); return }
    const templateParams = {
      to_email: email,
      message: 'Please find attached ITC mismatch report (download from UI).'
    }
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } = require('./utils').EMAILJS_CONFIG
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then(() => alert('Email sent (note: template must be configured in EmailJS)'), (err) => alert('Email send failed: ' + err.text))
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#f5f0e6', // beige background
        padding: '20px',
        borderRadius: '12px',
        fontFamily: "'Playfair Display', serif",
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: '#5a4632'
      }}
    >
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <label style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>Invoices (CSV or XLSX)</div>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={e => setInvFile(e.target.files[0])}
            style={inputStyle}
          />
        </label>
        <label style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>GSTR-2B (CSV or XLSX)</div>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={e => setGstrFile(e.target.files[0])}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: 'flex', marginTop: '16px', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button style={buttonPrimary} type="submit" disabled={loading}>
          {loading ? 'Running...' : 'Run Match'}
        </button>
        <button type="button" style={buttonSecondary} onClick={() => { window.open('/sample_data/company_invoices.csv'); }}>
          Download sample invoices
        </button>
        <button type="button" style={buttonSecondary} onClick={() => { window.open('/sample_data/gstr2b_data.csv'); }}>
          Download sample GSTR-2B
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d3bfa5', fontFamily: "'Playfair Display', serif" }}
          />
          <button type="button" style={buttonPrimary} onClick={sendEmail}>
            Send Report (EmailJS)
          </button>
        </div>
      </div>

      {error && <div style={{ color: '#a3473f', marginTop: '8px' }}>{error}</div>}
      <div style={{ fontSize: '12px', marginTop: '8px', color: '#7a5c3f' }}>
        Note: For EmailJS, configure service/template/user IDs in <code>src/components/utils.js</code>
      </div>
    </form>
  )
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #d3bfa5',
  backgroundColor: '#fff8f0',
  fontFamily: "'Playfair Display', serif"
}

const buttonPrimary = {
  backgroundColor: '#6e4c1e',
  color: 'white',
  padding: '8px 14px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: "'Playfair Display', serif"
}

const buttonSecondary = {
  backgroundColor: '#d3bfa5',
  color: '#3b2f2f',
  padding: '8px 14px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: "'Playfair Display', serif"
}
