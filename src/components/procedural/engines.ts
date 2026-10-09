/* The procedural bits behind /lab: Life, elementary automata, A*, cave
   generation, ordered and error-diffusion dithering, and the a* mark
   rasterised onto a grid. Pure functions over flat typed arrays. */

import { ASTAR_LETTER, ASTAR_STAR } from "~/app/brand";

function bayerMatrix(size: number) {
  let m = [[0]];
  while (m.length < size) {
    const n = m.length;
    const next = Array.from({ length: n * 2 }, () =>
      new Array<number>(n * 2).fill(0),
    );
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const v = m[y]![x]! * 4;
        next[y]![x] = v;
        next[y]![x + n] = v + 2;
        next[y + n]![x] = v + 3;
        next[y + n]![x + n] = v + 1;
      }
    m = next;
  }
  return Float32Array.from(m.flat(), (v) => (v + 0.5) / (size * size));
}

export const BAYER4 = bayerMatrix(4);
export const BAYER8 = bayerMatrix(8);
export const bayer4 = (x: number, y: number) => BAYER4[(y & 3) * 4 + (x & 3)]!;
export const bayer8 = (x: number, y: number) => BAYER8[(y & 7) * 8 + (x & 7)]!;

/* Hex to a little-endian RGBA word for Uint32Array views of ImageData. */
export function rgba32(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return ((255 << 24) | ((n & 255) << 16) | (n & 0xff00) | ((n >> 16) & 255)) >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
  return h >>> 0;
}

/* ---- The mark ---- */

const BOX = { x: 18.5, y: 31.5, w: 63, h: 37 };
export const MARK_ASPECT = BOX.w / BOX.h;

/* Fill the a* glyph into a cols×rows bitmap at `frac` of the height (and
   at most `wfrac` of the width), with its centre at (`cx`, `cy`). */
export function rasterMark(cols: number, rows: number, frac = 1, wfrac = frac, cx = 0.5, cy = 0.5) {
  const out = new Uint8Array(cols * rows);
  const c = document.createElement("canvas");
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext("2d");
  if (!ctx) return out;
  const s = Math.min((rows * frac) / BOX.h, (cols * wfrac) / BOX.w);
  ctx.setTransform(
    s,
    0,
    0,
    s,
    Math.round(cols * cx - (BOX.w * s) / 2 - BOX.x * s),
    Math.round(rows * cy - (BOX.h * s) / 2 - BOX.y * s),
  );
  ctx.fill(new Path2D(ASTAR_LETTER));
  ctx.fill(new Path2D(ASTAR_STAR));
  const d = ctx.getImageData(0, 0, cols, rows).data;
  for (let i = 0; i < out.length; i++) out[i] = d[i * 4 + 3]! > 110 ? 1 : 0;
  return out;
}

/* ---- Life-like automata ---- */

export const RULES = {
  life: "B3/S23",
  highlife: "B36/S23",
  daynight: "B3678/S34678",
  seeds: "B2/S",
  maze: "B3/S12345",
} as const;

export function parseRule(r: string) {
  const [b = "", s = ""] = r.toUpperCase().split("/");
  const mask = (part: string) =>
    [...part.slice(1)].reduce((m, d) => m | (1 << Number(d)), 0);
  return { b: mask(b), s: mask(s) };
}

/* One generation on a torus. `b`/`s` are bitmasks of neighbour counts. */
export function lifeStep(
  a: Uint8Array,
  out: Uint8Array,
  w: number,
  h: number,
  b: number,
  s: number,
) {
  for (let y = 0; y < h; y++) {
    const ym = ((y - 1 + h) % h) * w;
    const y0 = y * w;
    const yp = ((y + 1) % h) * w;
    for (let x = 0; x < w; x++) {
      const xm = (x - 1 + w) % w;
      const xp = (x + 1) % w;
      const n =
        a[ym + xm]! + a[ym + x]! + a[ym + xp]! +
        a[y0 + xm]! + a[y0 + xp]! +
        a[yp + xm]! + a[yp + x]! + a[yp + xp]!;
      out[y0 + x] = ((a[y0 + x] ? s : b) >> n) & 1;
    }
  }
}

/* Wolfram elementary automaton: row 0 is `init`, each row the next step. */
export function elementary(rule: number, w: number, h: number, init: Uint8Array) {
  const g = new Uint8Array(w * h);
  g.set(init.subarray(0, w));
  for (let y = 1; y < h; y++) {
    const p = (y - 1) * w;
    for (let x = 0; x < w; x++) {
      const l = g[p + ((x - 1 + w) % w)]!;
      const c = g[p + x]!;
      const r = g[p + ((x + 1) % w)]!;
      g[y * w + x] = (rule >> ((l << 2) | (c << 1) | r)) & 1;
    }
  }
  return g;
}

/* Cave terrain by cellular smoothing of noise. 1 = wall. */
export function cave(w: number, h: number, rand: () => number, fill = 0.43, iters = 3) {
  let m = new Uint8Array(w * h);
  for (let i = 0; i < m.length; i++) m[i] = rand() < fill ? 1 : 0;
  for (let it = 0; it < iters; it++) {
    const next = new Uint8Array(w * h);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < w && ny < h) n += m[ny * w + nx]!;
          }
        const i = y * w + x;
        next[i] = n >= 5 || (m[i] && n >= 4) ? 1 : 0;
      }
    m = next;
  }
  return m;
}

/* ---- Dithering ---- */

export type Algo = "atkinson" | "floyd" | "bayer" | "threshold";

/* Stretch luminance so the 2nd–98th percentile spans 0–1. */
export function levels(lum: Float32Array) {
  const sorted = Float32Array.from(lum).sort();
  const lo = sorted[Math.floor(sorted.length * 0.02)] ?? 0;
  const hi = sorted[Math.floor(sorted.length * 0.98)] ?? 1;
  const span = Math.max(hi - lo, 1e-3);
  for (let i = 0; i < lum.length; i++)
    lum[i] = Math.min(1, Math.max(0, (lum[i]! - lo) / span));
  return lum;
}

/* 1 = bright pixel. */
export function dither(lum: Float32Array, w: number, h: number, algo: Algo) {
  const out = new Uint8Array(w * h);
  if (algo === "threshold") {
    for (let i = 0; i < out.length; i++) out[i] = lum[i]! > 0.5 ? 1 : 0;
    return out;
  }
  if (algo === "bayer") {
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++)
        out[y * w + x] = lum[y * w + x]! > bayer8(x, y) ? 1 : 0;
    return out;
  }
  const e = Float32Array.from(lum);
  const push = (x: number, y: number, v: number) => {
    if (x >= 0 && x < w && y < h) e[y * w + x]! += v;
  };
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const v = e[i]! > 0.5 ? 1 : 0;
      out[i] = v;
      const err = e[i]! - v;
      if (algo === "atkinson") {
        const q = err / 8;
        push(x + 1, y, q);
        push(x + 2, y, q);
        push(x - 1, y + 1, q);
        push(x, y + 1, q);
        push(x + 1, y + 1, q);
        push(x, y + 2, q);
      } else {
        push(x + 1, y, (err * 7) / 16);
        push(x - 1, y + 1, (err * 3) / 16);
        push(x, y + 1, (err * 5) / 16);
        push(x + 1, y + 1, err / 16);
      }
    }
  return out;
}

/* Gliders heading down-right, one every `gap` columns. */
export function gliders(w: number, h: number, gap = 12) {
  const out = new Uint8Array(w * h);
  const cells = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]] as const;
  for (let x0 = 1, j = 0; x0 + 3 < w; x0 += gap, j++) {
    const y0 = (j * 3) % Math.max(1, h - 3);
    for (const [dx, dy] of cells) out[(y0 + dy) * w + x0 + dx] = 1;
  }
  return out;
}

/* A* to completion on a 4-connected grid. Returns the path and the
   closed set, or null when the goal is walled off. */
export function astar(walls: Uint8Array, cols: number, rows: number, start: number, goal: number) {
  const n = cols * rows;
  const g = new Float32Array(n).fill(Infinity);
  const parent = new Int32Array(n).fill(-1);
  const state = new Uint8Array(n); // 1 open, 2 closed
  const gx = goal % cols;
  const gy = (goal / cols) | 0;
  const heur = (i: number) => Math.abs((i % cols) - gx) + Math.abs(((i / cols) | 0) - gy);
  const open = [start];
  g[start] = 0;
  state[start] = 1;
  while (open.length) {
    let bi = 0;
    let bf = Infinity;
    for (let j = 0; j < open.length; j++) {
      const f = g[open[j]!]! + heur(open[j]!) * 1.001;
      if (f < bf) {
        bf = f;
        bi = j;
      }
    }
    const cur = open[bi]!;
    open[bi] = open[open.length - 1]!;
    open.pop();
    state[cur] = 2;
    if (cur === goal) {
      const path: number[] = [];
      for (let c = goal; c !== -1; c = parent[c]!) path.push(c);
      return { path: path.reverse(), closed: state };
    }
    const x = cur % cols;
    const y = (cur / cols) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      const ni = ny * cols + nx;
      if (walls[ni] || state[ni] === 2) continue;
      if (g[cur]! + 1 < g[ni]!) {
        g[ni] = g[cur]! + 1;
        parent[ni] = cur;
        if (state[ni] !== 1) {
          state[ni] = 1;
          open.push(ni);
        }
      }
    }
  }
  return null;
}
