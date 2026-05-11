"use client";

import Link from "next/link";

const TABS = [
  {
    id: "home",
    label: "Accueil",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 2l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    id: "exercises",
    label: "Exercices",
    href: "/programme",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.4 14.4 9.6 9.6M18.66 9.34l-2.83 2.83M21.5 12.5l-1.41 1.41M5.34 18.66l2.83-2.83M2.5 11.5l1.41-1.41M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" />
      </svg>
    ),
  },
  { id: "add", primary: true, href: "/analyse" },
  {
    id: "programs",
    label: "Programmes",
    href: "/programme",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 6v6c0 5 3.4 9.6 8 11 4.6-1.4 8-6 8-11V6z" />
      </svg>
    ),
  },
  {
    id: "community",
    label: "Communauté",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function MobileTabBar({ active = "home" }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40">
      <div className="absolute inset-0 backdrop-blur-xl bg-[rgba(5,5,5,0.85)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/40 to-transparent" />
      <div className="relative grid grid-cols-5 items-center pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 px-2">
        {TABS.map((tab) =>
          tab.primary ? (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative -mt-7 mx-auto"
              aria-label="Lancer une analyse"
            >
              <div className="absolute -inset-2 rounded-full bg-[var(--accent-blue)]/40 blur-xl" />
              <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.7)] border border-white/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#001218" strokeWidth="3" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </Link>
          ) : (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-1.5 ${
                active === tab.id
                  ? "text-[var(--accent-cyan)]"
                  : "text-[var(--text-tertiary)]"
              }`}
            >
              {tab.icon}
              <span className="font-tech text-[9px] uppercase tracking-[0.15em]">
                {tab.label}
              </span>
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
