"use client";

/* Round 2: the current homepage, kept whole (photos, cobalt, employer
   colours), with Device and Search pieces added in increasing doses. */

import { useCallback, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { type Copy } from "~/app/copy";
import { Home } from "~/app/home";
import { DitherImage, Life, PathRail } from "~/components/procedural/canvases";
import { RULES } from "~/components/procedural/engines";

/* The copy before the Hormozi rewrite, kept so the lab can compare. */
export const PREVIOUS: Copy = {
  eyebrow: "Software · AI systems · Dubai",
  h1: ["I build software", "and AI systems."],
  lede: "I spent ten years shipping software the old way. Now agents do the heavy lifting and I keep the two calls that matter: what to build, what ships. I build systems like this, integrate them into businesses, and teach it.",
  lanesEyebrow: "What I do",
  lanesH2: "Three lanes.",
  work: [
    {
      n: "01",
      k: "Agentic software development lifecycle",
      v: "The whole lifecycle, from first conversation to production. I build AI systems end to end, or set the lifecycle up inside your team. Either way you get a running system and the keys. No dependency on me, by design.",
    },
    {
      n: "02",
      k: "Agentic business workflows",
      v: "AI put to work inside the workflows a business already runs on: quoting, reporting, case handling, operations. It plugs into the tools you have. There is no platform to migrate to.",
    },
    {
      n: "03",
      k: "What exactly is agentic?",
      v: "Fair question, and the answer keeps moving. I teach it in person: AI 101 for business owners through to hands-on working sessions for teams. The aim is judgment that outlasts whatever tool is hot this month.",
    },
  ],
  roomEyebrow: "In person",
  roomH2: "Some of this work happens in a room.",
  captions: [
    "AI 101 · Dubai business owners & solopreneurs · May 2026",
    "Hands-on agentic working session · Dubai",
  ],
  pastEyebrow: "Where I've been",
  pastH2: "I'm not selling a methodology I read about.",
  pastLead:
    "I spent a decade shipping production software for millions of users, with great people, at companies like ",
  pastTail: ".",
  contactH2: "Building something? Write to me.",
  contactBody: "I read everything myself and reply to most of it.",
};

const INK = "#14171C";
const LINE = "#DEE1E6";

function rail() {
  return (
    <PathRail
      className="absolute top-0 bottom-0 -left-24 hidden w-16 xl:block"
      wall={LINE}
      seen="#C3C8CF"
      path={INK}
      head="#3E5BD9"
      p={2}
      k={3}
    />
  );
}

function footerLife(fg: string) {
  return (
    <div className="absolute inset-y-0 right-0 hidden w-[55%] md:block">
      <Life className="h-full" fg={fg} bg={INK} p={6} markSize={0.5} />
    </div>
  );
}

function ditherOnHover(img: ReactElement, src: string) {
  return (
    <div className="group relative">
      {img}
      <DitherImage
        src={src}
        algo="atkinson"
        paper="#FFFFFF"
        ink={INK}
        p={2}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
    </div>
  );
}

const GliderRule = (
  <div className="mt-6 h-4 w-40">
    <Life className="h-full" fg="#3E5BD9" bg={INK} p={2} pattern="gliders" interval={110} />
  </div>
);

/* Round 3: the path as a page background. It snakes between these
   waypoints (fractions of the page) around caves that stay invisible, so
   all you see is the route and the dots A* explored, in greys close to
   the ground colour, with a cobalt-bright head. */
const WAYPOINTS = [
  [0.06, 0.03],
  [0.94, 0.24],
  [0.05, 0.5],
  [0.95, 0.74],
  [0.5, 1],
] as const;

function background(fades: boolean) {
  return (
    <PathRail
      className="h-full w-full"
      terrain="caves"
      via={WAYPOINTS}
      p={2}
      k={4}
      wall="transparent"
      seen="#DCE0E5"
      path="#A9B1BB"
      trail={fades ? "transparent" : "#D9DDE2"}
      head="#7A90EC"
      fade={70}
    />
  );
}

/* ---- The Device screen, as a footer module ---- */

const KEYS = [
  ["life", RULES.life],
  ["high", RULES.highlife],
  ["d&n", RULES.daynight],
  ["seed", RULES.seeds],
  ["maze", RULES.maze],
] as const;

function Screen() {
  const [rule, setRule] = useState<string>(RULES.life);
  const [resetKey, setResetKey] = useState(0);
  const gen = useRef<HTMLSpanElement>(null);
  const onStats = useCallback((s: { gen: number }) => {
    if (gen.current) gen.current.textContent = String(s.gen).padStart(4, "0");
  }, []);
  return (
    <div className="border border-white/15 p-3 font-mono text-[10px] text-dusk-2 lowercase">
      <div className="flex justify-between">
        <span>[e] display · {rule.toLowerCase()}</span>
        <span>
          gen <span ref={gen} className="text-white">0000</span>
        </span>
      </div>
      <div className="mt-2 bg-black">
        <Life className="h-44" fg="#FFFFFF" bg="#000000" p={4} rule={rule} resetKey={resetKey} markSize={0.5} onStats={onStats} />
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1">
        {KEYS.map(([label, r], i) => (
          <button
            key={r}
            onClick={() => setRule(r)}
            className={`flex aspect-square flex-col justify-between border p-1 text-left ${
              rule === r ? "border-cobalt bg-cobalt text-white" : "border-white/20 hover:border-white/50"
            }`}
          >
            <span className="opacity-60">k{i + 1}</span>
            <span>{label}</span>
          </button>
        ))}
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="flex aspect-square flex-col justify-between border border-white/20 p-1 text-left hover:border-white/50"
        >
          <span className="opacity-60">k6</span>
          <span>a*</span>
        </button>
      </div>
    </div>
  );
}

export type LabView = {
  id: string;
  name: string;
  blurb: string;
  View: (p: { copy: Copy; fades: boolean; mode: "light" | "dark"; paper: boolean }) => ReactNode;
};

/* Round 4: all light. No ink cover, no path, no hairline over the footer.
   Life runs on a transparent layer taller than the footer, behind the
   page, so cells drift up past the footer and dither away (an e-ink
   fade); only the footer takes the pointer. Each variant swaps the site
   accent (eyebrows, numbers, rules) and tints the cells to match.
   `paper` swaps the cool ground for a warm e-ink grey. */
type Accent = { name: string; accent: [string, string]; tint: [string, string] };

const ACCENTS = {
  cobalt: { name: "Cobalt", accent: ["#3E5BD9", "#7A90EC"], tint: ["#C9D2F6", "#26336B"] },
  graphite: { name: "Graphite", accent: ["#3B4048", "#C3C8CF"], tint: ["#D2D5DA", "#2B2F35"] },
  teal: { name: "Teal", accent: ["#0E6E78", "#4FB8C2"], tint: ["#BFDDE0", "#143A3E"] },
  signal: { name: "Signal orange", accent: ["#D84A1B", "#FF7A4A"], tint: ["#F6CDBB", "#4A2315"] },
  ochre: { name: "Ochre", accent: ["#9C6B12", "#D9A93F"], tint: ["#E8D59C", "#4B3D15"] },
} satisfies Record<string, Accent>;

const PAPER = {
  light: { "--color-ground": "#EEEDE8", "--color-surface": "#F8F7F3", "--color-line": "#D9D7CF", "--color-line-2": "#E4E2DA" },
  dark: { "--color-ground": "#131311", "--color-surface": "#1B1B18", "--color-line": "#2B2A26", "--color-line-2": "#21201D" },
} as const;

function LightSite({
  accent,
  copy,
  mode,
  paper,
}: {
  accent: Accent;
  copy: Copy;
  mode: "light" | "dark";
  paper: boolean;
}) {
  const m = mode === "light" ? 0 : 1;
  const vars: Record<string, string> = {
    "--color-accent": accent.accent[m],
    ...(paper ? PAPER[mode] : {}),
  };
  return (
    <div style={vars as CSSProperties} className="bg-ground">
      <Home
        copy={copy}
        slots={{
          cover: "light",
          footer: "light",
          footerArt: (
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[calc(100%+22rem)]">
              <Life
                className="h-full"
                fg={accent.tint[m]}
                bg="transparent"
                p={6}
                markSize={0.32}
                markX={0.8}
                markY={0.68}
                fadeTop={0.45}
                listenOn="footer"
              />
            </div>
          ),
        }}
      />
    </div>
  );
}

export const ROUND4: readonly LabView[] = Object.entries(ACCENTS).map(([id, a]) => ({
  id,
  name: a.name,
  blurb: `${a.name} accent across the site, with footer Life in a ${a.name.toLowerCase()} tint drifting up into the page. Hover the footer to seed cells.`,
  View: ({ copy, mode, paper }) => <LightSite accent={a} copy={copy} mode={mode} paper={paper} />,
}));

export const ROUND3: readonly LabView[] = [
  {
    id: "quiet-ink",
    name: "Quiet · ink cover",
    blurb: "Path in the page background, revealed as you scroll. Footer Life and cobalt gliders on the cover rule.",
    View: ({ copy, fades }) => (
      <Home
        copy={copy}
        slots={{ background: background(fades), footerArt: footerLife("#2E343D"), coverRule: GliderRule }}
      />
    ),
  },
  {
    id: "quiet-light",
    name: "Quiet · light cover",
    blurb: "Same, with no ink block on top: the cover sits on ground, the path runs behind it too, and the cover rule stays a plain cobalt line.",
    View: ({ copy, fades }) => (
      <Home
        copy={copy}
        slots={{
          cover: "light",
          background: background(fades),
          footerArt: footerLife("#2E343D"),
        }}
      />
    ),
  },
  {
    id: "device-ink",
    name: "Device · ink cover",
    blurb: "Background path, bracket keys, the playable Life screen in the footer, photos that dither on hover.",
    View: ({ copy, fades }) => (
      <Home
        copy={copy}
        slots={{ background: background(fades), tags: true, footerAside: <Screen />, photo: ditherOnHover }}
      />
    ),
  },
  {
    id: "device-light",
    name: "Device · light cover",
    blurb: "Device accents with the light cover.",
    View: ({ copy, fades }) => (
      <Home
        copy={copy}
        slots={{
          cover: "light",
          background: background(fades),
          tags: true,
          footerAside: <Screen />,
          photo: ditherOnHover,
        }}
      />
    ),
  },
];

export const ROUND2: readonly LabView[] = [
  {
    id: "live",
    name: "As is",
    blurb: "The live homepage, for reference.",
    View: ({ copy }) => <Home copy={copy} />,
  },
  {
    id: "footer",
    name: "Footer life",
    blurb: "Only the footer changes: a* runs as Life on the right, quiet grey on ink. Hover it to seed cells.",
    View: ({ copy }) => <Home copy={copy} slots={{ footerArt: footerLife("#2E343D") }} />,
  },
  {
    id: "rail",
    name: "Path rail",
    blurb: "A* route down the left gutter, revealed as you scroll. Cobalt head, ends at the footer. Needs a wide window (xl).",
    View: ({ copy }) => <Home copy={copy} slots={{ rail: rail() }} />,
  },
  {
    id: "both",
    name: "Both, quiet",
    blurb: "Rail and footer Life together, plus cobalt gliders crawling along the cover rule.",
    View: ({ copy }) => (
      <Home copy={copy} slots={{ rail: rail(), footerArt: footerLife("#2E343D"), coverRule: GliderRule }} />
    ),
  },
  {
    id: "device",
    name: "Device accents",
    blurb: "Bracket keys on sections, the rail, a playable Life screen in the footer, and photos that dither on hover.",
    View: ({ copy }) => (
      <Home copy={copy} slots={{ rail: rail(), tags: true, footerAside: <Screen />, photo: ditherOnHover }} />
    ),
  },
];
