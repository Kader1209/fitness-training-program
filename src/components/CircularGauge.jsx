export default function CircularGauge({
  value = 0,
  max = 100,
  label = "",
  unit = "",
  size = 140,
  color = "var(--accent-cyan)",
  trackColor = "rgba(255,255,255,0.06)",
}) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));
  const dash = circumference * pct;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#00ff9d" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color === "gradient" ? `url(#grad-${label})` : color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{
            filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.5))",
            transition: "stroke-dasharray 1s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl font-semibold text-white">
          {value}
          <span className="text-base text-[var(--text-tertiary)] ml-0.5">
            {unit}
          </span>
        </div>
        {label && (
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
