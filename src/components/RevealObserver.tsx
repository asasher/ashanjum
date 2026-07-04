"use client";

import { useEffect } from "react";

/**
 * Arms the CSS scroll-reveal (see globals.css). Content is fully visible
 * without JS or with prefers-reduced-motion; this only enhances.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("reveal-armed");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => {
      // Anything already in view stays visible; only below-fold elements arm.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("is-in");
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-armed");
    };
  }, []);

  return null;
}
