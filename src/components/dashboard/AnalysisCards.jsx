"use client";

import Link from "next/link";

/* =====================================================
   Sidebar droite : analyse muscu, ECG, performance, séance
   ===================================================== */

const DEFAULT_MUSCLES = [
  { name: "Deltoïde", value: 92 },
  { name: "Pectoraux", value: 88 },
  { name: "Biceps", value: 76 },
  { name: "Abdos", value: 84 },
  { name: "Quadriceps", value: 89 },
  { name: "Mollets", value: 72 },
];

export function MuscleAnalysisCard({ muscles = DEFAULT_MUSCLES }) {
  return (
    <Card title="Analyse musculaire" extra={<MiniBars />}>
      <div className="space-y-2.5 mt-1">
        {muscles.map((m) => (
          <div key={m.name} className="flex items-center gap-3">
            <div className="font-tech text-[11px] uppercase tracking-[0.12em] text-white w-24 shrink-0">
              {m.name}
            </div>
            <div className="flex-1 h-1.5 rounded-full bg-[rgba(0,217,255,0.06)] overflow-hidden border border-[var(--border-soft)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,217,255,0.6)] transition-all duration-700"
                style={{ width: `${m.value}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-[var(--accent-cyan)] font-bold w-7 text-right">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function HeartRateCard({ bpm = 72 }) {
  return (
    <Card title="Fréquence cardiaque">
      <ECG />
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
          <HeartIcon />
          <div className="font-display text-2xl font-extrabold text-white">
            {bpm}
            <span className="font-mono text-xs text-[var(--text-tertiary)] ml-1 uppercase tracking-widest font-normal">
              BPM
            </span>
          </div>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent-cyan)] flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[var(--accent-cyan)] animate-hud-blink" />
          STABLE
        </div>
      </div>
    </Card>
  );
}

export function PerformanceCard({ value = 86 }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const dash = c * (value / 100);
  return (
    <Card title="Performance">
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative h-28 w-28">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <defs>
              <linearGradient id="perfGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#4efff3" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="rgba(0,217,255,0.08)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="url(#perfGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c}`}
              style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.7))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display text-2xl font-extrabold text-white">
              {value}%
            </div>
          </div>
        </div>
        <div className="mt-2 font-tech uppercase tracking-[0.2em] text-xs text-[var(--accent-cyan)]">
          {value >= 85
            ? "Excellent"
            : value >= 70
              ? "Très bon"
              : value >= 50
                ? "Correct"
                : "À améliorer"}
        </div>
      </div>
    </Card>
  );
}

export function NextWorkoutCard({
  name = "PUSH",
  muscles = ["Pectoraux", "Épaules", "Triceps"],
  href = "/programme",
}) {
  return (
    <Card title="Prochaine séance">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 rounded-md bg-[rgba(0,217,255,0.08)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-cyan)]">
          <TargetIcon />
        </div>
        <div className="flex-1">
          <div className="font-display text-2xl font-extrabold text-white tracking-wider">
            {name}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)] leading-relaxed">
            {muscles.join(" · ")}
          </div>
        </div>
      </div>
      <Link
        href={href}
        className="mt-4 inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-md border border-[var(--border-strong)] bg-[rgba(0,217,255,0.05)] hover:bg-[rgba(0,217,255,0.1)] hover:border-[var(--accent-blue)] text-xs font-tech uppercase tracking-[0.2em] text-[var(--accent-cyan)] transition-all"
      >
        Voir détails
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </Card>
  );
}

/* =====================================================
   Wrapper card
   ===================================================== */
function Card({ title, children, extra }) {
  return (
    <div className="card-premium p-4 sm:p-5 relative overflow-hidden">
      <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/40 to-transparent" />
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
          {title}
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
}

/* =====================================================
   ECG animé
   ===================================================== */
function ECG() {
  return (
    <svg viewBox="0 0 200 40" className="w-full h-10">
      <defs>
        <linearGradient id="ecgFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4efff3" stopOpacity="0" />
          <stop offset="40%" stopColor="#4efff3" stopOpacity="1" />
          <stop offset="100%" stopColor="#4efff3" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 20 L 30 20 L 35 20 L 40 10 L 45 28 L 50 5 L 55 32 L 60 20 L 90 20 L 95 14 L 100 26 L 105 20 L 130 20 L 135 8 L 140 28 L 145 4 L 150 30 L 155 20 L 200 20"
        fill="none"
        stroke="url(#ecgFade)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 4px rgba(78,255,243,0.7))" }}
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 400;400 0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <line
        x1="0"
        y1="20"
        x2="200"
        y2="20"
        stroke="rgba(0,217,255,0.05)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

/* =====================================================
   Icons
   ===================================================== */
function MiniBars() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12">
      {[4, 7, 5, 9].map((h, i) => (
        <rect
          key={i}
          x={i * 6}
          y={12 - h}
          width="4"
          height={h}
          fill="#00d9ff"
          opacity={0.5 + i * 0.12}
          rx="1"
        />
      ))}
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
