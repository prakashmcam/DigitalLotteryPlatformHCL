export function HeroMesh() {
  return (
    <svg className="hero-mesh" aria-hidden="true" viewBox="0 0 800 400" preserveAspectRatio="none">
      <defs>
        <radialGradient id="hero-glow-gold" cx="0%" cy="0%" r="80%">
          <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-blue" cx="100%" cy="100%" r="80%">
          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#hero-glow-gold)" />
      <rect width="800" height="400" fill="url(#hero-glow-blue)" />
    </svg>
  );
}
