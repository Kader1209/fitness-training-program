"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import { generateProgram } from "@/lib/generateProgram";

const STEPS = [
  {
    key: "sex",
    title: "Identifie ton profil biologique",
    subtitle: "Le métabolisme de base diffère selon le sexe biologique.",
    type: "choice",
    options: [
      { value: "male", label: "Homme", icon: "♂" },
      { value: "female", label: "Femme", icon: "♀" },
    ],
  },
  {
    key: "age",
    title: "Quel âge as-tu ?",
    subtitle: "Indispensable pour calibrer ta dépense énergétique.",
    type: "number",
    min: 14,
    max: 80,
    suffix: "ans",
    default: 25,
  },
  {
    key: "height",
    title: "Quelle est ta taille ?",
    subtitle: "Mesure exacte pour le calcul morphologique.",
    type: "number",
    min: 140,
    max: 220,
    suffix: "cm",
    default: 175,
  },
  {
    key: "weight",
    title: "Quel est ton poids actuel ?",
    subtitle: "Référence pour la stratégie nutritionnelle.",
    type: "number",
    min: 35,
    max: 200,
    suffix: "kg",
    default: 75,
  },
  {
    key: "level",
    title: "Quel est ton niveau actuel ?",
    subtitle: "L'IA adapte la charge à ta capacité de travail.",
    type: "choice",
    options: [
      {
        value: "beginner",
        label: "Débutant",
        desc: "0–6 mois de pratique régulière",
      },
      {
        value: "intermediate",
        label: "Intermédiaire",
        desc: "6 mois à 2 ans de pratique",
      },
      {
        value: "advanced",
        label: "Avancé",
        desc: "Plus de 2 ans, base technique solide",
      },
    ],
  },
  {
    key: "goal",
    title: "Quel est ton objectif principal ?",
    subtitle: "Détermine la périodisation et la nutrition.",
    type: "choice",
    options: [
      {
        value: "muscle",
        label: "Prise de masse",
        desc: "Hypertrophie musculaire",
      },
      {
        value: "cut",
        label: "Sèche / Perte de gras",
        desc: "Définition et perte de poids",
      },
      {
        value: "recomp",
        label: "Recomposition",
        desc: "Perte de gras + gain musculaire",
      },
      {
        value: "performance",
        label: "Performance",
        desc: "Force et explosivité",
      },
      {
        value: "maintenance",
        label: "Maintenance",
        desc: "Stabiliser et entretenir",
      },
    ],
  },
  {
    key: "frequency",
    title: "Combien de séances par semaine ?",
    subtitle: "L'IA construit un split optimal.",
    type: "choice",
    options: [
      { value: 3, label: "3 séances", desc: "Push · Pull · Legs" },
      { value: 4, label: "4 séances", desc: "Upper / Lower variant" },
      { value: 5, label: "5 séances", desc: "Split équilibré" },
      { value: 6, label: "6 séances", desc: "Volume avancé" },
    ],
  },
  {
    key: "place",
    title: "Où t'entraînes-tu ?",
    subtitle: "Adapte les exercices au matériel disponible.",
    type: "choice",
    options: [
      { value: "gym", label: "En salle", desc: "Accès complet barres / machines" },
      { value: "home", label: "À la maison", desc: "Poids du corps + élastiques" },
    ],
  },
  {
    key: "cardio",
    title: "Souhaites-tu inclure du cardio ?",
    subtitle: "Optimisation de la condition cardiovasculaire.",
    type: "choice",
    options: [
      { value: "yes", label: "Oui", desc: "HIIT + zone 2 ajoutés" },
      { value: "no", label: "Non", desc: "Concentration musculation pure" },
    ],
  },
];

const LOADING_MESSAGES = [
  "Initialisation du moteur neuronal…",
  "Analyse du profil biométrique…",
  "Calcul du métabolisme de base…",
  "Évaluation de la capacité de travail…",
  "Construction du split optimal…",
  "Optimisation nutritionnelle…",
  "Calibrage des charges et tempos…",
  "Finalisation du programme NEUREX…",
];

export default function AnalysePage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState(0);

  const step = STEPS[stepIndex];
  const progress = useMemo(
    () => ((stepIndex + (generating ? 1 : 0)) / STEPS.length) * 100,
    [stepIndex, generating],
  );

  const currentValue = answers[step?.key];

  function handleSelect(value) {
    setAnswers((a) => ({ ...a, [step.key]: value }));
    setTimeout(() => goNext({ ...answers, [step.key]: value }), 250);
  }

  function handleNumberChange(e) {
    setAnswers((a) => ({ ...a, [step.key]: Number(e.target.value) }));
  }

  function goNext(next = answers) {
    if (stepIndex < STEPS.length - 1) {
      setDirection(1);
      setStepIndex((i) => i + 1);
    } else {
      runGeneration(next);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setDirection(-1);
      setStepIndex((i) => i - 1);
    }
  }

  async function runGeneration(finalAnswers) {
    setGenerating(true);
    for (let i = 0; i < LOADING_MESSAGES.length; i++) {
      setLoadingIdx(i);
      await new Promise((r) => setTimeout(r, 600));
    }
    const program = generateProgram(finalAnswers);
    try {
      sessionStorage.setItem("neurex_program", JSON.stringify(program));
    } catch (e) {
      // ignore
    }
    router.push("/programme");
  }

  return (
    <>
      <BackgroundFX />

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[rgba(5,5,5,0.7)] border-b border-[var(--border-soft)]">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            <ArrowLeft />
            <span className="font-mono uppercase tracking-widest text-[10px] sm:text-xs hidden sm:inline">
              Quitter
            </span>
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent-cyan)] animate-ping opacity-60" />
              <span className="relative rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
            </span>
            <span className="hidden sm:inline">NEUREX ·</span> Analyse biométrique
          </div>
          <div className="font-mono text-xs sm:text-sm text-white font-bold">
            {String(Math.min(stepIndex + 1, STEPS.length)).padStart(2, "0")}
            <span className="text-[var(--text-tertiary)] font-normal">
              /{String(STEPS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        {/* Barre de progression futuriste */}
        <div className="relative h-1 w-full bg-[rgba(0,217,255,0.05)]">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] transition-all duration-700 ease-out shadow-[0_0_12px_var(--accent-blue)]"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm transition-all duration-700"
            style={{ left: `calc(${progress}% - 32px)` }}
          />
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6 py-12">
        {generating ? (
          <LoaderAI message={LOADING_MESSAGES[loadingIdx]} idx={loadingIdx} />
        ) : (
          <div
            key={stepIndex}
            className="w-full max-w-2xl animate-fade-up"
          >
            <div className="card-premium p-6 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent shadow-[0_0_12px_var(--accent-blue)]" />

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="hud-tag">
                  Étape {String(stepIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  Données · {step.key}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gradient-soft">
                {step.title}
              </h1>
              <p className="mt-3 text-[var(--text-secondary)] text-sm sm:text-base">
                {step.subtitle}
              </p>

              <div className="mt-10">
                {step.type === "choice" && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.options.map((opt) => {
                      const active = currentValue === opt.value;
                      return (
                        <button
                          key={String(opt.value)}
                          onClick={() => handleSelect(opt.value)}
                          className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 overflow-hidden ${
                            active
                              ? "border-[var(--accent-blue)] bg-[rgba(0,217,255,0.08)] shadow-[0_0_0_2px_rgba(0,217,255,0.12),0_0_24px_rgba(0,217,255,0.25)]"
                              : "border-[var(--border-soft)] bg-white/[0.02] hover:border-[var(--border-strong)] hover:bg-[rgba(0,217,255,0.04)]"
                          }`}
                        >
                          {active && (
                            <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
                          )}
                          <div className="flex items-start gap-3">
                            {opt.icon && (
                              <span
                                className={`text-2xl font-display font-bold ${
                                  active
                                    ? "text-[var(--accent-cyan)]"
                                    : "text-white/60"
                                }`}
                              >
                                {opt.icon}
                              </span>
                            )}
                            <div className="flex-1">
                              <div className="font-display text-base sm:text-lg font-bold text-white tracking-wide">
                                {opt.label}
                              </div>
                              {opt.desc && (
                                <div className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
                                  {opt.desc}
                                </div>
                              )}
                            </div>
                            <div
                              className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                                active
                                  ? "border-[var(--accent-blue)] bg-[var(--accent-cyan)]"
                                  : "border-[var(--border-strong)]"
                              }`}
                            >
                              {active && (
                                <span className="h-2 w-2 rounded-full bg-[var(--bg-primary)]" />
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step.type === "number" && (
                  <NumberField
                    step={step}
                    value={currentValue ?? step.default}
                    onChange={(v) =>
                      setAnswers((a) => ({ ...a, [step.key]: v }))
                    }
                  />
                )}
              </div>

              <div className="mt-10 flex items-center justify-between gap-3">
                <button
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className={`btn-ghost ${
                    stepIndex === 0 ? "opacity-30 pointer-events-none" : ""
                  }`}
                >
                  <ArrowLeft />
                  Retour
                </button>
                {step.type === "number" && (
                  <button
                    onClick={() => goNext()}
                    className="btn-glow"
                  >
                    {stepIndex === STEPS.length - 1
                      ? "Lancer la génération"
                      : "Continuer"}
                    <ArrowRight />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
              Tes données restent dans ton navigateur · jamais transmises
            </div>
          </div>
        )}
      </main>
    </>
  );
}

/* ============== NUMBER FIELD ============== */
function NumberField({ step, value, onChange }) {
  const v = Number(value) || step.default;
  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="range"
          min={step.min}
          max={step.max}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full appearance-none h-2 rounded-full outline-none cursor-pointer slider-premium"
          style={{
            background: `linear-gradient(to right, var(--accent-blue) 0%, var(--accent-cyan) ${
              ((v - step.min) / (step.max - step.min)) * 100
            }%, rgba(0,217,255,0.08) ${
              ((v - step.min) / (step.max - step.min)) * 100
            }%, rgba(0,217,255,0.08) 100%)`,
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={() => onChange(Math.max(step.min, v - 1))}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[var(--border-strong)] bg-[rgba(0,217,255,0.04)] hover:bg-[rgba(0,217,255,0.1)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-all text-xl font-bold"
          aria-label="Diminuer"
        >
          −
        </button>
        <div className="flex items-baseline gap-2 min-w-[160px] justify-center">
          <input
            type="number"
            min={step.min}
            max={step.max}
            value={v}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-transparent border-none outline-none font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-gradient-strong text-center w-28 sm:w-32 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="font-mono text-base sm:text-lg text-[var(--text-tertiary)] uppercase tracking-widest">
            {step.suffix}
          </span>
        </div>
        <button
          onClick={() => onChange(Math.min(step.max, v + 1))}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[var(--border-strong)] bg-[rgba(0,217,255,0.04)] hover:bg-[rgba(0,217,255,0.1)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-all text-xl font-bold"
          aria-label="Augmenter"
        >
          +
        </button>
      </div>

      <div className="flex justify-between text-[10px] sm:text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">
        <span>
          MIN · {step.min} {step.suffix}
        </span>
        <span>
          MAX · {step.max} {step.suffix}
        </span>
      </div>
    </div>
  );
}

/* ============== LOADER IA ============== */
function LoaderAI({ message, idx }) {
  return (
    <div className="w-full max-w-xl text-center animate-fade-in px-4">
      <div className="relative mx-auto h-44 w-44 sm:h-48 sm:w-48 mb-8 sm:mb-10">
        <div className="absolute inset-0 rounded-full border border-[var(--accent-blue)]/40 animate-spin-slow shadow-[0_0_24px_rgba(0,217,255,0.25)]" />
        <div className="absolute inset-3 rounded-full border border-[var(--accent-cyan)]/30 animate-spin-slow [animation-direction:reverse] [animation-duration:8s]" />
        <div className="absolute inset-6 rounded-full border-2 border-dashed border-white/10 animate-spin-slow [animation-duration:20s]" />
        <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.55),transparent_70%)] blur-xl animate-pulse-glow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-3xl sm:text-4xl font-extrabold text-gradient-strong">
            {String(Math.round(((idx + 1) / 8) * 100)).padStart(2, "0")}%
          </div>
        </div>
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-cyan)] mb-3 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-hud-blink" />
        Moteur NEUREX · Calcul en cours
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-hud-blink" />
      </div>
      <h2
        key={message}
        className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient-soft animate-fade-in min-h-[60px] tracking-wide"
      >
        {message}
      </h2>

      <div className="mt-8 sm:mt-10 max-w-md mx-auto space-y-2.5">
        {[
          "Profil biométrique",
          "Capacité de travail",
          "Charges & périodisation",
          "Stratégie nutritionnelle",
        ].map((label, i) => {
          const done = idx >= i * 2 + 1;
          const active = idx === i * 2 || idx === i * 2 + 1;
          return (
            <div
              key={label}
              className="flex items-center gap-3 text-left font-mono text-xs"
            >
              <div
                className={`h-2 w-2 rounded-sm transition-colors ${
                  done
                    ? "bg-[var(--accent-cyan)] shadow-[0_0_6px_var(--accent-cyan)]"
                    : active
                      ? "bg-[var(--accent-blue)] animate-pulse shadow-[0_0_6px_var(--accent-blue)]"
                      : "bg-white/15"
                }`}
              />
              <span
                className={`uppercase tracking-widest ${
                  done || active
                    ? "text-white"
                    : "text-[var(--text-tertiary)]"
                }`}
              >
                {label}
              </span>
              <div className="flex-1 h-px bg-white/5" />
              <span
                className={`uppercase tracking-[0.2em] text-[10px] font-bold ${
                  done
                    ? "text-[var(--accent-cyan)]"
                    : active
                      ? "text-[var(--accent-blue)]"
                      : "text-[var(--text-tertiary)]"
                }`}
              >
                {done ? "OK" : active ? "···" : "—"}
              </span>
            </div>
          );
        })}
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
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M11 19l-7-7 7-7" />
    </svg>
  );
}
