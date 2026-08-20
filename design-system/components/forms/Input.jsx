import React from 'react';

export function Input({ label, placeholder, type = 'text', ...props }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
      {label && <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>}
      <input type={type} placeholder={placeholder} {...props} style={{
        padding: '12px 14px', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)',
        border: '2px solid var(--ink-950)', borderRadius: 'var(--radius-md)', background: '#fff', color: 'var(--text-primary)', outline: 'none',
      }} onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--yellow-500)'; }} onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }} />
    </label>
  );
}
