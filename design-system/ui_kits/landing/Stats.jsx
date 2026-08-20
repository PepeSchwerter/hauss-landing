function Stats() {
  const { StatBlock } = window.HAUSSDesignSystem_f69ac8;
  return (
    <section style={{ background: 'var(--ink-950)', padding: '64px', display: 'flex', gap: 80, justifyContent: 'center', flexWrap: 'wrap' }}>
      <StatBlock value="18" label="Years in business" tone="dark" />
      <StatBlock value="240+" label="Projects delivered" tone="dark" />
      <StatBlock value="4.9" label="Average client rating" tone="dark" />
      <StatBlock value="35" label="Crew members" tone="dark" />
    </section>
  );
}
window.Stats = Stats;
