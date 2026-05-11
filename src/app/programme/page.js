"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import CircularGauge from "@/components/CircularGauge";

export default function ProgrammePage() {
  const [data, setData] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("neurex_program");
      if (raw) setData(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!data) {
    return (
      <>
        <BackgroundFX />
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="card-premium p-12 max-w-lg text-center">
            <h1 className="font-display text-3xl font-semibold mb-4 text-gradient-soft">
              Aucune analyse détectée
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Lance d&apos;abord l&apos;analyse biométrique pour obtenir ton
              programme personnalisé.
            </p>
            <Link href="/analyse" className="btn-glow">
              Commencer l&apos;analyse →
            </Link>
          </div>
        </main>
      </>
    );
  }

  const { metrics, physicalLevel, goalMeta, week } = data;
  const day = week[activeDay];

  return (
    <>
      <BackgroundFX />

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[rgba(5,5,5,0.7)] border-b border-[var(--border-soft)]">
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)]" />
              <div className="absolute inset-[2px] rounded-[5px] bg-[var(--bg-primary)] flex items-center justify-center">
                <span className="font-display text-xs font-extrabold text-gradient">
                  N
                </span>
              </div>
            </div>
            <span className="font-display text-base font-bold tracking-[0.15em]">
              NEUREX
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
              Programme actif · synchronisé
            </div>
            <Link href="/analyse" className="btn-ghost !py-2 !px-3 sm:!px-4 text-[10px] sm:text-xs">
              Recalculer
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-14">
        {/* SECTION 1 — IDENTITÉ DU PROFIL */}
        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-5 animate-fade-up">
          <div className="card-premium p-7 sm:p-9 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 scan-line" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="hud-tag">Profil NEUREX · Analyse complétée</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  ID #{Math.random().toString(36).slice(2, 8).toUpperCase()}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                <span className="text-gradient-soft">Niveau </span>
                <span className="text-gradient-strong">{physicalLevel.label}</span>
                <br className="sm:hidden" />
                <span className="text-gradient-soft"> · Grade </span>
                <span className="text-gradient-strong">{physicalLevel.grade}</span>
              </h1>
              <p className="mt-5 text-[var(--text-secondary)] text-base sm:text-lg max-w-xl">
                Objectif détecté :{" "}
                <span className="text-white font-medium">{goalMeta.label}</span>
                . {goalMeta.desc}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
                <KeyStat label="Âge" value={data.profile.age} unit="ans" />
                <KeyStat label="Taille" value={data.profile.height} unit="cm" />
                <KeyStat label="Poids" value={data.profile.weight} unit="kg" />
              </div>
            </div>
          </div>

          <div className="card-premium p-7 sm:p-8 flex flex-col items-center justify-center">
            <div className="hud-tag mb-5">Score NEUREX global</div>
            <CircularGauge
              value={metrics.score}
              max={100}
              label="Performance"
              size={180}
              color="gradient"
            />
            <div className="mt-4 text-sm text-[var(--text-secondary)] text-center max-w-xs">
              Calculé sur 142 variables physiologiques et comportementales.
            </div>
          </div>
        </section>

        {/* SECTION 2 — MÉTABOLISME / NUTRITION */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-up delay-100">
          <MetricCard
            label="Métabolisme de base"
            value={metrics.bmr}
            unit="kcal"
            sub="BMR · Mifflin-St Jeor"
            color="cyan"
          />
          <MetricCard
            label="Dépense quotidienne"
            value={metrics.tdee}
            unit="kcal"
            sub="TDEE · activité incluse"
            color="cyan"
          />
          <MetricCard
            label="Calories cible"
            value={metrics.targetCalories}
            unit="kcal"
            sub={`Objectif · ${goalMeta.label}`}
            highlight
          />
          <MetricCard
            label="Indice de masse"
            value={metrics.bmi}
            unit="IMC"
            sub={metrics.bmiLabel}
            color="green"
          />
        </section>

        {/* SECTION 3 — MACROS */}
        <section className="card-premium p-7 sm:p-9 md:p-10 mb-5 animate-fade-up delay-200 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-3">
            <div>
              <div className="hud-tag mb-3">Stratégie nutritionnelle</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-soft tracking-wide">
                Répartition des macronutriments
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-widest">
              Hydratation cible :{" "}
              <span className="text-[var(--accent-cyan)] font-display font-bold">
                {metrics.water} L / jour
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <MacroBar
              label="Protéines"
              grams={metrics.protein}
              kcal={metrics.protein * 4}
              total={metrics.targetCalories}
              color="#00d9ff"
              note="Préservation musculaire"
            />
            <MacroBar
              label="Glucides"
              grams={metrics.carbs}
              kcal={metrics.carbs * 4}
              total={metrics.targetCalories}
              color="#0099cc"
              note="Énergie d'entraînement"
            />
            <MacroBar
              label="Lipides"
              grams={metrics.fat}
              kcal={metrics.fat * 9}
              total={metrics.targetCalories}
              color="#4efff3"
              note="Hormones & santé"
            />
          </div>
        </section>

        {/* SECTION 4 — PROGRAMME HEBDOMADAIRE */}
        <section className="mb-5 animate-fade-up delay-300">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="hud-tag mb-3">Programme hebdomadaire généré</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient-soft tracking-tight">
                Ta semaine d&apos;entraînement.
              </h2>
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-[var(--text-tertiary)] uppercase tracking-widest">
              {week.filter((d) => d.type === "train").length} séances ·{" "}
              {week.filter((d) => d.type === "rest").length} récupération
            </div>
          </div>

          {/* Onglets jours */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2">
            {week.map((d, i) => {
              const active = i === activeDay;
              return (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`shrink-0 group relative px-4 py-3 rounded-lg border transition-all min-w-[120px] text-left overflow-hidden ${
                    active
                      ? "border-[var(--accent-blue)] bg-[rgba(0,217,255,0.1)] shadow-[0_0_20px_rgba(0,217,255,0.25)]"
                      : "border-[var(--border-soft)] bg-white/[0.02] hover:border-[var(--border-strong)]"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
                  )}
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                    Jour {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={`font-display font-bold mt-1 tracking-wide ${
                      active ? "text-[var(--accent-cyan)]" : "text-white"
                    }`}
                  >
                    {d.day}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 font-mono uppercase tracking-widest ${
                      d.type === "rest"
                        ? "text-[var(--accent-cyan)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {d.type === "rest" ? "Repos" : "Entraînement"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Détail du jour */}
          <div
            key={activeDay}
            className="card-premium p-7 sm:p-9 md:p-10 animate-fade-in"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7 sm:mb-8">
              <div>
                <div className="hud-tag mb-3">
                  {day.day} · {day.type === "rest" ? "Récupération" : "Séance"}
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-wide">
                  {day.title}
                </h3>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  {day.focus}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Pill icon="⏱" label={`${day.duration} min`} />
                <Pill
                  icon="●"
                  label={`${day.exercises.length} mouvements`}
                />
              </div>
            </div>

            <div className="space-y-2">
              {day.exercises.map((ex, i) => (
                <ExerciseRow key={i} index={i + 1} exercise={ex} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — PROGRESSION SIMULÉE */}
        <section className="grid lg:grid-cols-3 gap-5 animate-fade-up delay-400">
          <div className="card-premium p-7 sm:p-8">
            <div className="hud-tag mb-5">Progression projetée · 12 semaines</div>
            <ProgressionChart goal={data.profile.goal} />
            <div className="mt-4 text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-mono">
              Estimation basée sur l&apos;adhérence au programme
            </div>
          </div>

          <div className="card-premium p-7 sm:p-8">
            <div className="hud-tag mb-5">Charge hebdomadaire</div>
            <div className="space-y-4">
              {["Volume", "Intensité", "Densité", "Récupération"].map(
                (label, i) => {
                  const values = [
                    [80, 85, 65, 60, 90],
                    [70, 75, 80, 90, 60],
                    [65, 90, 60, 75, 85],
                    [60, 70, 65, 80, 70],
                  ][i];
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-tech text-sm text-white uppercase tracking-widest">
                          {label}
                        </span>
                        <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold">
                          {values[Math.min(activeDay, 4)]}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(0,217,255,0.6)]"
                          style={{
                            width: `${values[Math.min(activeDay, 4)]}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          <div className="card-premium p-7 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.25),transparent_70%)] blur-2xl" />
            <div className="relative">
              <div className="hud-tag mb-5">Recommandations IA</div>
              <ul className="space-y-3">
                {[
                  "Sommeil minimum 7h30 pour optimiser la récupération",
                  "Étirements 10 min après chaque séance",
                  "Tracking du poids 1×/semaine au réveil à jeun",
                  "Réévaluation conseillée dans 4 semaines",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="mt-0.5 h-6 w-6 shrink-0 rounded-md bg-[var(--accent-blue)]/15 border border-[var(--accent-blue)]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[var(--accent-cyan)]">
                      0{i + 1}
                    </span>
                    <span className="text-[var(--text-secondary)] leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA bas */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-7 sm:p-8 rounded-2xl border border-[var(--border-strong)] bg-gradient-to-r from-[rgba(0,217,255,0.08)] via-[rgba(0,217,255,0.03)] to-[rgba(78,255,243,0.05)] backdrop-blur-md animate-fade-up delay-500 relative overflow-hidden">
          <div className="absolute inset-0 scan-line opacity-50" />
          <div className="relative">
            <div className="font-display text-lg sm:text-xl font-bold tracking-wide">
              Programme prêt — il ne reste qu&apos;à commencer.
            </div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">
              Recalcule ton plan à tout moment quand ton niveau évolue.
            </div>
          </div>
          <div className="relative flex gap-3 w-full sm:w-auto">
            <Link href="/" className="btn-ghost flex-1 sm:flex-none">
              Accueil
            </Link>
            <Link href="/analyse" className="btn-glow flex-1 sm:flex-none">
              Nouvelle analyse →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

/* ================ Sub components ================ */

function KeyStat({ label, value, unit }) {
  return (
    <div className="relative rounded-lg border border-[var(--border-soft)] bg-[rgba(0,217,255,0.03)] px-4 py-3 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent-blue)]/40" />
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {label}
      </div>
      <div className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
        {value}
        <span className="text-xs text-[var(--text-tertiary)] ml-1 font-normal font-mono">
          {unit}
        </span>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, sub, highlight, color }) {
  return (
    <div
      className={`card-premium p-6 ${
        highlight ? "border-glow animate-glow-pulse" : ""
      } group relative overflow-hidden`}
    >
      <div className="hud-tag mb-3">{label}</div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div
          className={`font-display text-3xl sm:text-4xl font-extrabold ${
            highlight ? "text-gradient-strong" : "text-white"
          }`}
        >
          {value.toLocaleString("fr-FR")}
        </div>
        <div className="text-xs sm:text-sm text-[var(--text-tertiary)] font-mono uppercase tracking-wider">
          {unit}
        </div>
      </div>
      <div className="mt-2 text-xs text-[var(--text-secondary)]">{sub}</div>
      <div
        className={`absolute -bottom-px left-0 h-px transition-all duration-500 group-hover:w-full w-0 ${
          color === "green"
            ? "bg-[var(--accent-cyan)]"
            : "bg-[var(--accent-blue)]"
        }`}
        style={{ boxShadow: "0 0 8px var(--accent-blue)" }}
      />
    </div>
  );
}

function MacroBar({ label, grams, kcal, total, color, note }) {
  const pct = Math.round((kcal / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="font-display text-lg font-bold tracking-wide">
            {label}
          </div>
          <div className="text-xs text-[var(--text-tertiary)]">{note}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-extrabold text-white">
            {grams}
            <span className="text-sm text-[var(--text-tertiary)] ml-0.5 font-mono">
              g
            </span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            {kcal} kcal · {pct}%
          </div>
        </div>
      </div>
      <div className="h-3 rounded-full bg-[rgba(0,217,255,0.05)] overflow-hidden relative border border-[var(--border-soft)]">
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            boxShadow: `0 0 16px ${color}99`,
          }}
        >
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

function Pill({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[rgba(0,217,255,0.06)] border border-[var(--border-strong)] text-xs font-mono uppercase tracking-widest">
      <span className="text-[var(--accent-cyan)]">{icon}</span>
      <span className="text-white">{label}</span>
    </div>
  );
}

function ExerciseRow({ index, exercise }) {
  return (
    <div className="relative grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 sm:gap-4 px-4 py-3.5 sm:py-4 rounded-xl bg-[rgba(0,217,255,0.02)] border border-[var(--border-soft)] hover:border-[var(--accent-blue)]/50 hover:bg-[rgba(0,217,255,0.05)] transition-all group overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent-blue)]/0 group-hover:bg-[var(--accent-cyan)] group-hover:shadow-[0_0_8px_var(--accent-cyan)] transition-all" />
      <div className="font-mono text-xs text-[var(--text-tertiary)] w-8 font-bold">
        {String(index).padStart(2, "0")}
      </div>
      <div>
        <div className="font-medium text-white group-hover:text-[var(--accent-cyan)] transition-colors">
          {exercise.name}
        </div>
        <div className="sm:hidden mt-1 flex gap-3 text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
          <span>{exercise.sets} × {exercise.reps}</span>
          <span>·</span>
          <span>{exercise.rest}s</span>
        </div>
      </div>
      <div className="hidden sm:contents">
        <DataChip label="Séries" value={exercise.sets} />
        <DataChip label="Reps" value={exercise.reps} />
        <DataChip label="Repos" value={`${exercise.rest}s`} />
      </div>
      <div className="sm:hidden">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-tertiary)] group-hover:text-[var(--accent-cyan)] transition-colors">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  );
}

function DataChip({ label, value }) {
  return (
    <div className="text-right min-w-[60px]">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {label}
      </div>
      <div className="font-display font-bold text-white">{value}</div>
    </div>
  );
}

function ProgressionChart({ goal }) {
  // Génération d'une courbe stylisée selon l'objectif
  const points =
    goal === "cut"
      ? [80, 78, 76.5, 75.3, 74.2, 73.4, 72.7, 72.1, 71.6, 71.2, 70.9, 70.7]
      : goal === "muscle"
        ? [75, 75.4, 76, 76.8, 77.5, 78.3, 79, 79.7, 80.4, 81, 81.6, 82.1]
        : [75, 74.7, 75.1, 75.4, 75.2, 75.6, 75.9, 76.2, 76.5, 76.8, 77.1, 77.5];

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 280;
  const h = 100;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            x2={w}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill="url(#areaGrad)" />
        <path
          d={path}
          fill="none"
          stroke="url(#areaGrad)"
          strokeWidth="2"
          style={{
            filter: "drop-shadow(0 0 8px rgba(0,217,255,0.7))",
          }}
        />
        <path
          d={path}
          fill="none"
          stroke="#00d9ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1000"
          style={{
            animation: "data-stream 3s ease-out forwards",
          }}
        />
        {points.map((p, i) => {
          const x = (i / (points.length - 1)) * w;
          const y = h - ((p - min) / range) * h;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2.5"
              fill="#4efff3"
              opacity={i === points.length - 1 ? 1 : 0.5}
            />
          );
        })}
      </svg>
      <div className="flex items-center justify-between mt-3 font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest">
        <span>S1 · {points[0]} kg</span>
        <span className="text-[var(--accent-cyan)] font-bold">
          {goal === "cut" ? "↓" : "↑"}{" "}
          {Math.abs(points[points.length - 1] - points[0]).toFixed(1)} kg
        </span>
        <span>S12 · {points[points.length - 1]} kg</span>
      </div>
    </div>
  );
}
