function Hero() {
  const { Button } = window.HAUSSDesignSystem_f69ac8;
  const { PhotoPlaceholder } = window;
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', background: 'var(--yellow-500)' }}>
      <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--ink-950)' }}>Licensed & insured builders</span>
        <h1 style={{ fontSize: 'var(--text-display-xl)', color: 'var(--ink-950)' }}>We build homes that outlast the mortgage.</h1>
        <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--ink-800)', maxWidth: 480 }}>HAUSS handles new builds, renovations and additions from first sketch to final inspection — one crew, one timeline, no surprises.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="dark" size="lg">Get a quote</Button>
          <Button variant="ghost" size="lg">See our work</Button>
        </div>
      </div>
      <PhotoPlaceholder style={{ minHeight: 520 }} label="Framing / crane photography" />
    </section>
  );
}
window.Hero = Hero;
