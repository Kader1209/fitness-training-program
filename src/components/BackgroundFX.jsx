export default function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-animated opacity-40 mask-radial" />

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18),transparent_70%)] blur-3xl animate-pulse-glow" />
      <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.12),transparent_70%)] blur-3xl animate-pulse-glow [animation-delay:2s]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(77,140,255,0.12),transparent_70%)] blur-3xl animate-pulse-glow [animation-delay:1s]" />

      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]" />
    </div>
  );
}
