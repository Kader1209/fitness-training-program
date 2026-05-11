"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BackgroundFX from "@/components/BackgroundFX";
import DashboardNav from "@/components/DashboardNav";
import MobileTabBar from "@/components/MobileTabBar";
import HologramBody from "@/components/HologramBody";
import {
  ProgressionCard,
  CaloriesCard,
  WorkoutsCard,
  LevelCard,
} from "@/components/dashboard/StatCards";
import {
  MuscleAnalysisCard,
  HeartRateCard,
  PerformanceCard,
  NextWorkoutCard,
} from "@/components/dashboard/AnalysisCards";

/* =====================================================
   Données démo + lecture sessionStorage (résultats analyse)
   ===================================================== */

const DEMO = {
  level: 28,
  levelLabel: "ATHLÈTE",
  xp: 6100,
  xpMax: 7500,
  progression: 78,
  calories: 2450,
  caloriesGoal: 3000,
  workouts: 18,
  bpm: 72,
  performance: 86,
  nextWorkout: {
    name: "PUSH",
    muscles: ["Pectoraux", "Épaules", "Triceps"],
  },
};

function deriveFromProgram(program) {
  if (!program) return DEMO;
  const m = program.metrics;
  const firstTrain = program.week?.find?.((d) => d.type === "train");
  const muscles = firstTrain
    ? firstTrain.title.split("·").slice(1).join("·").trim().split(/\s*·\s*/)
    : DEMO.nextWorkout.muscles;
  const workoutCount = program.week?.filter?.((d) => d.type === "train").length || DEMO.workouts;
  return {
    level: Math.max(1, Math.round(m.score / 3.5)),
    levelLabel: program.physicalLevel?.label?.toUpperCase() || DEMO.levelLabel,
    xp: Math.round(m.score * 75),
    xpMax: 7500,
    progression: m.score,
    calories: m.targetCalories,
    caloriesGoal: m.tdee + 500,
    workouts: workoutCount,
    bpm: 72,
    performance: m.score,
    nextWorkout: {
      name: firstTrain?.title?.split("·")[0]?.trim() || DEMO.nextWorkout.name,
      muscles: muscles.length ? muscles : DEMO.nextWorkout.muscles,
    },
  };
}

export default function Home() {
  const [data, setData] = useState(DEMO);
  const [hasReal, setHasReal] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("neurex_program");
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(deriveFromProgram(parsed));
        setHasReal(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <>
      <BackgroundFX />
      <DashboardNav level={data.level} label={data.levelLabel} />

      <main className="relative flex-1 pb-24 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
          {/* ===== Titre + sous-titre + statut ===== */}
          <div className="lg:hidden mb-6 sm:mb-8 animate-fade-up">
            <HeroHeading hasReal={hasReal} />
          </div>

          {/* ===== Grille principale 3 colonnes ===== */}
          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)_280px] xl:grid-cols-[300px_minmax(0,1fr)_300px] gap-4 lg:gap-5 items-start">
            {/* =========== COLONNE GAUCHE =========== */}
            <aside className="space-y-4 order-2 lg:order-1 animate-fade-up delay-100">
              {/* Titre uniquement visible en desktop */}
              <div className="hidden lg:block mb-2">
                <HeroHeading hasReal={hasReal} />
              </div>

              <ProgressionCard value={data.progression} />
              <CaloriesCard value={data.calories} goal={data.caloriesGoal} />
              <WorkoutsCard count={data.workouts} />
              <LevelCard
                level={data.level}
                label={data.levelLabel}
                xp={data.xp}
                xpMax={data.xpMax}
              />
            </aside>

            {/* =========== COLONNE CENTRALE — CORPS =========== */}
            <section className="order-1 lg:order-2 animate-fade-up">
              <div className="relative">
                <div className="relative py-4 px-2 sm:px-6 md:px-10 lg:px-14">
                  <HologramBody />
                </div>
              </div>

              {/* Bandeau info sous le corps */}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                <InfoChip label="Modèle 3D" value="Actif" status="ok" />
                <InfoChip label="Précision" value="98,4%" status="ok" />
                <InfoChip
                  label="Statut"
                  value={hasReal ? "Sync" : "Démo"}
                  status={hasReal ? "ok" : "warn"}
                />
              </div>
            </section>

            {/* =========== COLONNE DROITE =========== */}
            <aside className="space-y-4 order-3 animate-fade-up delay-200">
              <MuscleAnalysisCard />
              <HeartRateCard bpm={data.bpm} />
              <PerformanceCard value={data.performance} />
              <NextWorkoutCard
                name={data.nextWorkout.name}
                muscles={data.nextWorkout.muscles}
                href={hasReal ? "/programme" : "/analyse"}
              />
            </aside>
          </div>
        </div>
      </main>

      <MobileTabBar active="home" />
    </>
  );
}

/* =====================================================
   Sub components
   ===================================================== */

function HeroHeading({ hasReal }) {
  return (
    <div>
      <div className="hud-tag mb-3 sm:mb-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
        </span>
        {hasReal ? "Profil synchronisé" : "Mode démo · v3.1"}
      </div>
      <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-5xl font-extrabold leading-[0.95] tracking-tight">
        <span className="block text-gradient-soft">FORGE</span>
        <span className="block text-gradient-strong text-glow-blue">
          TON CORPS.
        </span>
      </h1>
      <p className="mt-3 text-xs sm:text-sm font-tech tracking-[0.18em] uppercase text-[var(--text-secondary)]">
        Science · Discipline · Performance
      </p>
      {!hasReal && (
        <Link
          href="/analyse"
          className="btn-glow mt-5 !py-2.5 !px-4 text-xs"
        >
          Lancer mon analyse
          <ArrowRight />
        </Link>
      )}
    </div>
  );
}

function InfoChip({ label, value, status }) {
  const color =
    status === "ok"
      ? "var(--accent-cyan)"
      : status === "warn"
        ? "#ffb74d"
        : "var(--text-tertiary)";
  return (
    <div className="relative card-premium !rounded-lg !p-3 overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {label}
      </div>
      <div className="mt-0.5 font-display text-sm sm:text-base font-bold text-white truncate">
        {value}
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
