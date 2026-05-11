export default function HeroSilhouette() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-[var(--accent-cyan)]/10 to-transparent blur-2xl animate-pulse-glow" />

      <div className="relative h-full w-full rounded-[32px] glass-strong overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#4d8cff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00ff9d" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
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
            {/* Tête */}
            <circle cx="150" cy="60" r="22" />
            {/* Cou */}
            <line x1="150" y1="82" x2="150" y2="100" />
            {/* Torse */}
            <path d="M 110 110 Q 150 105 190 110 L 195 220 Q 150 230 105 220 Z" />
            {/* Épaules vers bras */}
            <line x1="110" y1="110" x2="80" y2="170" />
            <line x1="80" y1="170" x2="75" y2="230" />
            <line x1="190" y1="110" x2="220" y2="170" />
            <line x1="220" y1="170" x2="225" y2="230" />
            {/* Hanches vers jambes */}
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
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="8;18;8"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={n.cx} cy={n.cy} r="3" fill="#00e5ff" />
            </g>
          ))}

          {/* Lignes de scan horizontales */}
          <g stroke="#00e5ff" strokeWidth="0.5" opacity="0.4">
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
        </svg>

        {/* HUD coins */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-widest">
          <span>scan_001</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
            live
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[10px] font-mono text-white/60 uppercase tracking-wider">
          <div className="border border-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
            <div className="text-[var(--text-tertiary)]">BPM</div>
            <div className="text-white text-sm font-semibold">72</div>
          </div>
          <div className="border border-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
            <div className="text-[var(--text-tertiary)]">VO₂</div>
            <div className="text-white text-sm font-semibold">48.2</div>
          </div>
          <div className="border border-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
            <div className="text-[var(--text-tertiary)]">Force</div>
            <div className="text-white text-sm font-semibold">A+</div>
          </div>
        </div>

        {/* Coin marks */}
        {[
          "top-2 left-2",
          "top-2 right-2 rotate-90",
          "bottom-2 left-2 -rotate-90",
          "bottom-2 right-2 rotate-180",
        ].map((pos, i) => (
          <svg
            key={i}
            className={`absolute ${pos} w-4 h-4 text-[var(--accent-cyan)]`}
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
