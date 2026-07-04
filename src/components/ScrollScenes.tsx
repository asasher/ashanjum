"use client";

import { useEffect } from "react";

// Drives every [data-scene] element with a --p custom property (0..1)
// from a single rAF-throttled scroll listener. CSS does the rest — see
// the fx-* rules in globals.css. Arms nothing under reduced motion, so
// the page stays fully static there and for no-JS visitors.
export function ScrollScenes() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("fx-armed");

    let scenes: { el: HTMLElement; mode: string }[] = [];
    const collect = () => {
      scenes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scene]"),
      ).map((el) => ({ el, mode: el.dataset.scene ?? "enter" }));
    };
    collect();

    const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
    let ticking = false;

    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      root.style.setProperty("--scroll-y", String(window.scrollY));
      for (const { el, mode } of scenes) {
        const r = el.getBoundingClientRect();
        let p: number;
        if (mode === "exit") {
          // 0 while fully in view at top, 1 once scrolled past.
          p = clamp(-r.top / (r.height * 0.9));
        } else if (mode === "pin") {
          // Progress through a taller-than-viewport pinned container.
          p = clamp(-r.top / (r.height - vh || 1));
        } else {
          // enter: 0 at viewport bottom, 1 near the top third.
          p = clamp((vh - r.top) / (vh * 0.72));
        }
        el.style.setProperty("--p", p.toFixed(4));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("fx-armed");
    };
  }, []);

  return null;
}
