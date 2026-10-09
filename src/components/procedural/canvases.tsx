"use client";

/* 1-bit canvases for /lab. Every canvas draws at low resolution and is
   scaled up with nearest-neighbour, so a "pixel" is p CSS pixels square. */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  astar,
  bayer4,
  bayer8,
  cave,
  dither,
  elementary,
  gliders,
  hash,
  levels,
  lifeStep,
  MARK_ASPECT,
  mulberry32,
  parseRule,
  rasterMark,
  rgba32,
  type Algo,
} from "./engines";

function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (!e) return;
      const w = Math.round(e.contentRect.width);
      const h = Math.round(e.contentRect.height);
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}

const col32 = (c: string) => (c === "transparent" ? 0 : rgba32(c));

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pixelated = (w: number, h: number, p: number): CSSProperties => ({
  width: w * p,
  height: h * p,
  imageRendering: "pixelated",
  display: "block",
  touchAction: "none",
});

/* ---- Life: the mark, seeded into a Life-like rule ---- */

export type LifeStats = { gen: number; pop: number };

export function Life({
  /** hex, "transparent", or a CSS custom property name like "--color-life" */
  fg,
  bg,
  p = 5,
  rule = "B3/S23",
  trails = true,
  running = true,
  restampEvery = 320,
  markSize = 0.6,
  markX = 0.5,
  markY = 0.5,
  fadeTop = 0,
  listenOn,
  pattern = "mark",
  interval = 80,
  resetKey = 0,
  onStats,
  className,
}: {
  fg: string;
  bg: string;
  p?: number;
  rule?: string;
  trails?: boolean;
  running?: boolean;
  restampEvery?: number;
  markSize?: number;
  /** where the mark's centre sits across the field, 0–1 */
  markX?: number;
  markY?: number;
  /** fraction of the height, from the top, over which cells dither away */
  fadeTop?: number;
  /** take the pointer from the closest ancestor matching this selector
      instead of the canvas, so the field can overhang its trigger area */
  listenOn?: string;
  /** what to seed: the a* mark, or a row of gliders */
  pattern?: "mark" | "gliders";
  /** ms per generation */
  interval?: number;
  resetKey?: number;
  onStats?: (s: LifeStats) => void;
  className?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const w = Math.floor(size.w / p);
  const h = Math.floor(size.h / p);
  const live = useLatest({ fg, bg, rule: parseRule(rule), trails, running, restampEvery, interval, fadeTop, onStats });
  const sim = useRef<{ a: Uint8Array; trail: Float32Array; hold: number } | null>(null);
  const paint = useRef(() => {});

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || w < 4 || h < 4) return;
    const n = w * h;
    let a = new Uint8Array(n);
    let b = new Uint8Array(n);
    const trail = new Float32Array(n);
    const mark = pattern === "gliders" ? gliders(w, h) : rasterMark(w, h, markSize, 0.8, markX, markY);
    const s = { a, trail, hold: performance.now() + (pattern === "gliders" ? 0 : 1400) };
    sim.current = s;
    let gen = 0;
    const stamp = () => {
      for (let i = 0; i < n; i++)
        if (mark[i]) {
          a[i] = 1;
          trail[i] = 1;
        }
    };
    stamp();

    const img = ctx.createImageData(w, h);
    const px = new Uint32Array(img.data.buffer);
    // "--color-life" style colours resolve against the element, so they
    // pick up whatever theme the page is in
    const el = wrap.current;
    const token = (c: string) =>
      c.startsWith("--") && el ? getComputedStyle(el).getPropertyValue(c).trim() || "transparent" : c;
    paint.current = () => {
      const L = live.current;
      const F = col32(token(L.fg));
      const B = col32(token(L.bg));
      const ft = L.fadeTop * h;
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const on =
            (a[i] || (L.trails && trail[i]! > bayer4(x, y))) && (y >= ft || y / ft > bayer4(x + 2, y + 1));
          px[i] = on ? F : B;
        }
      ctx.putImageData(img, 0, 0);
    };
    paint.current();

    if (reducedMotion()) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const L = live.current;
      if (!L.running || now < s.hold || now - last < L.interval) return;
      last = now;
      lifeStep(a, b, w, h, L.rule.b, L.rule.s);
      [a, b] = [b, a];
      s.a = a;
      let pop = 0;
      for (let i = 0; i < n; i++)
        if (a[i]) {
          trail[i] = 1;
          pop++;
        } else trail[i]! *= 0.86;
      gen++;
      if (L.restampEvery && gen % L.restampEvery === 0) {
        stamp();
        s.hold = now + 900;
      }
      paint.current();
      L.onStats?.({ gen, pop });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [w, h, markSize, markX, markY, pattern, resetKey, live, wrap]);

  useEffect(() => paint.current(), [fg, bg, trails, fadeTop]);

  // colours given as tokens follow the system theme, so repaint when it flips
  useEffect(() => {
    if (!fg.startsWith("--") && !bg.startsWith("--")) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const repaint = () => paint.current();
    mq.addEventListener("change", repaint);
    return () => mq.removeEventListener("change", repaint);
  }, [fg, bg]);

  const seed = (e: { clientX: number; clientY: number }) => {
    const s = sim.current;
    const el = canvas.current;
    if (!s || !el) return;
    const r = el.getBoundingClientRect();
    const cx = Math.floor((e.clientX - r.left) / p);
    const cy = Math.floor((e.clientY - r.top) / p);
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        if (Math.random() < 0.45) continue;
        const i = ((cy + dy + h) % h) * w + ((cx + dx + w) % w);
        s.a[i] = 1;
        s.trail[i] = 1;
      }
    s.hold = 0;
    paint.current();
  };

  const seedRef = useLatest(seed);
  useEffect(() => {
    const target = listenOn ? wrap.current?.closest(listenOn) : null;
    if (!target) return;
    const on = (e: Event) => seedRef.current(e as PointerEvent);
    target.addEventListener("pointermove", on);
    target.addEventListener("pointerdown", on);
    return () => {
      target.removeEventListener("pointermove", on);
      target.removeEventListener("pointerdown", on);
    };
  }, [listenOn, wrap, seedRef]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className ?? ""}`} style={listenOn ? { pointerEvents: "none" } : undefined}>
      <canvas
        ref={canvas}
        width={Math.max(w, 1)}
        height={Math.max(h, 1)}
        onPointerMove={listenOn ? undefined : seed}
        onPointerDown={listenOn ? undefined : seed}
        style={{ ...pixelated(w, h, p), pointerEvents: listenOn ? "none" : undefined }}
      />
    </div>
  );
}

/* ---- Search: A* across generated caves, on a loop ---- */

export type SearchStats = { expanded: number; frontier: number; path: number; phase: string };

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

export function Search({
  fg,
  bg,
  p = 3,
  k = 3,
  from = [0.03, 0.9],
  to = [0.97, 0.1],
  onStats,
  className,
}: {
  fg: string;
  bg: string;
  p?: number;
  /** canvas pixels per search cell */
  k?: number;
  /** start and goal, as fractions of the field */
  from?: readonly [number, number];
  to?: readonly [number, number];
  onStats?: (s: SearchStats) => void;
  className?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const W = Math.floor(size.w / p);
  const H = Math.floor(size.h / p);
  const live = useLatest({ fg, bg, onStats });
  const paint = useRef(() => {});
  const [fx, fy] = from;
  const [tx, ty] = to;

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const cols = Math.floor(W / k);
    const rows = Math.floor(H / k);
    if (!ctx || cols < 12 || rows < 8) return;
    const n = cols * rows;
    const img = ctx.createImageData(W, H);
    const px = new Uint32Array(img.data.buffer);

    // 0 floor, 1 wall, 2 explored, 3 frontier, 4 path
    const kind = new Uint8Array(n);
    const g = new Float32Array(n);
    const parent = new Int32Array(n);
    const at = (f: number, n: number) => Math.min(n - 3, Math.max(2, Math.round(f * (n - 1))));
    const sx = at(fx, cols), sy = at(fy, rows);
    const gx = at(tx, cols), gy = at(ty, rows);
    const start = sy * cols + sx;
    const goal = gy * cols + gx;
    let open: number[] = [];
    let path: number[] = [];
    let shown = 0;
    let expanded = 0;
    let phase: "search" | "path" | "hold" | "flash" = "search";
    let until = 0;

    const reset = () => {
      const walls = cave(cols, rows, Math.random);
      for (const [cx, cy] of [[sx, sy], [gx, gy]] as const)
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++) {
            const x = cx + dx, y = cy + dy;
            if (x >= 0 && y >= 0 && x < cols && y < rows) walls[y * cols + x] = 0;
          }
      kind.set(walls);
      g.fill(Infinity);
      parent.fill(-1);
      g[start] = 0;
      kind[start] = 3;
      open = [start];
      path = [];
      shown = 0;
      expanded = 0;
      phase = "search";
    };
    reset();

    const heur = (i: number) => Math.abs((i % cols) - gx) + Math.abs(((i / cols) | 0) - gy);
    const expand = () => {
      if (!open.length) return reset();
      let bi = 0;
      let bf = Infinity;
      for (let j = 0; j < open.length; j++) {
        const o = open[j]!;
        const f = g[o]! + heur(o) * 1.001;
        if (f < bf) {
          bf = f;
          bi = j;
        }
      }
      const cur = open[bi]!;
      open[bi] = open[open.length - 1]!;
      open.pop();
      kind[cur] = 2;
      expanded++;
      if (cur === goal) {
        for (let c = goal; c !== -1; c = parent[c]!) path.push(c);
        path.reverse();
        phase = "path";
        return;
      }
      const x = cur % cols;
      const y = (cur / cols) | 0;
      for (const [dx, dy] of DIRS) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        const ni = ny * cols + nx;
        if (kind[ni] === 1 || kind[ni] === 2) continue;
        const ng = g[cur]! + 1;
        if (ng < g[ni]!) {
          g[ni] = ng;
          parent[ni] = cur;
          if (kind[ni] !== 3) {
            kind[ni] = 3;
            open.push(ni);
          }
        }
      }
    };

    const near = (cx: number, cy: number, tx: number, ty: number) =>
      Math.abs(cx - tx) <= 1 && Math.abs(cy - ty) <= 1;

    paint.current = () => {
      const L = live.current;
      let F = rgba32(L.fg);
      let B = rgba32(L.bg);
      if (phase === "flash") [F, B] = [B, F];
      const mid = k >> 1;
      for (let py = 0; py < H; py++) {
        const cy = (py / k) | 0;
        const dy = py % k;
        for (let qx = 0; qx < W; qx++) {
          const cx = (qx / k) | 0;
          const i = py * W + qx;
          if (cx >= cols || cy >= rows) {
            px[i] = B;
            continue;
          }
          const dx = qx % k;
          const t = kind[cy * cols + cx];
          const on =
            near(cx, cy, sx, sy) || near(cx, cy, gx, gy)
              ? true
              : t === 1
                ? ((qx + py) & 1) === 0
                : t === 2
                  ? dx === mid && dy === mid
                  : t === 3 || t === 4;
          px[i] = on ? F : B;
        }
      }
      ctx.putImageData(img, 0, 0);
    };
    paint.current();

    if (reducedMotion()) return;
    const perFrame = Math.max(3, Math.round(n / 700));
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (phase === "search") for (let j = 0; j < perFrame && phase === "search"; j++) expand();
      else if (phase === "path") {
        for (let j = 0; j < 2 && shown < path.length; j++) kind[path[shown++]!] = 4;
        if (shown >= path.length) {
          phase = "hold";
          until = now + 2400;
        }
      } else if (phase === "hold" && now > until) {
        phase = "flash";
        until = now + 140;
      } else if (phase === "flash" && now > until) reset();
      paint.current();
      live.current.onStats?.({ expanded, frontier: open.length, path: shown, phase });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [W, H, k, fx, fy, tx, ty, live]);

  useEffect(() => paint.current(), [fg, bg]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className ?? ""}`}>
      <canvas ref={canvas} width={Math.max(W, 1)} height={Math.max(H, 1)} style={pixelated(W, H, p)} />
    </div>
  );
}

/* ---- RuleBand: an elementary automaton, printed row by row ---- */

export function RuleBand({
  fg,
  bg,
  rule,
  seed,
  p = 3,
  className,
}: {
  fg: string;
  bg: string;
  rule: number;
  /** omit for a single centre cell */
  seed?: string;
  p?: number;
  className?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const w = Math.floor(size.w / p);
  const h = Math.floor(size.h / p);
  const live = useLatest({ fg, bg });
  const paint = useRef(() => {});

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || w < 2 || h < 2) return;
    const init = new Uint8Array(w);
    if (seed === undefined) init[w >> 1] = 1;
    else {
      const rand = mulberry32(hash(seed));
      for (let x = 0; x < w; x++) init[x] = rand() < 0.5 ? 1 : 0;
    }
    // From a single cell the pattern is a triangle; skip ahead so its
    // base spans the band instead of a narrow wedge in the middle.
    const skip = seed === undefined ? Math.max(0, (w >> 1) - h) : 0;
    const grid = elementary(rule, w, h + skip, init).subarray(skip * w);
    const img = ctx.createImageData(w, h);
    const px = new Uint32Array(img.data.buffer);
    let rows = reducedMotion() ? h : 0;
    paint.current = () => {
      const F = rgba32(live.current.fg);
      const B = rgba32(live.current.bg);
      for (let i = 0; i < w * h; i++) px[i] = i < rows * w && grid[i] ? F : B;
      ctx.putImageData(img, 0, 0);
    };
    paint.current();
    if (rows === h) return;

    let raf = 0;
    const tick = () => {
      rows = Math.min(h, rows + 2);
      paint.current();
      if (rows < h) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        io.disconnect();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [w, h, rule, seed, live]);

  useEffect(() => paint.current(), [fg, bg]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className ?? ""}`}>
      <canvas ref={canvas} width={Math.max(w, 1)} height={Math.max(h, 1)} style={pixelated(w, h, p)} />
    </div>
  );
}

/* ---- DitherImage: a photo at 1 bit ---- */

export function DitherImage({
  src,
  algo,
  paper,
  ink,
  p = 3,
  className,
}: {
  src: string;
  algo: Algo;
  /** colour for bright pixels */
  paper: string;
  /** colour for dark pixels */
  ink: string;
  p?: number;
  className?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const w = Math.floor(size.w / p);
  const h = img ? Math.round((w * img.naturalHeight) / img.naturalWidth) : 0;

  useEffect(() => {
    const el = new Image();
    el.onload = () => setImg(el);
    el.src = src;
  }, [src]);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d", { willReadFrequently: true });
    if (!ctx || !img || w < 2 || h < 2) return;
    ctx.drawImage(img, 0, 0, w, h);
    const d = ctx.getImageData(0, 0, w, h);
    const lum = new Float32Array(w * h);
    for (let i = 0; i < lum.length; i++)
      lum[i] = (0.2126 * d.data[i * 4]! + 0.7152 * d.data[i * 4 + 1]! + 0.0722 * d.data[i * 4 + 2]!) / 255;
    const bits = dither(levels(lum), w, h, algo);
    const px = new Uint32Array(d.data.buffer);
    const P = rgba32(paper);
    const I = rgba32(ink);
    for (let i = 0; i < bits.length; i++) px[i] = bits[i] ? P : I;
    ctx.putImageData(d, 0, 0);
  }, [img, w, h, algo, paper, ink]);

  return (
    <div ref={wrap} className={className}>
      <canvas ref={canvas} width={Math.max(w, 1)} height={Math.max(h, 1)} style={pixelated(w, h, p)} />
    </div>
  );
}

/* ---- Ramp: an ordered-dither gradient, for rules and fades ---- */

export function Ramp({
  fg,
  bg,
  p = 3,
  dir = "x",
  className,
}: {
  fg: string;
  bg: string;
  p?: number;
  dir?: "x" | "y";
  className?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const w = Math.floor(size.w / p);
  const h = Math.floor(size.h / p);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || w < 1 || h < 1) return;
    const img = ctx.createImageData(w, h);
    const px = new Uint32Array(img.data.buffer);
    const F = rgba32(fg);
    const B = rgba32(bg);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const v = dir === "x" ? x / Math.max(w - 1, 1) : y / Math.max(h - 1, 1);
        px[y * w + x] = v > bayer8(x, y) ? F : B;
      }
    ctx.putImageData(img, 0, 0);
  }, [w, h, fg, bg, dir]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className ?? ""}`}>
      <canvas ref={canvas} width={Math.max(w, 1)} height={Math.max(h, 1)} style={pixelated(w, h, p)} />
    </div>
  );
}

/* ---- PixelMark: a* on a coarse grid ---- */

export function PixelMark({
  color,
  cols = 24,
  p = 4,
  className,
}: {
  color: string;
  cols?: number;
  p?: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const rows = Math.round(cols / MARK_ASPECT);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const bits = rasterMark(cols, rows, 1);
    const img = ctx.createImageData(cols, rows);
    const px = new Uint32Array(img.data.buffer);
    const C = rgba32(color);
    for (let i = 0; i < bits.length; i++) px[i] = bits[i] ? C : 0;
    ctx.putImageData(img, 0, 0);
  }, [cols, rows, color]);

  return (
    <canvas
      ref={canvas}
      width={cols}
      height={rows}
      aria-label="a*"
      role="img"
      className={className}
      style={pixelated(cols, rows, p)}
    />
  );
}

/* ---- PathRail: one A* route down the page, revealed by scrolling ----
   As a narrow rail it zigzags between ledges; as a full-page background it
   wanders through caves via waypoints. Behind the cobalt head the line fades
   (by dithering) from `path` to `trail`, so the tail never reads as a hard
   stroke. "transparent" works for any colour. */

type Pt = readonly [number, number];


export function PathRail({
  wall,
  seen,
  path,
  trail,
  head,
  fade = 40,
  terrain = "ledges",
  via = [
    [0.5, 0],
    [0.5, 1],
  ],
  p = 2,
  k = 3,
  className,
}: {
  wall: string;
  seen: string;
  path: string;
  /** colour the line fades to behind the head; defaults to `path` */
  trail?: string;
  head: string;
  /** steps over which the line fades from path to trail */
  fade?: number;
  terrain?: "ledges" | "caves";
  /** waypoints as fractions of the field, first to last */
  via?: readonly Pt[];
  p?: number;
  k?: number;
  className?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const W = Math.floor(size.w / p);
  const H = Math.floor(size.h / p);
  const live = useLatest({ wall, seen, path, trail: trail ?? path, head, fade });
  const paint = useRef(() => {});
  const viaKey = JSON.stringify(via);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    const el = wrap.current;
    const cols = Math.floor(W / k);
    const rows = Math.floor(H / k);
    if (!ctx || !el || cols < 3 || rows < 8) return;
    const n = cols * rows;
    const points = (JSON.parse(viaKey) as Pt[]).map(([fx, fy]) => {
      const x = Math.min(cols - 1, Math.max(0, Math.round(fx * (cols - 1))));
      const y = Math.min(rows - 2, Math.max(1, Math.round(fy * (rows - 1))));
      return y * cols + x;
    });

    // Ledges from alternating sides force a zigzag down a narrow strip.
    const ledges = () => {
      const m = new Uint8Array(n);
      let side = 0;
      for (let y = 5; y < rows - 5; y += 6 + Math.floor(Math.random() * 7)) {
        const len = Math.round(cols * (0.55 + Math.random() * 0.2));
        for (let x = 0; x < len; x++) m[y * cols + (side ? cols - 1 - x : x)] = 1;
        side ^= 1;
      }
      for (let i = 0; i < n; i++) if (Math.random() < 0.05) m[i] = 1;
      return m;
    };
    const make = () => {
      const m = terrain === "caves" ? cave(cols, rows, Math.random, 0.4, 4) : ledges();
      for (const pt of points) {
        const px0 = pt % cols, py0 = (pt / cols) | 0;
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++) {
            const x = px0 + dx, y = py0 + dy;
            if (x >= 0 && y >= 0 && x < cols && y < rows) m[y * cols + x] = 0;
          }
      }
      return m;
    };
    const solve = (m: Uint8Array) => {
      const route: number[] = [];
      const closed = new Uint8Array(n);
      for (let j = 1; j < points.length; j++) {
        const r = astar(m, cols, rows, points[j - 1]!, points[j]!);
        if (!r) return null;
        route.push(...(j === 1 ? r.path : r.path.slice(1)));
        for (let c = 0; c < n; c++) if (r.closed[c] === 2) closed[c] = 1;
      }
      return { route, closed };
    };

    let walls = make();
    let found = solve(walls);
    for (let tries = 0; !found && tries < 30; tries++) {
      walls = make();
      found = solve(walls);
    }
    if (!found) return;
    const { route, closed } = found;
    // a route can cross itself; keep the latest visit
    const order = new Int32Array(n).fill(-1);
    route.forEach((c, i) => (order[c] = i));
    // which sides of each route cell the line leaves through: 1 up, 2 down, 4 left, 8 right
    const links = new Uint8Array(n);
    for (let i = 1; i < route.length; i++) {
      const a = route[i - 1]!, b = route[i]!;
      const d = b - a;
      links[a]! |= d === cols ? 2 : d === -cols ? 1 : d === 1 ? 8 : 4;
      links[b]! |= d === cols ? 1 : d === -cols ? 2 : d === 1 ? 4 : 8;
    }
    // reveal is driven by distance scrolled down the page, so a route that
    // doubles back sideways still advances smoothly: step i shows once the
    // deepest row reached by steps 0..i is above the reveal line
    const depth = new Int32Array(route.length);
    for (let i = 0, d = 0; i < route.length; i++) {
      d = Math.max(d, (route[i]! / cols) | 0);
      depth[i] = d;
    }

    const img = ctx.createImageData(W, H);
    const px = new Uint32Array(img.data.buffer);
    const mid = k >> 1;
    let reveal = -1;
    let shown = -2;

    paint.current = () => {
      const L = live.current;
      const Wc = col32(L.wall), S = col32(L.seen), P = col32(L.path), T = col32(L.trail), Hd = col32(L.head);
      let last = -1;
      while (last + 1 < route.length && depth[last + 1]! <= reveal) last++;
      const headRow = last >= 0 ? (route[last]! / cols) | 0 : -1;
      for (let py = 0; py < H; py++) {
        const cy = (py / k) | 0;
        const dy = py % k;
        for (let qx = 0; qx < W; qx++) {
          const cx = (qx / k) | 0;
          const i = py * W + qx;
          if (cx >= cols || cy >= rows) {
            px[i] = 0;
            continue;
          }
          const c = cy * cols + cx;
          const o = order[c]!;
          const dx = qx % k;
          if (o >= 0 && o <= last) {
            if (o === last) {
              px[i] = Hd;
              continue;
            }
            const l = links[c]!;
            const onLine =
              (dx === mid && dy === mid) ||
              (dx === mid && ((dy < mid && l & 1) || (dy > mid && l & 2))) ||
              (dy === mid && ((dx < mid && l & 4) || (dx > mid && l & 8)));
            px[i] = onLine ? (Math.min(1, (last - o) / L.fade) > bayer4(qx, py) ? T : P) : 0;
            continue;
          }
          px[i] = walls[c]
            ? ((qx + py) & 1) === 0
              ? Wc
              : 0
            : closed[c] && cy <= headRow && dx === mid && dy === mid
              ? S
              : 0;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top;
      reveal = Math.floor((window.innerHeight * 0.7 - top) / (p * k));
      if (reveal !== shown) {
        shown = reveal;
        paint.current();
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [W, H, k, p, terrain, viaKey, live, wrap]);

  useEffect(() => paint.current(), [wall, seen, path, trail, head, fade]);

  return (
    <div ref={wrap} aria-hidden className={`overflow-hidden ${className ?? ""}`}>
      <canvas ref={canvas} width={Math.max(W, 1)} height={Math.max(H, 1)} style={pixelated(W, H, p)} />
    </div>
  );
}
