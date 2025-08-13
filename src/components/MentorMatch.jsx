import React, { useState } from 'react';

export default function MentorMatching() {
  const [form, setForm] = useState({
    industry: '',
    skills: '',
    experience_years: '',
    goals: ''
  });
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMatches([]);
    setLoading(true);
    try {
      const body = {
        entrepreneur_profile: {
          industry: form.industry,
          skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
          experience_years: Number(form.experience_years) || 0,
          goals: form.goals
        },
        max_results: 5
      };

      const res = await fetch('http://localhost:5000/api/mentor-match', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      let json;
      try {
        json = await res.json();
      } catch {
        json = { error: 'Invalid or empty JSON response from server' };
      }

      if (!res.ok) throw new Error(json.error || 'Failed to fetch mentors');
      setMatches(json.matches || []);
    } catch (err) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Find Mentors</h1>
        <p style={styles.subtitle}>Describe your needs — we’ll find the best mentors for you.</p>

        <form onSubmit={submit} style={styles.form}>
          <label style={styles.label}>Industry</label>
          <input name="industry" value={form.industry} onChange={handleChange} style={styles.input} placeholder="Fintech / SaaS / E-commerce" />

          <label style={styles.label}>Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} style={styles.input} placeholder="Fundraising, Growth, GTM" />

          <label style={styles.label}>Experience (years)</label>
          <input name="experience_years" value={form.experience_years} onChange={handleChange} style={styles.input} placeholder="3" />

          <label style={styles.label}>Goals / What help you need</label>
          <textarea name="goals" value={form.goals} onChange={handleChange} style={{ ...styles.input, minHeight: 80 }} placeholder="Describe what you want to achieve" />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Searching…' : 'Find Mentors'}
          </button>
        </form>

        {error && <div style={styles.error}>{error}</div>}

        {matches.length > 0 && (
  <div style={styles.results}>
    <h2 style={styles.sectionTitle}>Matched Mentors</h2>
    {matches.map((m, i) => (
      <div key={m._id || i} style={styles.mentorCard}>
        <div style={styles.mentorHeader}>
          <div style={styles.avatar}>{(m.name || 'M').slice(0,1)}</div>
          <div>
            <div style={styles.mentorName}>{m.name}</div>
            <div style={styles.mentorMeta}>{m.industry} • {m.experience_years} yrs</div>
          </div>
          <div style={{ marginLeft: 'auto', fontWeight: 700, color: '#5A3E2B' }}>
            {m.match_score ? `${Math.round(m.match_score*100)}%` : '—'}
          </div>
        </div>
        <div style={styles.mentorBody}>
          <div style={styles.badges}>
            {(m.skills || []).slice(0,5).map((s, idx) => (
              <span key={idx} style={styles.badge}>{s}</span>
            ))}
          </div>
          <p style={styles.bio}>{m.bio}</p>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}

// Theme styles (beige/brown)
const styles = {
  page: {
    backgroundColor: '#FAF3E7',
    padding: 24,
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    margintop: 50,
  },
  card: {
    width: '100%',
    maxWidth: 920,
    background: '#fff',
    borderRadius: 18,
    padding: 28,
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    marginTop: 60,
  },
  title: { color: '#8B5E3C', fontSize: 28, fontWeight: 700, marginBottom: 6 },
  subtitle: { color: '#7B5E4B', marginBottom: 18 },
  form: { display: 'grid', gap: 12, marginBottom: 18 },
  label: { color: '#8B5E3C', fontWeight: 600 },
  input: {
    padding: 12,
    borderRadius: 10,
    border: '1px solid #E5D2BF',
    backgroundColor: '#F5E6D3',
    color: '#5C4B3B'
  },
  button: {
    padding: 12,
    backgroundColor: '#C69C6D',
    color: 'white',
    borderRadius: 12,
    border: 'none',
    fontWeight: 700,
    cursor: 'pointer'
  },
  error: { color: '#B43434', marginTop: 8 },
  results: { marginTop: 18 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: '#8B5E3C', marginBottom: 12 },
  mentorCard: {
    borderRadius: 12,
    border: '1px solid #E5CDB8',
    background: '#FFF8F0',
    padding: 14,
    marginBottom: 12
  },
  mentorHeader: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    background: '#C69C6D',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700
  },
  mentorName: { color: '#5A3E2B', fontWeight: 700 },
  mentorMeta: { color: '#7B5E4B', fontSize: 13 },
  badges: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  badge: {
    padding: '6px 8px',
    background: '#F5E6D3',
    borderRadius: 8,
    border: '1px solid #E5D2BF',
    color: '#5C4B3B',
    fontSize: 12
  },
  bio: { color: '#5C4B3B', marginTop: 6 }
};
