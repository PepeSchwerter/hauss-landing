import React from 'react';

export function Tag({ tone = 'ink', children }) {
  const tones = {
    ink: { background: 'var(--ink-950)', color: '#fff' },
    yellow: { background: 'var(--yellow-500)', color: 'var(--ink-950)' },
    red: { background: 'var(--red-500)', color: '#fff' },
    pink: { background: 'var(--pink-300)', color: 'var(--ink-950)' },
    outline: { background: 'transparent', color: 'var(--ink-950)', border: '1px solid var(--border-strong)' },
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-caption)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', borderRadius: 'var(--radius-sm)', ...tones[tone] }}>
      {children}
    </span>
  );
}
