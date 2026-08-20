import React from 'react';

export function StatBlock({ value, label, tone = 'light' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 1.6rem + 1.6vw, 3rem)', letterSpacing: 'var(--ls-tight)', color: tone === 'dark' ? '#fff' : 'var(--ink-950)' }}>{value}</div>
      <div style={{ fontSize: 'var(--text-body-sm)', color: tone === 'dark' ? 'var(--text-inverse-muted)' : 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}
