"use client";

import { Life } from "~/components/procedural/canvases";

/* Game of Life behind the contact block, seeded with the a* mark. The
   layer is taller than the footer and sits behind the page, so cells drift
   up out of it and dither away; only the footer takes the pointer. Hidden
   on small screens, and still (the mark only) with reduced motion. */
export function FooterLife() {
  return (
    <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-[calc(100%+22rem)] md:block">
      <Life
        className="h-full"
        fg="--color-life"
        bg="transparent"
        p={6}
        markSize={0.32}
        markX={0.8}
        markY={0.68}
        fadeTop={0.45}
        listenOn="footer"
      />
    </div>
  );
}
