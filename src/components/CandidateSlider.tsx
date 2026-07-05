"use client";

import Image from "next/image";
import { useState } from "react";

/* PROTOTYPE ONLY — a candidate browser for picking the hero photo.
   Replace with a plain PhotoFrame once Asher picks the winner. */
export function CandidateSlider({
  images,
  caption,
  aspect = "aspect-[3/4]",
}: {
  images: { src: string; label: string }[];
  caption: string;
  aspect?: string;
}) {
  const [i, setI] = useState(0);
  const count = images.length;
  const current = images[i];
  if (!current) return null;
  const step = (d: number) => setI((p) => (p + d + count) % count);

  return (
    <figure>
      <div
        className={`relative ${aspect} w-full overflow-hidden border border-rule bg-page-2`}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={`candidate ${current.label}`}
          fill
          sizes="(min-width: 900px) 40vw, 90vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/45 to-transparent px-3 pt-8 pb-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="previous candidate"
            className="px-2 py-1 font-mono text-[15px] text-white/90 hover:text-white"
          >
            ‹
          </button>
          <span className="font-mono text-[11px] tracking-[0.08em] text-white/90">
            {i + 1}/{count} · {current.label}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="next candidate"
            className="px-2 py-1 font-mono text-[15px] text-white/90 hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] tracking-[0.08em] text-ink-3">
        {caption}
      </figcaption>
    </figure>
  );
}
