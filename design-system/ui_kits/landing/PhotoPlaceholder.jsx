function PhotoPlaceholder({ style, label = 'Site photography' }) {
  return (
    <div style={{ background: 'repeating-linear-gradient(135deg, var(--ink-100), var(--ink-100) 10px, var(--ink-200) 10px, var(--ink-200) 20px)', display: 'flex', alignItems: 'flex-end', padding: 12, ...style }}>
      <span style={{ fontSize: 11, color: 'var(--ink-500)', background: 'rgba(255,255,255,.8)', padding: '2px 6px' }}>{label}</span>
    </div>
  );
}
window.PhotoPlaceholder = PhotoPlaceholder;
