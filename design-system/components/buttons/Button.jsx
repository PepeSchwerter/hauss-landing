import React from 'react';

export function Button({ variant = 'primary', size = 'md', icon, children, ...props }) {
  const pad = size === 'sm' ? '8px 14px' : size === 'lg' ? '16px 28px' : '12px 20px';
  const fontSize = size === 'sm' ? 'var(--text-body-sm)' : 'var(--text-body)';
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize, padding: pad,
    borderRadius: 'var(--radius-md)', border: '2px solid var(--ink-950)', cursor: 'pointer',
    transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
  };
  const variants = {
    primary: { background: 'var(--accent-cta)', color: 'var(--accent-cta-text)', borderColor: 'var(--ink-950)' },
    dark: { background: 'var(--ink-950)', color: '#fff', borderColor: 'var(--ink-950)' },
    ghost: { background: 'transparent', color: 'var(--ink-950)', borderColor: 'var(--ink-950)' },
    inverse: { background: '#fff', color: 'var(--ink-950)', borderColor: '#fff' },
  };
  const style = { ...base, ...variants[variant], opacity: props.disabled ? 0.4 : 1, cursor: props.disabled ? 'not-allowed' : 'pointer' };
  return (
    <button {...props} style={style}
      onMouseEnter={e => { if (!props.disabled) e.currentTarget.style.background = variant === 'primary' ? 'var(--accent-cta-hover)' : variant === 'dark' ? 'var(--ink-800)' : variant === 'inverse' ? 'var(--surface-alt)' : 'var(--ink-950)'; if (variant === 'ghost') e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = variants[variant].background; if (variant === 'ghost') e.currentTarget.style.color = 'var(--ink-950)'; }}
    >
      {children}{icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}
