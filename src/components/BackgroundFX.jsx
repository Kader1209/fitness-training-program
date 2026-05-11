export default function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-animated opacity-40 mask-radial" />

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.22),transparent_70%)] blur-3xl animate-pulse-glow" />
      <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(78,255,243,0.14),transparent_70%)] blur-3xl animate-pulse-glow [animation-delay:2s]" />
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,153,204,0.16),transparent_70%)] blur-3xl animate-pulse-glow [animation-delay:1s]" />

      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(0,217,255,0.18)" />
          </pattern>
          <pattern
            id="hex"
            width="60"
            height="52"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0,0)"
          >
            <path
              d="M 30 1 L 56 16 L 56 36 L 30 51 L 4 36 L 4 16 Z"
              fill="none"
              stroke="rgba(0,217,255,0.06)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect width="100%" height="100%" fill="url(#hex)" opacity="0.5" />
      </svg>

      {/* Lignes diagonales HUD */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="22%"
          stroke="rgba(0,217,255,0.15)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <line
          x1="0"
          y1="78%"
          x2="100%"
          y2="80%"
          stroke="rgba(78,255,243,0.12)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </svg>

      {/* Ligne de scan globale très subtile */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)",
          boxShadow: "0 0 12px rgba(0,217,255,0.5)",
          animation: "scan 12s linear infinite",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]" />
    </div>
  );
}
