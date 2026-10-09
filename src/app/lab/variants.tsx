"use client";

/* Five directions for a monochrome, procedural a*. Each one is a full
   specimen of the homepage in its own system, light and dark. */

import { useCallback, useRef, useState, type ReactNode } from "react";
import { DitherImage, Life, PixelMark, Ramp, RuleBand, Search } from "~/components/procedural/canvases";
import { hash, RULES, type Algo } from "~/components/procedural/engines";

export type Mode = "light" | "dark";
export type Palette = { bg: string; fg: string; mid: string; line: string };
type VProps = { c: Palette; mode: Mode };

const LEDE =
  "I spent ten years shipping software the old way. Now agents do the heavy lifting and I keep the two calls that matter: what to build, what ships.";

const WORK = [
  {
    n: "01",
    k: "Agentic software development lifecycle",
    v: "The whole lifecycle, from first conversation to production. You get a running system and the keys.",
  },
  {
    n: "02",
    k: "Agentic business workflows",
    v: "AI put to work inside the workflows a business already runs on: quoting, reporting, case handling, operations.",
  },
  {
    n: "03",
    k: "What exactly is agentic?",
    v: "Fair question, and the answer keeps moving. I teach it in person, from AI 101 to hands-on sessions for teams.",
  },
] as const;

/* ---- Shared bits ---- */

function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] tracking-[0.17em] uppercase ${className ?? ""}`}>
      {children}
    </p>
  );
}

function Bar({ right }: { right?: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.17em] uppercase">
      <p>Asher Anjum</p>
      <p>{right ?? "Dubai · UTC+4"}</p>
    </div>
  );
}

/* Writes stats straight into a span, so a 12fps sim doesn't re-render React. */
function useReadout<T>(format: (s: T) => string) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = useRef(format);
  const onStats = useCallback((s: T) => {
    if (ref.current) ref.current.textContent = fmt.current(s);
  }, []);
  return [ref, onStats] as const;
}

const pad = (n: number, d = 4) => String(n).padStart(d, "0");

function Rules({ title, rules }: { title: string; rules: readonly (readonly [string, string])[] }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Mono className="text-(--mid)">Guideline delta · {title}</Mono>
      <dl className="mt-6 grid gap-x-10 gap-y-6 border-t border-(--line) pt-6 md:grid-cols-2">
        {rules.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[15px] font-semibold tracking-[-0.01em]">{k}</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-(--mid)">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Footer({ className }: { className?: string }) {
  return (
    <footer className={`bg-(--fg) text-(--bg) ${className ?? ""}`}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 py-14">
        <p className="text-3xl font-semibold tracking-[-0.03em]">hello@asheranjum.com</p>
        <Mono>github.com/asasher · Dubai</Mono>
      </div>
    </footer>
  );
}

/* ---- 01 Paper: e-ink, the mark run through Life ---- */

function Paper({ c }: VProps) {
  const [gen, onStats] = useReadout<{ gen: number; pop: number }>(
    (s) => `gen ${pad(s.gen)} · pop ${pad(s.pop)}`,
  );
  return (
    <div>
      <Bar right={<>Dubai · UTC+4 · <span ref={gen}>gen 0000</span></>} />
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12">
        <Mono className="text-(--mid)">Software · AI systems · Dubai</Mono>
        <h1 className="mt-8 text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl">
          I build software
          <br />
          and AI systems.
        </h1>
        <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-(--mid)">{LEDE}</p>
      </section>
      <div className="mx-auto max-w-5xl px-6">
        <div className="border border-(--line)">
          <Life className="h-80" fg={c.fg} bg={c.bg} p={5} onStats={onStats} />
        </div>
        <Mono className="mt-3 text-(--mid)">
          Fig. 1 · a* under B3/S23, re-stamped every 320 generations. Move the cursor to seed it.
        </Mono>
      </div>
      <section className="mx-auto max-w-5xl px-6 pt-24">
        <Mono className="text-(--mid)">What I do</Mono>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em]">Three lanes.</h2>
        <ol className="mt-10 border-t border-(--line)">
          {WORK.map((w) => (
            <li key={w.n} className="grid gap-2 border-b border-(--line) py-6 md:grid-cols-[4rem_18rem_1fr]">
              <span className="font-mono text-[13px]">{w.n}</span>
              <span className="font-semibold tracking-[-0.02em]">{w.k}</span>
              <span className="text-[15px] leading-relaxed text-(--mid)">{w.v}</span>
            </li>
          ))}
        </ol>
      </section>
      <Rules
        title="Paper"
        rules={[
          ["E-ink, not white.", "Light is warm paper #E9E8E2 with ink #1A1A18. Dark swaps them. Greys allowed, but only one: --mid, like an e-ink panel's second level."],
          ["Cobalt retires.", "The star loses its colour. Emphasis comes from weight, size and motion instead."],
          ["The mark is alive.", "On screen, a* is a Life seed: it blooms, decays and re-stamps. In print it's the static first frame."],
          ["Trails are dithered.", "Dead cells fade through a 4×4 Bayer pattern, never through grey. That's the only 'gradient' in the system."],
        ]}
      />
      <Footer />
    </div>
  );
}

/* ---- 02 Device: teenage engineering manual ---- */

const DEVICE_RULES = [
  ["life", RULES.life],
  ["high", RULES.highlife],
  ["d&n", RULES.daynight],
  ["seed", RULES.seeds],
  ["maze", RULES.maze],
] as const;

function Key({ on, onClick, children }: { on?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex aspect-square flex-col justify-between border border-(--fg) p-1.5 text-left text-[10px] lowercase transition-colors ${
        on ? "bg-(--fg) text-(--bg)" : "hover:bg-(--fg)/10"
      }`}
    >
      {children}
    </button>
  );
}

function Device({ c }: VProps) {
  const [rule, setRule] = useState<string>(RULES.life);
  const [running, setRunning] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [gen, onStats] = useReadout<{ gen: number; pop: number }>((s) => pad(s.gen));
  const cell = "border-r border-b border-(--fg) p-3";
  const screen = { fg: "#FFFFFF", bg: "#000000" };

  return (
    <div className="p-3 font-mono lowercase md:p-6">
      <div className="grid grid-cols-12 border-t border-l border-(--fg)">
        <div className={`${cell} col-span-4 flex items-center md:col-span-2`}>
          <PixelMark color={c.fg} cols={22} p={3} />
        </div>
        <div className={`${cell} col-span-8 md:col-span-6`}>
          <p className="text-[10px] text-(--mid)">model</p>
          <p className="mt-1 text-[15px] font-medium">asher anjum · aa-01</p>
          <p className="text-[11px] text-(--mid)">software and ai systems unit</p>
        </div>
        <div className={`${cell} col-span-6 md:col-span-2`}>
          <p className="text-[10px] text-(--mid)">loc</p>
          <p className="mt-1 text-[13px]">dubai utc+4</p>
        </div>
        <div className={`${cell} col-span-6 flex items-start justify-between md:col-span-2`}>
          <div>
            <p className="text-[10px] text-(--mid)">status</p>
            <p className="mt-1 text-[13px]">{running ? "run" : "hold"}</p>
          </div>
          <span className={`mt-1 size-2.5 bg-(--fg) ${running ? "animate-pulse" : "opacity-20"}`} />
        </div>

        <div className={`${cell} col-span-12 md:col-span-8`}>
          <div className="flex justify-between text-[10px] text-(--mid)">
            <span>[a] display · {rule.toLowerCase()}</span>
            <span>128 × 64</span>
          </div>
          <div className="relative mt-2" style={{ background: screen.bg }}>
            <Life
              className="h-72"
              fg={screen.fg}
              bg={screen.bg}
              p={4}
              rule={rule}
              running={running}
              resetKey={resetKey}
              markSize={0.55}
              onStats={onStats}
            />
          </div>
        </div>
        <div className={`${cell} col-span-12 flex flex-col justify-between gap-6 md:col-span-4`}>
          <div>
            <p className="text-[10px] text-(--mid)">[b] generation</p>
            <p className="mt-1 text-6xl font-medium tracking-[-0.06em] tabular-nums">
              <span ref={gen}>0000</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] text-(--mid)">[c] rule</p>
            <div className="mt-2 grid grid-cols-5 gap-1.5">
              {DEVICE_RULES.map(([label, r], i) => (
                <Key key={r} on={rule === r} onClick={() => setRule(r)}>
                  <span className="text-(--mid)">k{i + 1}</span>
                  <span>{label}</span>
                </Key>
              ))}
            </div>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              <Key on={!running} onClick={() => setRunning((r) => !r)}>
                <span className="text-(--mid)">k6</span>
                <span>{running ? "hold" : "run"}</span>
              </Key>
              <Key onClick={() => setResetKey((k) => k + 1)}>
                <span className="text-(--mid)">k7</span>
                <span>a*</span>
              </Key>
            </div>
          </div>
        </div>

        <div className={`${cell} col-span-12 py-10`}>
          <p className="text-[10px] text-(--mid)">[d] function</p>
          <h1 className="mt-3 font-sans text-5xl leading-[0.98] font-medium tracking-[-0.045em] md:text-7xl">
            i build software
            <br />
            and ai systems.
          </h1>
          <p className="mt-6 max-w-[56ch] font-sans text-[15px] leading-relaxed normal-case">{LEDE}</p>
        </div>

        {WORK.map((w, i) => (
          <div key={w.n} className={`${cell} col-span-12 md:col-span-4`}>
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] text-(--mid)">[{String.fromCharCode(101 + i)}] mode {w.n}</span>
              <span className="text-4xl font-medium tracking-[-0.06em]">{w.n}</span>
            </div>
            <p className="mt-8 font-sans text-[16px] font-semibold tracking-[-0.02em] normal-case">{w.k}</p>
            <p className="mt-2 font-sans text-[14px] leading-relaxed text-(--mid) normal-case">{w.v}</p>
          </div>
        ))}

        <div className={`${cell} col-span-12 md:col-span-6`}>
          <p className="text-[10px] text-(--mid)">[h] specifications</p>
          <table className="mt-3 w-full text-[12px]">
            <tbody>
              {[
                ["experience", "10 yrs"],
                ["prior units", "olx · careem · talabat · delivery hero"],
                ["power", "agents"],
                ["input", "a problem"],
                ["output", "a running system, and the keys"],
              ].map(([k, v]) => (
                <tr key={k} className="border-t border-(--fg)/20">
                  <td className="py-1.5 text-(--mid)">{k}</td>
                  <td className="py-1.5 text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${cell} col-span-12 flex flex-col justify-between bg-(--fg) text-(--bg) md:col-span-6`}>
          <p className="text-[10px] opacity-60">[i] contact</p>
          <p className="mt-8 font-sans text-3xl font-medium tracking-[-0.04em]">hello@asheranjum.com</p>
        </div>
      </div>
      <div className="font-sans normal-case">
        <Rules
          title="Device"
          rules={[
            ["Everything is a module.", "Pages are a 12-column grid of 1px-bordered cells. Each cell gets a bracketed key, [a] [b] [c], like a product manual."],
            ["Lowercase, mono, tiny.", "Labels are 10px Geist Mono lowercase. Headlines go lowercase too. Sans only for things you read for meaning."],
            ["The screen is always black.", "In both modes, the procedural element lives on an OLED-black panel. It's the one place the page lights up."],
            ["Controls are real.", "Keys switch Life rules (B3/S23, HighLife, Day & Night, Seeds, Maze). The brand is something you can play with."],
          ]}
        />
      </div>
    </div>
  );
}

/* ---- 03 Search: A* as the hero ---- */

function Search_({ c }: VProps) {
  const [read, onStats] = useReadout<{ expanded: number; frontier: number; path: number; phase: string }>(
    (s) => `${s.phase.padEnd(6)} expanded ${pad(s.expanded)} · frontier ${pad(s.frontier, 3)} · path ${pad(s.path, 3)}`,
  );
  const texture = {
    wall: { backgroundImage: `repeating-conic-gradient(${c.fg} 0 25%, ${c.bg} 0 50%)`, backgroundSize: "4px 4px" },
    seen: { backgroundImage: `radial-gradient(${c.fg} 0.9px, transparent 1.1px)`, backgroundSize: "6px 6px" },
    solid: { background: c.fg },
  };
  return (
    <div>
      <div className="relative h-[68vh] min-h-[460px] border-b border-(--fg)">
        <Search className="absolute inset-0" fg={c.fg} bg={c.bg} p={3} k={3} from={[0.03, 0.2]} to={[0.97, 0.88]} onStats={onStats} />
        <div className="absolute top-4 right-4 left-4 flex justify-between border border-(--fg) bg-(--bg) px-3 py-2 font-mono text-[11px] tracking-[0.12em] uppercase">
          <span>Asher Anjum · a*</span>
          <span ref={read} className="hidden whitespace-pre md:inline">search</span>
        </div>
        <div className="absolute bottom-4 left-4 max-w-xl border border-(--fg) bg-(--bg) p-6 md:bottom-8 md:left-8 md:p-8">
          <Mono>f(n) = g(n) + h(n)</Mono>
          <h1 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-6xl">
            I find the
            <br />
            shortest path.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed">
            Software and AI systems, built in Dubai. {LEDE.split(". ").slice(1).join(". ")}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-6 pt-20">
        <Mono>Start → 01 → 02 → 03 → Goal</Mono>
        <ol className="mt-10">
          {WORK.map((w, i) => (
            <li key={w.n} className="grid grid-cols-[3rem_1fr] gap-x-6">
              <div className="flex flex-col items-center">
                <span className="grid size-10 place-items-center bg-(--fg) font-mono text-[12px] text-(--bg)">{w.n}</span>
                {i < WORK.length - 1 && <span className="w-1 flex-1" style={texture.wall} />}
              </div>
              <div className="pb-12">
                <p className="pt-2 text-xl font-semibold tracking-[-0.02em]">{w.k}</p>
                <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed">{w.v}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <Mono>Legend · four textures, one bit</Mono>
        <div className="mt-4 grid grid-cols-2 border-t border-l border-(--fg) md:grid-cols-4">
          {(
            [
              ["Wall", "50% checker", texture.wall],
              ["Explored", "1 in 9 dot", texture.seen],
              ["Frontier", "Solid", texture.solid],
              ["Path", "Solid, revealed", texture.solid],
            ] as const
          ).map(([k, v, s]) => (
            <div key={k} className="border-r border-b border-(--fg) p-4">
              <div className="h-16 border border-(--fg)" style={s} />
              <p className="mt-3 text-[14px] font-semibold">{k}</p>
              <Mono className="mt-1">{v}</Mono>
            </div>
          ))}
        </div>
      </section>

      <Rules
        title="Search"
        rules={[
          ["Strict one bit.", "Pure #FFFFFF and #000000, no greys anywhere, including body copy. Hierarchy comes from size, weight and texture."],
          ["Texture is the palette.", "Where you'd reach for grey, use a pattern: checker for structure, dots for 'seen', solid for 'now'."],
          ["The mark is literal.", "a* is the algorithm the hero runs. Every load generates new terrain and searches it. The headline borrows the idea."],
          ["Boxes over images.", "Text sits in bordered, opaque panels laid over the procedural field, like a HUD."],
        ]}
      />
      <Footer />
    </div>
  );
}

/* ---- 04 Dither: photos and fades at one bit ---- */

const ALGOS: readonly (readonly [Algo, string])[] = [
  ["atkinson", "Atkinson"],
  ["floyd", "Floyd–Steinberg"],
  ["bayer", "Bayer 8×8"],
  ["threshold", "Threshold"],
];

function Dither({ c, mode }: VProps) {
  const [algo, setAlgo] = useState<Algo>("atkinson");
  const [p, setP] = useState(3);
  const paper = mode === "light" ? c.bg : c.fg;
  const ink = mode === "light" ? c.fg : c.bg;
  return (
    <div>
      <Bar />
      <section className="mx-auto mt-8 grid max-w-5xl border-y border-(--fg) md:grid-cols-2">
        <div className="border-(--fg) md:border-r">
          <DitherImage src="/photos/hero.jpg" algo={algo} paper={paper} ink={ink} p={p} />
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase">
            {ALGOS.map(([a, label]) => (
              <button
                key={a}
                onClick={() => setAlgo(a)}
                className={`border border-(--fg) px-2 py-1 ${algo === a ? "bg-(--fg) text-(--bg)" : ""}`}
              >
                {label}
              </button>
            ))}
            {[2, 3, 4, 6].map((n) => (
              <button
                key={n}
                onClick={() => setP(n)}
                className={`border border-(--fg) px-2 py-1 ${p === n ? "bg-(--fg) text-(--bg)" : ""}`}
              >
                {n}px
              </button>
            ))}
          </div>
          <div>
            <Mono>Software · AI systems · Dubai</Mono>
            <h1 className="mt-6 text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-6xl">
              I build software and AI systems.
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed">{LEDE}</p>
          </div>
        </div>
      </section>

      <Ramp className="h-10" fg={c.fg} bg={c.bg} p={3} />

      <section className="mx-auto max-w-5xl px-6 pt-20">
        <Mono>What I do</Mono>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em]">Three lanes.</h2>
        <div className="mt-10 grid gap-px border border-(--fg) bg-(--fg) md:grid-cols-3">
          {WORK.map((w, i) => (
            <div key={w.n} className="bg-(--bg)">
              <Ramp className="h-16" fg={c.fg} bg={c.bg} p={2 + i} dir="y" />
              <div className="p-5">
                <p className="font-mono text-[12px]">{w.n}</p>
                <p className="mt-3 font-semibold tracking-[-0.02em]">{w.k}</p>
                <p className="mt-2 text-[14px] leading-relaxed">{w.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-20">
        <Mono>In the room</Mono>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {(["/photos/workshop.jpg", "/photos/listening.jpg"] as const).map((src) => (
            <figure key={src}>
              <DitherImage src={src} algo={algo} paper={paper} ink={ink} p={2} className="border border-(--fg)" />
              <figcaption className="mt-2 font-mono text-[10px] tracking-[0.17em] uppercase">
                {src.split("/").pop()} · {algo} · 1 bit
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Rules
        title="Dither"
        rules={[
          ["Photos are 1-bit.", "Every photo goes through Atkinson dithering at 2–3px. It reads as real (still a real room) but belongs to the system."],
          ["Gradients are ordered dither.", "Fades, dividers and section breaks use an 8×8 Bayer ramp. Never a CSS gradient."],
          ["Warm paper.", "#F1EFE8 and #121212 in light, swapped in dark. The photo keeps its natural tones either way."],
          ["Pixel size is a dial.", "Hero at 3px, thumbnails at 2px, decorative ramps at 3–4px. Never smaller than 2px or it reads as grey."],
        ]}
      />
      <Ramp className="h-24" fg={c.fg} bg={c.bg} p={4} dir="y" />
      <Footer />
    </div>
  );
}

/* ---- 05 Automaton: elementary rules as typography ---- */

const NICE_RULES = [30, 45, 73, 90, 105, 110, 150, 54, 57, 62] as const;

function Automaton({ c }: VProps) {
  return (
    <div className="font-mono">
      <Bar />
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12">
        <PixelMark color={c.fg} cols={36} p={6} />
        <h1 className="mt-10 text-[clamp(44px,9vw,112px)] leading-[0.88] font-medium tracking-[-0.07em] lowercase">
          asher anjum
        </h1>
        <p className="mt-6 max-w-[60ch] text-[13px] leading-relaxed lowercase">
          i build software and ai systems. {LEDE.toLowerCase()}
        </p>
      </section>
      <div className="border-y border-(--fg)">
        <RuleBand className="h-72" fg={c.fg} bg={c.bg} rule={30} p={3} />
      </div>
      <p className="mx-auto max-w-5xl px-6 pt-3 text-[10px] tracking-[0.17em] uppercase">
        Rule 30 from a single cell, a few hundred generations in. Printed one row per frame.
      </p>

      <section className="mx-auto max-w-5xl px-6 pt-20">
        <p className="text-[11px] tracking-[0.17em] uppercase">Three lanes</p>
        <div className="mt-8 grid gap-10">
          {WORK.map((w) => {
            const rule = NICE_RULES[hash(w.k) % NICE_RULES.length]!;
            return (
              <div key={w.n} className="grid gap-6 border-t border-(--fg) pt-6 md:grid-cols-[1fr_1.3fr]">
                <div>
                  <RuleBand className="h-36 border border-(--fg)" fg={c.fg} bg={c.bg} rule={rule} seed={w.k} p={3} />
                  <p className="mt-2 text-[10px] tracking-[0.17em] uppercase">
                    Rule {rule} · seed {hash(w.k).toString(16).slice(0, 4)}
                  </p>
                </div>
                <div>
                  <p className="text-[12px]">{w.n}</p>
                  <p className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em]">{w.k}</p>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed">{w.v}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="font-sans">
        <Rules
          title="Automaton"
          rules={[
            ["Every thing gets a pattern.", "Anything with a name (a service, a talk, an invoice) gets a Wolfram rule and seed hashed from that name. Same name, same pattern, forever."],
            ["Mono leads.", "Geist Mono becomes the display face, set lowercase and very tight. Sans is reserved for paragraphs."],
            ["The pixel a*.", "The mark is rebuilt on a coarse grid. It scales in whole pixels only: 3, 4, 6, 8."],
            ["E-ink refresh.", "Switching theme flashes black, then white, then redraws, the way a Kindle page turns."],
          ]}
        />
      </div>
      <Footer />
    </div>
  );
}

export const VARIANTS: readonly {
  id: string;
  name: string;
  blurb: string;
  palettes: Record<Mode, Palette>;
  View: (p: VProps) => ReactNode;
}[] = [
  {
    id: "paper",
    name: "Paper",
    blurb: "E-ink paper. The current layout, de-coloured, with a* running as a Life seed.",
    palettes: {
      light: { bg: "#E9E8E2", fg: "#1A1A18", mid: "#6B6A64", line: "#1A1A18" },
      dark: { bg: "#0E0E0D", fg: "#E9E8E2", mid: "#8A8983", line: "#E9E8E2" },
    },
    View: Paper,
  },
  {
    id: "device",
    name: "Device",
    blurb: "Teenage engineering manual. Modules, keys and a black screen you can play.",
    palettes: {
      light: { bg: "#FFFFFF", fg: "#000000", mid: "#8C8C8C", line: "#000000" },
      dark: { bg: "#000000", fg: "#FFFFFF", mid: "#7A7A7A", line: "#FFFFFF" },
    },
    View: Device,
  },
  {
    id: "search",
    name: "Search",
    blurb: "Strict 1-bit. The hero runs A* over generated caves, forever.",
    palettes: {
      light: { bg: "#FFFFFF", fg: "#000000", mid: "#000000", line: "#000000" },
      dark: { bg: "#000000", fg: "#FFFFFF", mid: "#FFFFFF", line: "#FFFFFF" },
    },
    View: Search_,
  },
  {
    id: "dither",
    name: "Dither",
    blurb: "Real photos at one bit. Atkinson portraits and Bayer fades.",
    palettes: {
      light: { bg: "#F1EFE8", fg: "#121212", mid: "#121212", line: "#121212" },
      dark: { bg: "#0B0B0B", fg: "#F1EFE8", mid: "#F1EFE8", line: "#F1EFE8" },
    },
    View: Dither,
  },
  {
    id: "automaton",
    name: "Automaton",
    blurb: "Mono-led. Wolfram rules hashed from names, printed row by row.",
    palettes: {
      light: { bg: "#FFFFFF", fg: "#0A0A0A", mid: "#0A0A0A", line: "#0A0A0A" },
      dark: { bg: "#0A0A0A", fg: "#FFFFFF", mid: "#FFFFFF", line: "#FFFFFF" },
    },
    View: Automaton,
  },
];
