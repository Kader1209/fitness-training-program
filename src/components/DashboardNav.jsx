"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "#" },
  { id: "workout", label: "Entraînement", href: "/programme" },
  { id: "progression", label: "Progression", href: "/programme" },
  { id: "nutrition", label: "Nutrition", href: "/programme" },
  { id: "profile", label: "Profil", href: "/analyse" },
];

export default function DashboardNav({ level = 28, label = "ATHLÈTE" }) {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false);
  // Fermer le menu mobile au scroll
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-[rgba(5,5,5,0.75)]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/45 to-transparent" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 gap-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
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
            <span className="font-display text-base font-bold tracking-[0.15em]">
              NEUREX
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--text-tertiary)] mt-0.5">
              Training System
            </span>
          </div>
        </Link>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {ITEMS.map((it) => {
            const isActive = it.id === active;
            return (
              <Link
                key={it.id}
                href={it.href}
                onClick={() => setActive(it.id)}
                className="relative group px-3 xl:px-4 py-2 rounded-md text-[11px] xl:text-xs font-tech tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                <span className={isActive ? "text-[var(--accent-cyan)]" : ""}>
                  {it.label}
                </span>
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-blue)] transition-all duration-300 ${
                    isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border-strong)] bg-[rgba(0,217,255,0.05)]">
            <svg width="16" height="16" viewBox="0 0 40 40" className="shrink-0">
              <path
                d="M 20 4 L 34 12 L 34 28 L 20 36 L 6 28 L 6 12 Z"
                fill="rgba(78,255,243,0.18)"
                stroke="#4efff3"
                strokeWidth="1.5"
                style={{ filter: "drop-shadow(0 0 3px rgba(78,255,243,0.6))" }}
              />
            </svg>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
              LVL
            </div>
            <div className="font-display text-base font-extrabold text-white">
              {level}
            </div>
          </div>

          {/* Menu burger mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[rgba(0,217,255,0.04)] hover:border-[var(--accent-blue)] transition-colors"
            aria-label="Menu"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute inset-x-0 top-0 h-[1.5px] bg-[var(--accent-cyan)] transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[5px] h-[1.5px] bg-[var(--accent-cyan)] transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--accent-cyan)] transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Menu mobile expand */}
      <div
        className={`lg:hidden relative overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-3 rounded-lg border border-[var(--border-strong)] bg-[rgba(10,13,18,0.92)] backdrop-blur-xl divide-y divide-[var(--border-soft)]">
          {ITEMS.map((it) => (
            <Link
              key={it.id}
              href={it.href}
              onClick={() => {
                setActive(it.id);
                setOpen(false);
              }}
              className="flex items-center justify-between px-4 py-3 font-tech text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
            >
              <span className={it.id === active ? "text-[var(--accent-cyan)]" : ""}>
                {it.label}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
