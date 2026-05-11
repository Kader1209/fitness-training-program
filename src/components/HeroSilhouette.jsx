export default function HeroSilhouette() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-[var(--accent-blue)]/15 via-[var(--accent-cyan)]/8 to-transparent blur-3xl animate-pulse-glow" />

      <div className="relative h-full w-full rounded-[28px] glass-strong overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,5,0.6))]" />

        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity="1" />
              <stop offset="50%" stopColor="#4efff3" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4efff3" stopOpacity="1" />
              <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Silhouette humaine stylisée */}
          <g
            stroke="url(#bodyGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            opacity="0.95"
          >
            <circle cx="150" cy="60" r="22" />
            <line x1="150" y1="82" x2="150" y2="100" />
            <path d="M 110 110 Q 150 105 190 110 L 195 220 Q 150 230 105 220 Z" />
            <line x1="110" y1="110" x2="80" y2="170" />
            <line x1="80" y1="170" x2="75" y2="230" />
            <line x1="190" y1="110" x2="220" y2="170" />
            <line x1="220" y1="170" x2="225" y2="230" />
            <line x1="125" y1="225" x2="115" y2="320" />
            <line x1="115" y1="320" x2="110" y2="380" />
            <line x1="175" y1="225" x2="185" y2="320" />
            <line x1="185" y1="320" x2="190" y2="380" />
          </g>

          {/* Nodes biométriques pulsants */}
          {[
            { cx: 150, cy: 60, label: "CTX" },
            { cx: 150, cy: 165, label: "PCT" },
            { cx: 80, cy: 170, label: "DLT" },
            { cx: 220, cy: 170, label: "DLT" },
            { cx: 115, cy: 320, label: "QDR" },
            { cx: 185, cy: 320, label: "QDR" },
          ].map((n, i) => (
            <g key={i}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r="14"
                fill="url(#nodeGrad)"
                opacity="0.7"
              >
                <animate
                  attributeName="r"
                  values="8;20;8"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.85;0.3"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={n.cx} cy={n.cy} r="3" fill="#4efff3" />
            </g>
          ))}

          {/* Ligne de scan verticale */}
          <g stroke="#4efff3" strokeWidth="0.6" opacity="0.5">
            <line x1="40" y1="120" x2="260" y2="120" strokeDasharray="2 4">
              <animate
                attributeName="y1"
                values="120;370;120"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="120;370;120"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* Lignes radar concentriques */}
          <g
            stroke="rgba(0,217,255,0.15)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          >
            <circle cx="150" cy="200" r="100" />
            <circle cx="150" cy="200" r="140" strokeDasharray="3 6" />
          </g>
        </svg>

        {/* HUD coins en haut */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-[0.25em]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-hud-blink" />
            SCAN_001
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4efff3] animate-pulse" />
            LIVE
          </span>
        </div>

        {/* HUD stats en bas */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-wider">
          {[
            { label: "BPM", value: "72", color: "var(--accent-cyan)" },
            { label: "VO₂", value: "48.2", color: "var(--accent-blue)" },
            { label: "Force", value: "A+", color: "var(--accent-cyan)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative border border-[var(--border-strong)] rounded-md px-2 py-1.5 backdrop-blur-md bg-black/30"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: stat.color, boxShadow: `0 0 6px ${stat.color}` }}
              />
              <div className="text-[var(--text-tertiary)]">{stat.label}</div>
              <div className="text-white text-sm font-display font-bold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Coin marks HUD */}
        {[
          { pos: "top-2 left-2", rot: "" },
          { pos: "top-2 right-2", rot: "rotate-90" },
          { pos: "bottom-2 left-2", rot: "-rotate-90" },
          { pos: "bottom-2 right-2", rot: "rotate-180" },
        ].map((c, i) => (
          <svg
            key={i}
            className={`absolute ${c.pos} ${c.rot} w-4 h-4 text-[var(--accent-blue)]`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M 1 5 L 1 1 L 5 1" />
          </svg>
        ))}
      </div>
    </div>
  );
}
