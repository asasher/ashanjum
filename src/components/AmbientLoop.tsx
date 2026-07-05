"use client";

import { useEffect, useRef } from "react";

/* A muted, looping ambient clip that respects prefers-reduced-motion:
   without JS or with reduced motion it stays on its poster frame. */
export function AmbientLoop({
  src,
  poster,
  caption,
  aspect = "aspect-[4/3]",
}: {
  src: string;
  poster: string;
  caption: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure>
      <div
        className={`relative ${aspect} w-full overflow-hidden border border-rule bg-page-2`}
      >
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-2 font-mono text-[11px] tracking-[0.08em] text-ink-3">
        {caption}
      </figcaption>
    </figure>
  );
}
