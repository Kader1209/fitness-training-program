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
        <section className="relative mx-auto max-w-7xl px-6 md:px-10 pt-16 md:pt-24 pb-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-8 animate-fade-up">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-green)]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
                  Modèle neuronal · v3.1 · Disponible
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.95] tracking-tight animate-fade-up delay-100">
                <span className="text-gradient-soft">L&apos;IA qui</span>
                <br />
                <span className="text-gradient">construit</span>
                <br />
                <span className="text-gradient-soft">ton physique.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed animate-fade-up delay-200">
                Une analyse biométrique avancée transforme tes objectifs en un
                programme d&apos;entraînement, une nutrition et une progression
                conçus sur mesure — en moins de 60 secondes.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
                <Link href="/analyse" className="btn-glow group">
                  Commencer l&apos;analyse
                  <ArrowRight />
                </Link>
                <a href="#how" className="btn-ghost">
                  Voir le processus
                </a>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-6 max-w-md animate-fade-up delay-400">
                <Stat value="98%" label="Précision biométrique" />
                <Stat value="60s" label="Génération complète" />
                <Stat value="24k+" label="Programmes générés" />
              </div>
            </div>

            <div className="relative animate-fade-up delay-300">
              <HeroSilhouette />
            </div>
          </div>
        </section>

        {/* ===================== TRUST / LOGOS ===================== */}
        <section className="relative mx-auto max-w-7xl px-6 md:px-10 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-tertiary)]">
              Calibré sur les standards de la performance
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 opacity-60">
            {["NSCA", "ACSM", "ISSN", "WHO", "IAAF"].map((label) => (
              <div
                key={label}
                className="text-center font-display text-lg md:text-xl tracking-[0.2em] text-white/70"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* ===================== FEATURES ===================== */}
        <section
          id="features"
          className="relative mx-auto max-w-7xl px-6 md:px-10 py-24"
        >
          <SectionHeader
            badge="Technologie"
            title={
              <>
                Une intelligence
                <br />
                <span className="text-gradient">entraînée à te dépasser.</span>
              </>
            }
            description="Trois moteurs d'analyse fonctionnent en parallèle pour modéliser ton corps, ton potentiel et ton plan d'action."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
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
          className="relative mx-auto max-w-7xl px-6 md:px-10 py-24"
        >
          <SectionHeader
            badge="Processus"
            title={
              <>
                Du <span className="text-gradient">scan</span> au programme,
                <br />
                en quatre étapes.
              </>
            }
            description="Un protocole conçu pour les athlètes — accessible à n'importe qui."
          />

          <div className="mt-16 grid md:grid-cols-4 gap-4">
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

        {/* ===================== STATS / METRICS ===================== */}
        <section
          id="stats"
          className="relative mx-auto max-w-7xl px-6 md:px-10 py-24"
        >
          <div className="card-premium p-10 md:p-16 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.2),transparent_70%)] blur-2xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(0,255,157,0.15),transparent_70%)] blur-2xl" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-cyan)]">
                    Performance
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-gradient-soft">
                  Plus rapide qu&apos;un coach.
                  <br />
                  Plus précis qu&apos;une intuition.
                </h2>
                <p className="mt-6 text-[var(--text-secondary)] text-lg leading-relaxed">
                  Là où un programme générique te fait perdre des semaines,
                  NEUREX adapte chaque variable d&apos;entraînement à ta
                  physiologie unique.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <BigMetric value="3.4×" label="Progression mesurée" />
                <BigMetric value="–47%" label="Plateaux évités" accent />
                <BigMetric value="92" label="Score d'adhérence" accent />
                <BigMetric value="<60s" label="Temps de génération" />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CTA FINAL ===================== */}
        <section className="relative mx-auto max-w-5xl px-6 md:px-10 py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.15),transparent_70%)] blur-3xl" />
          <h2 className="relative font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            <span className="text-gradient-soft">Ton prochain niveau</span>
            <br />
            <span className="text-gradient">commence maintenant.</span>
          </h2>
          <p className="relative mt-6 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
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
    <div>
      <div className="font-display text-3xl font-semibold text-gradient">
        {value}
      </div>
      <div className="mt-1 text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono">
        {label}
      </div>
    </div>
  );
}

function SectionHeader({ badge, title, description }) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
        <span className="h-1 w-1 rounded-full bg-[var(--accent-cyan)]" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-cyan)]">
          {badge}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-gradient-soft">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-[var(--text-secondary)] text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description, metric, highlight }) {
  return (
    <div
      className={`card-premium p-8 group ${highlight ? "border-glow" : ""}`}
    >
      <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 text-[var(--accent-cyan)] group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        {description}
      </p>
      <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] uppercase tracking-widest text-[var(--accent-cyan)]">
        → {metric}
      </div>
    </div>
  );
}

function StepCard({ n, title, text }) {
  return (
    <div className="relative group">
      <div className="card-premium p-6 h-full">
        <div className="font-mono text-xs text-[var(--accent-cyan)] mb-4">
          {n}
        </div>
        <h4 className="font-display text-lg font-semibold mb-2">{title}</h4>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function BigMetric({ value, label, accent }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm">
      <div
        className={`font-display text-4xl md:text-5xl font-semibold ${
          accent ? "text-gradient" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-mono">
        {label}
      </div>
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
