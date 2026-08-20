import React from 'react';

export function Navbar({ logo = 'HAUSS', links = [], cta }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--ink-950)' }}>{logo}</div>
      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        {links.map((l, i) => (
          <a key={i} href={l.href || '#'} style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>{l.label}</a>
        ))}
      </div>
      {cta}
    </nav>
  );
}
