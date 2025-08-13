import React from 'react';

export default function Dashboardy({ results, potentialLeak }) {
  const total = results.length;
  const matched = results.filter(r => r.matched).length;
  const mismatched = total - matched;
  const byReason = results.reduce((acc, r) => {
    acc[r.reason] = (acc[r.reason] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        backgroundColor: '#f5f0e6',
        padding: '20px',
        paddingTop: '100px', // ✅ push content below navbar
        borderRadius: '12px',
        fontFamily: "'Playfair Display', serif",
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        flexWrap: 'wrap', // ✅ allows wrapping on small screens
      }}
    >
      <div style={cardStyle}>
        <div style={labelStyle}>Total Invoices</div>
        <div style={numberStyle}>{total}</div>
      </div>
      <div style={cardStyle}>
        <div style={labelStyle}>Matched</div>
        <div style={{ ...numberStyle, color: '#4a6741' }}>{matched}</div>
      </div>
      <div style={cardStyle}>
        <div style={labelStyle}>Mismatched</div>
        <div style={{ ...numberStyle, color: '#a3473f' }}>{mismatched}</div>
      </div>
      <div style={cardStyle}>
        <div style={labelStyle}>Potential ITC at Risk</div>
        <div style={{ ...numberStyle, fontWeight: '700', color: '#6e4c1e' }}>
          ₹{Number(potentialLeak || 0).toFixed(2)}
        </div>
      </div>
      <div style={{ marginLeft: 'auto', ...cardStyle }}>
        <div style={labelStyle}>Top Reasons</div>
        <div>
          {Object.entries(byReason).slice(0, 4).map(([k, v]) => (
            <div key={k} style={{ fontSize: '14px', color: '#5a4632' }}>
              {k}: {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Shared styles
const cardStyle = {
  backgroundColor: '#fff8f0',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  textAlign: 'center',
  flex: '1 1 auto', // ✅ responsive
  minWidth: '150px', // ✅ keeps layout tidy
};

const labelStyle = {
  fontSize: '14px',
  color: '#5a4632',
  marginBottom: '6px'
};

const numberStyle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#3b2f2f'
};
