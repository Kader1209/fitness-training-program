import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-[rgba(5,5,5,0.65)]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/40 to-transparent" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 md:px-10 py-3 sm:py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[2px] rounded-[6px] bg-[var(--bg-primary)] flex items-center justify-center">
              <span className="font-display text-sm font-extrabold text-gradient">
                N
              </span>
            </div>
            <div className="absolute -inset-1.5 rounded-lg bg-[var(--accent-blue)]/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base sm:text-lg font-bold tracking-[0.15em]">
              NEUREX
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[var(--text-tertiary)] mt-0.5">
              Neural Performance Engine
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { href: "#features", label: "Technologie" },
            { href: "#how", label: "Processus" },
            { href: "#stats", label: "Performance" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-4 py-2 rounded-md text-sm font-tech tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-blue)] transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}
        </div>

        <Link href="/analyse" className="btn-glow !py-2.5 !px-4 sm:!px-5 text-xs sm:text-sm">
          <span className="hidden sm:inline">Lancer l&apos;analyse</span>
          <span className="sm:hidden">Analyse</span>
          <ArrowIcon />
        </Link>
      </nav>
    </header>
  );
}

function ArrowIcon() {
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
