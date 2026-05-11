import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSilhouette from "@/components/HeroSilhouette";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <Navbar />

      <main className="relative flex-1">
        {/* ===================== HERO ===================== */}
        <section className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-24 pb-20">
          {/* Glow géant derrière le titre */}
          <div className="absolute -top-20 left-0 right-0 h-[500px] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.18),transparent_60%)] blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="hud-tag mb-7 animate-fade-up">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
                </span>
                Système opérationnel · Modèle v3.1
              </div>

              <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight animate-fade-up delay-100">
                <span className="block text-gradient-soft">FORGE</span>
                <span className="block text-gradient-strong text-glow-blue mt-1">
                  TON CORPS
                </span>
                <span className="block text-gradient-soft mt-1">DU FUTUR.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed animate-fade-up delay-200">
                L&apos;intelligence NEUREX analyse{" "}
                <span className="text-[var(--accent-cyan)] font-medium">
                  142 variables physiologiques
                </span>{" "}
                pour générer ton programme d&apos;entraînement, ta nutrition et
                ta progression — calibrés sur ton ADN sportif.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up delay-300">
                <Link href="/analyse" className="btn-glow group">
                  Commencer l&apos;analyse
                  <ArrowRight />
                </Link>
                <a href="#how" className="btn-ghost">
                  Voir le processus
                </a>
              </div>

              <div className="mt-12 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-6 max-w-md animate-fade-up delay-400">
                <Stat value="98%" label="Précision biométrique" />
                <Stat value="60s" label="Génération complète" />
                <Stat value="24k+" label="Profils analysés" />
              </div>
            </div>

            <div className="relative animate-fade-up delay-300">
              <HeroSilhouette />
            </div>
          </div>
        </section>

        {/* ===================== BANDEAU CERTIFICATIONS ===================== */}
        <section className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-10 sm:py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] text-center">
              Calibré sur les standards de la performance
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 opacity-60">
            {["NSCA", "ACSM", "ISSN", "WHO", "IAAF"].map((label) => (
              <div
                key={label}
                className="text-center font-display text-base sm:text-lg md:text-xl tracking-[0.25em] text-[var(--text-secondary)]"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* ===================== FEATURES ===================== */}
        <section
          id="features"
          className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-20 sm:py-24"
        >
          <SectionHeader
            badge="Technologie"
            title={
              <>
                <span className="text-gradient-soft">Une intelligence</span>
                <br />
                <span className="text-gradient-strong">
                  entraînée à te dépasser.
                </span>
              </>
            }
            description="Trois moteurs d'analyse fonctionnent en parallèle pour modéliser ton corps, ton potentiel et ton plan d'action."
          />

          <div className="mt-14 sm:mt-16 grid md:grid-cols-3 gap-5">
            <FeatureCard
              icon={<IconScan />}
              title="Analyse biométrique"
              description="Composition corporelle, métabolisme de base, dépense énergétique et niveau de récupération calculés en temps réel."
              metric="142 points de données"
            />
            <FeatureCard
              icon={<IconNeural />}
              title="Moteur neuronal"
              description="Notre modèle adapte la charge, le tempo et la périodisation à ton historique sportif et ta capacité de progression."
              metric="3.8M sessions analysées"
              highlight
            />
            <FeatureCard
              icon={<IconNutrition />}
              title="Optimisation nutritionnelle"
              description="Calories, macronutriments et timing alimentaire calibrés sur ton objectif — du cut au bulk en passant par la performance."
              metric="Précision ±2%"
            />
          </div>
        </section>

        {/* ===================== HOW IT WORKS ===================== */}
        <section
          id="how"
          className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-20 sm:py-24"
        >
          <SectionHeader
            badge="Processus"
            title={
              <>
                <span className="text-gradient-soft">Du </span>
                <span className="text-gradient-strong">scan</span>
                <span className="text-gradient-soft"> au programme,</span>
                <br />
                <span className="text-gradient-soft">en quatre étapes.</span>
              </>
            }
            description="Un protocole conçu pour les athlètes — accessible à n'importe qui."
          />

          <div className="mt-14 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StepCard
              n="01"
              title="Profil"
              text="Sexe, âge, morphologie, niveau de forme actuel."
            />
            <StepCard
              n="02"
              title="Objectif"
              text="Prise de masse, perte de gras, force, endurance, recomp."
            />
            <StepCard
              n="03"
              title="Contexte"
              text="Fréquence d'entraînement, équipement, contraintes."
            />
            <StepCard
              n="04"
              title="Programme"
              text="Plan hebdomadaire, nutrition et tracking livrés instantanément."
            />
          </div>
        </section>

        {/* ===================== PERFORMANCE BLOCK ===================== */}
        <section
          id="stats"
          className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-20 sm:py-24"
        >
          <div className="card-premium p-7 sm:p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.25),transparent_70%)] blur-2xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(78,255,243,0.16),transparent_70%)] blur-2xl" />
            <div className="scan-line" />

            <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div>
                <div className="hud-tag mb-6">Performance</div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                  <span className="text-gradient-soft">Plus rapide</span>
                  <br />
                  <span className="text-gradient-soft">qu&apos;un coach.</span>
                  <br />
                  <span className="text-gradient-strong">Plus précis</span>
                  <br />
                  <span className="text-gradient-soft">qu&apos;une intuition.</span>
                </h2>
                <p className="mt-6 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
                  Là où un programme générique te fait perdre des semaines,
                  NEUREX adapte chaque variable d&apos;entraînement à ta
                  physiologie unique.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <BigMetric value="3.4×" label="Progression mesurée" />
                <BigMetric value="–47%" label="Plateaux évités" accent />
                <BigMetric value="92" label="Score d'adhérence" accent />
                <BigMetric value="<60s" label="Temps de génération" />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CTA FINAL ===================== */}
        <section className="relative mx-auto max-w-5xl px-5 sm:px-6 md:px-10 py-20 sm:py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.18),transparent_70%)] blur-3xl pointer-events-none" />
          <h2 className="relative font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            <span className="text-gradient-soft">TON PROCHAIN NIVEAU</span>
            <br />
            <span className="text-gradient-strong text-glow-blue">
              COMMENCE MAINTENANT.
            </span>
          </h2>
          <p className="relative mt-6 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            60 secondes pour scanner ton profil. Une vie pour transformer ton
            corps.
          </p>
          <div className="relative mt-10">
            <Link href="/analyse" className="btn-glow text-base">
              Lancer l&apos;analyse biométrique
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ============== Sub components ============== */

function Stat({ value, label }) {
  return (
    <div className="relative">
      <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">
        {value}
      </div>
      <div className="mt-1 text-[10px] sm:text-xs text-[var(--text-tertiary)] uppercase tracking-[0.2em] font-mono">
        {label}
      </div>
      <div className="absolute -left-3 top-1 bottom-1 w-px bg-[var(--accent-blue)]/40 hidden sm:block" />
    </div>
  );
}

function SectionHeader({ badge, title, description }) {
  return (
    <div className="max-w-2xl">
      <div className="hud-tag mb-6">{badge}</div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description, metric, highlight }) {
  return (
    <div
      className={`card-premium p-7 sm:p-8 group ${highlight ? "border-glow animate-glow-pulse" : ""}`}
    >
      <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-cyan)]/5 border border-[var(--border-strong)] text-[var(--accent-cyan)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold mb-3 tracking-wide">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        {description}
      </p>
      <div className="mt-6 pt-4 border-t border-[var(--border-soft)] font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-cyan)] flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_6px_var(--accent-cyan)]" />
        {metric}
      </div>
    </div>
  );
}

function StepCard({ n, title, text }) {
  return (
    <div className="relative group">
      <div className="card-premium p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-lg font-bold text-gradient">
            {n}
          </span>
          <div className="h-px flex-1 ml-3 bg-gradient-to-r from-[var(--border-strong)] to-transparent" />
        </div>
        <h4 className="font-display text-lg font-bold mb-2 tracking-wide">
          {title}
        </h4>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function BigMetric({ value, label, accent }) {
  return (
    <div className="relative rounded-xl border border-[var(--border-soft)] bg-[rgba(0,217,255,0.03)] p-5 sm:p-6 backdrop-blur-sm overflow-hidden group hover:border-[var(--accent-blue)]/40 transition-colors">
      <div
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold ${
          accent ? "text-gradient-strong" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-mono">
        {label}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

/* ============== Icons ============== */

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
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

function IconScan() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" />
    </svg>
  );
}

function IconNeural() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M12 7v10M7 12h10M7 7l10 10M17 7L7 17" />
    </svg>
  );
}

function IconNutrition() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4M12 22v-4M2 12h4M22 12h-4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
