export default function Footer() {
  return (
    <footer className="relative mt-24 sm:mt-32 border-t border-[var(--border-soft)]">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-tertiary)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-[var(--accent-cyan)] blur-md" />
          </div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            Système actif · Latence 12ms
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-center">
          © {new Date().getFullYear()} NEUREX · Intelligence sportive augmentée
        </div>
      </div>
    </footer>
  );
}
