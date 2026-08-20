import React, { useState } from 'react';

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ borderTop: '1px solid var(--border-default)' }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--border-default)' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: 'pointer', padding: '18px 4px', textAlign: 'left',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-subheading)', color: 'var(--text-primary)',
          }}>
            {it.title}
            <span style={{ fontSize: 20, fontWeight: 400, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform var(--duration-normal) var(--ease-standard)' }}>+</span>
          </button>
          {open === i && <div style={{ padding: '0 4px 18px', color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--lh-normal)' }}>{it.content}</div>}
        </div>
      ))}
    </div>
  );
}
