import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-[rgba(5,5,7,0.6)] border-b border-white/[0.05]" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-green)] opacity-90" />
            <div className="absolute inset-[2px] rounded-[6px] bg-[var(--bg-primary)] flex items-center justify-center">
              <span className="font-display text-sm font-bold text-gradient">
                N
              </span>
            </div>
            <div className="absolute -inset-1 rounded-lg bg-[var(--accent-cyan)]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            NEUREX
          </span>
          <span className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] border border-white/10 rounded-full px-2 py-0.5">
            v1.0
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm text-[var(--text-secondary)]">
          <a
            href="#features"
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            Technologie
          </a>
          <a
            href="#how"
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            Processus
          </a>
          <a
            href="#stats"
            className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            Performance
          </a>
        </div>

        <Link href="/analyse" className="btn-glow !py-2.5 !px-5 text-sm">
          Lancer l&apos;analyse
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
