import React from 'react';

export function Card({ image, tag, title, description, footer }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {image && <div style={{ aspectRatio: '4/3', background: 'var(--surface-alt)', overflow: 'hidden' }}>
        <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>}
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {tag}
        <h3 style={{ fontSize: 'var(--text-subheading)', fontWeight: 700 }}>{title}</h3>
        {description && <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--lh-normal)' }}>{description}</p>}
        {footer}
      </div>
    </div>
  );
}
