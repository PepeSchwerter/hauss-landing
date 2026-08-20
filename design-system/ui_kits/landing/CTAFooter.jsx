function CTAFooter() {
  const { Button, Input } = window.HAUSSDesignSystem_f69ac8;
  return (
    <footer style={{ background: 'var(--ink-950)', color: '#fff' }}>
      <div style={{ padding: '80px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', borderBottom: '1px solid var(--ink-700)' }}>
        <h2 style={{ fontSize: 'var(--text-display-md)', color: '#fff' }}>Ready to start building?</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <Input label="Email address" placeholder="you@email.com" type="email" />
          </div>
          <Button variant="primary" size="lg">Request a quote</Button>
        </div>
      </div>
      <div style={{ padding: '32px 64px', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-inverse-muted)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>HAUSS</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: 'var(--text-inverse-muted)' }}>Services</a>
          <a href="#" style={{ color: 'var(--text-inverse-muted)' }}>Projects</a>
          <a href="#" style={{ color: 'var(--text-inverse-muted)' }}>About</a>
          <a href="#" style={{ color: 'var(--text-inverse-muted)' }}>Contact</a>
        </div>
        <div>© 2026 HAUSS. All rights reserved.</div>
      </div>
    </footer>
  );
}
window.CTAFooter = CTAFooter;
