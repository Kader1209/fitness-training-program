"use client";

/* =====================================================
   Petites cards stats utilisées dans la sidebar gauche
   ===================================================== */

export function ProgressionCard({ value = 78 }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const dash = c * (value / 100);
  return (
    <Card title="Progression">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="rgba(0,217,255,0.08)"
              strokeWidth="5"
            />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#00d9ff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c}`}
              style={{ filter: "drop-shadow(0 0 6px rgba(0,217,255,0.7))" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-lg font-extrabold text-white">
              {value}%
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">
            Objectif
          </div>
          <MiniBars values={[35, 50, 42, 60, 70, 65, 78]} />
        </div>
      </div>
    </Card>
  );
}

export function CaloriesCard({ value = 2450, goal = 3000 }) {
  return (
    <Card title="Calories">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 rounded-md bg-[rgba(0,217,255,0.08)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-cyan)]">
          <FlameIcon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <div className="font-display text-2xl font-extrabold text-white">
              {value.toLocaleString("fr-FR")}
            </div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              / {goal.toLocaleString("fr-FR")} kcal
            </div>
          </div>
          <div className="mt-2">
            <MiniLine
              points={[40, 55, 48, 70, 62, 75, 68, 82, 78]}
              color="#00d9ff"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function WorkoutsCard({ count = 18 }) {
  return (
    <Card title="Entraînements">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 rounded-md bg-[rgba(0,217,255,0.08)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-cyan)]">
          <DumbbellIcon />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <div className="font-display text-2xl font-extrabold text-white">
              {count}
            </div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              cette semaine
            </div>
          </div>
          <div className="mt-2">
            <MiniBars values={[2, 4, 1, 3, 5, 2, 1]} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function LevelCard({ level = 28, label = "Athlète", xp = 6100, xpMax = 7500 }) {
  const pct = Math.min(100, (xp / xpMax) * 100);
  return (
    <Card title="Niveau">
      <div className="flex items-start gap-3">
        <div className="relative h-10 w-10 shrink-0">
          <HexBadge />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <div className="font-display text-2xl font-extrabold text-white">
              {level}
            </div>
            <div className="font-mono text-[10px] text-[var(--accent-cyan)] uppercase tracking-widest">
              {label}
            </div>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[rgba(0,217,255,0.08)] overflow-hidden border border-[var(--border-soft)]">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] shadow-[0_0_8px_rgba(0,217,255,0.7)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            {xp.toLocaleString("fr-FR")} / {xpMax.toLocaleString("fr-FR")} XP
          </div>
        </div>
      </div>
    </Card>
  );
}

/* =====================================================
   Wrapper card
   ===================================================== */
function Card({ title, children }) {
  return (
    <div className="card-premium p-4 sm:p-5 relative overflow-hidden">
      <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/40 to-transparent" />
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] mb-3">
        {title}
      </div>
      {children}
    </div>
  );
}

/* =====================================================
   Mini charts
   ===================================================== */
function MiniBars({ values }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-8">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-[var(--accent-blue)] to-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,217,255,0.5)] transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            opacity: 0.5 + (v / max) * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function MiniLine({ points, color = "#00d9ff" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 120;
  const h = 28;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h * 0.9 - 2;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8">
      <defs>
        <linearGradient id="miniLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#miniLineGrad)"
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

/* =====================================================
   Icons
   ===================================================== */
function FlameIcon() {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function DumbbellIcon() {
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
      <path d="M14.4 14.4 9.6 9.6M18.66 9.34l-2.83 2.83M21.5 12.5l-1.41 1.41M5.34 18.66l2.83-2.83M2.5 11.5l1.41-1.41M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" />
    </svg>
  );
}

function HexBadge() {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <defs>
        <linearGradient id="hexGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4efff3" />
          <stop offset="100%" stopColor="#00d9ff" />
        </linearGradient>
      </defs>
      <path
        d="M 20 4 L 34 12 L 34 28 L 20 36 L 6 28 L 6 12 Z"
        fill="rgba(0,217,255,0.1)"
        stroke="url(#hexGrad)"
        strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 0 4px rgba(0,217,255,0.6))" }}
      />
      <path
        d="M 20 13 L 27 20 L 20 27 L 13 20 Z"
        fill="rgba(78,255,243,0.5)"
        stroke="#4efff3"
        strokeWidth="0.8"
      />
    </svg>
  );
}
