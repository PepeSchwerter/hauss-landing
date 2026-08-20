function Projects() {
  const { Card, Tag, Button } = window.HAUSSDesignSystem_f69ac8;
  const { PhotoPlaceholder } = window;
  const items = [
    { tag: 'yellow', label: 'New build', title: 'Riverside Residence', desc: '4-bed new build, completed 2025.' },
    { tag: 'pink', label: 'Renovation', title: 'Maple Street Remodel', desc: 'Full kitchen and second-floor addition.' },
    { tag: 'outline', label: 'Commercial', title: 'Harbor View Offices', desc: '12,000 sq ft office fit-out.' },
  ];
  return (
    <section style={{ padding: '96px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Our work</span>
          <h2 style={{ fontSize: 'var(--text-display-md)', marginTop: 12 }}>Recent projects</h2>
        </div>
        <Button variant="ghost">View all projects</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {items.map((it, i) => (
          <Card key={i} image={null} tag={<Tag tone={it.tag}>{it.label}</Tag>} title={it.title} description={it.desc}
            footer={<div style={{ marginTop: 4 }}><a href="#" style={{ fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>View project →</a></div>} />
        ))}
      </div>
    </section>
  );
}
window.Projects = Projects;
