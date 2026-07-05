"use client";

import { useEffect, useState } from "react";

const KEY = "ashanjum-theme";

function effectiveTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "dark" || set === "light") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Deferred a frame: the label depends on document state that only
    // exists client-side, and must not desync hydration.
    const raf = requestAnimationFrame(() => setMode(effectiveTheme()));
    return () => cancelAnimationFrame(raf);
  }, []);

  function flip() {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode */
    }
    setMode(next);
  }

  return (
    <button
      type="button"
      onClick={flip}
      aria-label="Switch color theme"
      className="border border-rule px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-ink-2 uppercase transition-colors hover:border-ink-3 hover:text-ink"
    >
      <span className="text-azure-text">●</span>{" "}
      {mode === null ? "Theme" : mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
