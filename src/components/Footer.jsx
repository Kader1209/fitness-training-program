export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-tertiary)]">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Système actif · Latence 12ms
          </span>
        </div>
        <div className="font-mono text-xs">
          © {new Date().getFullYear()} NEUREX · Intelligence sportive
          augmentée
        </div>
      </div>
    </footer>
  );
}
