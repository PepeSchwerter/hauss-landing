function Services() {
  const { Accordion } = window.HAUSSDesignSystem_f69ac8;
  return (
    <section style={{ padding: '96px 64px', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64 }}>
      <div>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>What we do</span>
        <h2 style={{ fontSize: 'var(--text-display-md)', marginTop: 12, color: 'var(--text-primary)' }}>Construction services</h2>
        <p style={{ marginTop: 16, color: 'var(--text-secondary)', fontSize: 'var(--text-body)', maxWidth: 360 }}>From groundbreak to final walkthrough, we manage every trade on site so you deal with one team, not ten subcontractors.</p>
      </div>
      <Accordion items={[
        { title: 'New builds', content: 'Single-family homes to small multi-unit developments, designed and built on a fixed schedule.' },
        { title: 'Renovations & additions', content: 'Structural, cosmetic and full-gut renovations, kitchen and bathroom remodels, room additions.' },
        { title: 'Groundworks & foundations', content: 'Site prep, excavation, drainage and foundation pours for new and existing structures.' },
        { title: 'Project management', content: 'Permitting, inspections, and trade scheduling handled end-to-end.' },
      ]} />
    </section>
  );
}
window.Services = Services;
