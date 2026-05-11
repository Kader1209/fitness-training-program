import Image from "next/image";

/* =====================================================
   HologramBody
   -----------------------------------------------------
   Affiche un corps athletique en hologramme cyan,
   entoure d'effets HUD : scanline verticale, particules,
   glow, halo au sol, et annotations musculaires.

   L'image source est /public/hologram-body.png.
   Pour la remplacer par un asset plus realiste :
   - Generer une nouvelle image (PNG/WebP, fond noir/transparent,
     corps complet, tete lisse, palette cyan/bleu)
   - L'enregistrer sous /public/hologram-body.png
   ===================================================== */

const LABELS_DESKTOP = [
  { id: "delt", text: "DELTOÏDE", cible: 92, side: "right", topPct: 22, lineTo: 28 },
  { id: "pect", text: "PECTORAUX", cible: 88, side: "right", topPct: 32, lineTo: 36 },
  { id: "biceps", text: "BICEPS", cible: 76, side: "left", topPct: 38, lineTo: 30 },
  { id: "abdos", text: "ABDOS", cible: 84, side: "left", topPct: 48, lineTo: 42 },
  { id: "quads", text: "QUADRICEPS", cible: 89, side: "right", topPct: 62, lineTo: 38 },
  { id: "calves", text: "MOLLETS", cible: 72, side: "left", topPct: 82, lineTo: 40 },
];

const LABELS_MOBILE = ["DELTOÏDE", "PECTORAUX", "BICEPS", "ABDOS", "QUADRI.", "MOLLETS"];

export default function HologramBody({
  src = "/hologram-body.png",
  showLabels = true,
}) {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-[3/4]">
      {/* ============ HALO CYAN AUTOUR ============ */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(0,217,255,0.35),transparent_65%)] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(78,255,243,0.25),transparent_70%)] blur-2xl" />

      {/* ============ PARTICULES ============ */}
      <Particles />

      {/* ============ CADRE HUD COINS ============ */}
      {[
        "top-0 left-0",
        "top-0 right-0 rotate-90",
        "bottom-0 left-0 -rotate-90",
        "bottom-0 right-0 rotate-180",
      ].map((pos, i) => (
        <svg
          key={i}
          className={`absolute ${pos} w-6 h-6 text-[var(--accent-blue)] opacity-70 z-20`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 2 8 L 2 2 L 8 2" />
        </svg>
      ))}

      {/* ============ IMAGE HOLOGRAMME ============ */}
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt="Modèle 3D holographique du corps"
          fill
          priority
          sizes="(max-width: 768px) 80vw, 520px"
          className="object-contain select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(0 0 16px rgba(0,217,255,0.55)) drop-shadow(0 0 40px rgba(78,255,243,0.25))",
          }}
        />

        {/* Légère teinte cyan par-dessus pour intégrer */}
        <div className="absolute inset-0 bg-[var(--accent-blue)] mix-blend-overlay opacity-10 pointer-events-none" />

        {/* ============ SCANLINE VERTICALE ============ */}
        <div className="absolute inset-x-0 top-0 h-[3px] pointer-events-none scanline" />
        <div className="absolute inset-x-0 top-0 h-px pointer-events-none scanline-core" />

        {/* Grille digitale subtile */}
        <div className="absolute inset-0 bg-grid-fine opacity-10 mix-blend-screen pointer-events-none" />
      </div>

      {/* ============ HALO AU SOL ============ */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[2%] w-[70%] h-[8%] pointer-events-none">
        <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse,rgba(78,255,243,0.55),transparent_70%)] blur-xl animate-pulse-glow" />
        <div className="absolute inset-x-[8%] inset-y-[20%] rounded-[50%] border border-[var(--accent-cyan)]/40" />
        <div className="absolute inset-x-[20%] inset-y-[35%] rounded-[50%] border border-[var(--accent-cyan)]/25 [animation:spin-slow_18s_linear_infinite]" />
      </div>

      {/* ============ ANNOTATIONS MUSCULAIRES DESKTOP ============ */}
      {showLabels && (
        <>
          <div className="hidden md:block">
            {LABELS_DESKTOP.map((l) => (
              <MuscleLabel key={l.id} {...l} />
            ))}
          </div>

          {/* ============ ANNOTATIONS MOBILE (compactes en bas) ============ */}
          <div className="md:hidden absolute -bottom-2 inset-x-0 px-2 pointer-events-none">
            <div className="flex flex-wrap justify-center gap-1.5">
              {LABELS_MOBILE.map((l) => (
                <span
                  key={l}
                  className="font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--accent-cyan)] px-1.5 py-0.5 rounded border border-[var(--border-strong)] bg-[rgba(0,217,255,0.06)] backdrop-blur-sm"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* HUD status flottant */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent-cyan)] flex items-center gap-2 opacity-90 z-20 pointer-events-none">
        <span className="h-1 w-1 rounded-full bg-[var(--accent-cyan)] animate-hud-blink" />
        SCAN_3D · ACTIVE
        <span className="h-1 w-1 rounded-full bg-[var(--accent-cyan)] animate-hud-blink" />
      </div>

      <style>{`
        @keyframes scanline-move {
          0%   { transform: translateY(0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(95%); opacity: 0; }
        }
        .scanline {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(78, 255, 243, 0.5) 30%,
            rgba(78, 255, 243, 0.9) 50%,
            rgba(78, 255, 243, 0.5) 70%,
            transparent 100%
          );
          box-shadow: 0 0 16px rgba(78, 255, 243, 0.8);
          animation: scanline-move 5s ease-in-out infinite;
          filter: blur(0.6px);
        }
        .scanline-core {
          background: rgba(255, 255, 255, 0.95);
          animation: scanline-move 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* =====================================================
   Annotation latérale d'un muscle
   ===================================================== */
function MuscleLabel({ text, cible, side, topPct, lineTo }) {
  const isRight = side === "right";
  return (
    <div
      className="absolute z-10 pointer-events-none"
      style={{
        top: `${topPct}%`,
        [isRight ? "right" : "left"]: "-8%",
      }}
    >
      <div className={`flex items-center gap-2 ${isRight ? "flex-row" : "flex-row-reverse"}`}>
        {/* Pointeur (cercle + ligne) */}
        <div className={`relative ${isRight ? "" : "scale-x-[-1]"}`}>
          <svg
            width={lineTo + 12}
            height="20"
            viewBox={`0 0 ${lineTo + 12} 20`}
            className="overflow-visible"
          >
            <line
              x1="0"
              y1="10"
              x2={lineTo}
              y2="10"
              stroke="rgba(78,255,243,0.6)"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
            <circle
              cx="0"
              cy="10"
              r="2.5"
              fill="#4efff3"
              style={{ filter: "drop-shadow(0 0 4px #4efff3)" }}
            />
            <circle cx={lineTo} cy="10" r="1.5" fill="#4efff3" />
          </svg>
        </div>

        {/* Bloc label */}
        <div
          className={`relative bg-[rgba(0,217,255,0.06)] backdrop-blur-sm border border-[var(--border-strong)] rounded-md px-2.5 py-1 ${
            isRight ? "" : "text-right"
          }`}
        >
          <div
            className={`absolute top-0 bottom-0 w-0.5 bg-[var(--accent-cyan)] ${isRight ? "left-0" : "right-0"}`}
            style={{ boxShadow: "0 0 6px #4efff3" }}
          />
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-cyan)] leading-none">
            {text}
          </div>
          <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
            CIBLE · {cible}%
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   Particules flottantes
   ===================================================== */
function Particles() {
  // positions semi-aleatoires mais deterministes (eviter hydration mismatch)
  const seeds = [
    { x: 12, y: 20, d: 5.0, s: 1.2 },
    { x: 86, y: 35, d: 6.5, s: 1.6 },
    { x: 20, y: 60, d: 4.2, s: 1.0 },
    { x: 78, y: 78, d: 7.0, s: 1.4 },
    { x: 8, y: 88, d: 5.5, s: 1.1 },
    { x: 92, y: 18, d: 6.0, s: 1.3 },
    { x: 50, y: 8, d: 4.5, s: 1.5 },
    { x: 30, y: 92, d: 6.8, s: 1.2 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {seeds.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--accent-cyan)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            boxShadow: `0 0 ${p.s * 4}px rgba(78,255,243,0.9)`,
            animation: `float ${p.d}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
