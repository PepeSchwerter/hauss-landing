function Testimonial() {
  return (
    <section style={{ background: 'var(--surface-soft)', padding: '96px 64px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-display-md)', maxWidth: 800, margin: '0 auto', color: 'var(--ink-950)', lineHeight: 1.3 }}>
        "HAUSS finished two weeks ahead of schedule and never once went over budget."
      </p>
      <div style={{ marginTop: 24, fontSize: 14, fontWeight: 600, color: 'var(--ink-800)' }}>Maria Torres, Homeowner</div>
    </section>
  );
}
window.Testimonial = Testimonial;
