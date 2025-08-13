import React from 'react'
import * as XLSX from 'xlsx'

export default function ResultsTable({ results }) {
  if (!results || results.length === 0)
    return (
      <div
        style={{
          backgroundColor: '#f5f0e6',
          padding: '16px',
          borderRadius: '12px',
          fontFamily: "'Playfair Display', serif",
          color: '#5a4632',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        No results
      </div>
    )

  const exportXlsx = () => {
    const data = results.map((r) => ({
      GSTIN: r.gstin,
      InvoiceNumber: r.invoiceNumber,
      InvoiceDate: new Date(r.invoiceDate).toLocaleDateString(),
      InvoiceAmount: r.amount,
      Matched: r.matched ? 'Yes' : 'No',
      Reason: r.reason,
      Difference: r.difference || 0,
      Confidence: Math.round((r.confidence || 0) * 100),
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Results')
    XLSX.writeFile(wb, 'itc_results.xlsx')
  }

  const exportCsv = () => {
    const header = Object.keys(results[0]).join(',') + '\n'
    const rows = results
      .map((r) =>
        Object.values(r)
          .map((v) => '"' + String(v).replace(/"/g, '""') + '"')
          .join(',')
      )
      .join('\n')
    const csv = header + rows
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'itc_results.csv'
    a.click()
  }

  return (
    <div
      style={{
        backgroundColor: '#f5f0e6',
        padding: '20px',
        borderRadius: '12px',
        fontFamily: "'Playfair Display', serif",
        color: '#5a4632',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0, color: '#3b2f2f' }}>
          Results ({results.length})
        </h3>
        <div>
          <button style={buttonPrimary} onClick={exportXlsx}>
            Export Excel
          </button>
          <button
            style={{ ...buttonSecondary, marginLeft: 8 }}
            onClick={exportCsv}
          >
            Export CSV
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#d3bfa5', color: '#3b2f2f' }}>
              <th style={thStyle}>GSTIN</th>
              <th style={thStyle}>Invoice No</th>
              <th style={thStyle}>Date</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={thStyle}>Matched</th>
              <th style={thStyle}>Reason</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Diff</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Conf%</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr
                key={i}
                style={{
                  background: r.matched ? '#e7f2ec' : '#fcebea',
                  borderBottom: '1px solid #d3bfa5',
                }}
              >
                <td style={tdStyle}>{r.gstin}</td>
                <td style={tdStyle}>{r.invoiceNumber}</td>
                <td style={tdStyle}>
                  {new Date(r.invoiceDate).toLocaleDateString()}
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  ₹{Number(r.amount || 0).toFixed(2)}
                </td>
                <td style={tdStyle}>{r.matched ? '✅' : '❌'}</td>
                <td style={tdStyle}>{r.reason}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  {Number(r.difference || 0).toFixed(2)}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  {Math.round((r.confidence || 0) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const buttonPrimary = {
  backgroundColor: '#6e4c1e',
  color: 'white',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: "'Playfair Display', serif",
}

const buttonSecondary = {
  backgroundColor: '#d3bfa5',
  color: '#3b2f2f',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: "'Playfair Display', serif",
}

const thStyle = {
  padding: '8px',
  textAlign: 'left',
}

const tdStyle = {
  padding: '8px',
  color: '#3b2f2f',
}
