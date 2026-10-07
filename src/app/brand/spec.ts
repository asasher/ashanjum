/* The brand, as data. /brand renders it for people; /brand.md renders the
   same thing as markdown for agents. Edit here and both stay in step. */

export const SITE = "https://asheranjum.com";

export const ASSET_GROUPS = [
  {
    title: "The mark",
    lede: "a*: Anjum means stars, and A* is the pathfinding search.",
    assets: [
      {
        file: "astar-tile.svg",
        note: "Primary. Ink tile, white a, cobalt star. Avatars and favicons.",
      },
      {
        file: "astar-dark.svg",
        note: "Transparent. For placing on ink.",
        onInk: true,
      },
      {
        file: "astar-light.svg",
        note: "Transparent. For placing on ground or white.",
      },
      {
        file: "astar-mono-ink.svg",
        note: "One colour, ink. Stamps and low-fidelity reproduction.",
      },
      {
        file: "astar-mono-white.svg",
        note: "One colour, white. Reversed on any dark field.",
        onInk: true,
      },
      {
        file: "astar-512.png",
        note: "Raster, 512px. Social avatars that reject SVG.",
      },
    ],
  },
  {
    title: "Alternates",
    lede: "Kept deliberately, not leftovers.",
    assets: [
      {
        file: "astar-upper-tile.svg",
        note: "Uppercase A*, the literal algorithm notation.",
      },
      {
        file: "astar-upper-light.svg",
        note: "Uppercase A*, transparent.",
      },
      {
        file: "mark-a-tile.svg",
        note: "The earlier a. mark, now secondary.",
      },
      {
        file: "mark-star.svg",
        note: "Standalone star. Works as a bullet, divider or sign-off.",
      },
    ],
  },
  {
    title: "Wordmarks",
    lede: "For decks, letterheads and invoices.",
    assets: [
      { file: "wordmark-light.svg", note: "Stacked, dark on light." },
      {
        file: "wordmark-dark.svg",
        note: "Stacked, reversed on ink.",
        onInk: true,
      },
      {
        file: "wordmark-entity-light.svg",
        note: "With the LLC-FZ line. Hold until the licence issues.",
      },
      {
        file: "wordmark-entity-dark.svg",
        note: "With the LLC-FZ line. Hold until the licence issues.",
        onInk: true,
      },
    ],
  },
] as const;

export const PALETTE = [
  { n: "ground", hex: "#F5F6F7", role: "Page background. Never pure white." },
  { n: "surface", hex: "#FFFFFF", role: "Cards and specimen cells on ground." },
  { n: "ink", hex: "#14171C", role: "Text, cover and footer panels, the tile." },
  { n: "ink-2", hex: "#565E69", role: "Body copy." },
  { n: "ink-3", hex: "#8F97A1", role: "Eyebrows, captions, labels." },
  { n: "line", hex: "#DEE1E6", role: "1px hairlines and borders." },
  { n: "line-2", hex: "#EAEDEF", role: "Fainter rule, inside panels." },
  { n: "cobalt", hex: "#3E5BD9", role: "The one accent. Star, rules, numbers." },
  { n: "cobalt-bright", hex: "#7A90EC", role: "Cobalt when it sits on ink." },
  { n: "dusk", hex: "#A3AAB4", role: "Body copy on ink." },
  { n: "dusk-2", hex: "#767E8A", role: "Labels and meta on ink." },
  { n: "rust", hex: "#B4472E", role: "In the deck palette, unused on the site." },
] as const;

/* Only ever applied to the company's own name in the track-record line. */
export const EMPLOYER_COLOURS = [
  { n: "OLX", hex: "#6E0AD6" },
  { n: "Careem", hex: "#00493E" },
  { n: "talabat", hex: "#D94E00" },
  { n: "Delivery Hero", hex: "#D91C2B" },
] as const;

export const TYPE = [
  {
    n: "Display",
    spec: "Geist Sans 600, 36px / 60px at md, line-height 1.05, tracking -0.03em",
    sample: "I build software and AI systems.",
    cls: "text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl",
  },
  {
    n: "Section",
    spec: "Geist Sans 600, 26px / 36px at md, line-height 1.1, tracking -0.025em",
    sample: "Three lanes.",
    cls: "text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-4xl",
  },
  {
    n: "Item",
    spec: "Geist Sans 600, 16px, tracking -0.02em",
    sample: "Agentic business workflows",
    cls: "text-[16px] font-semibold tracking-[-0.02em]",
  },
  {
    n: "Body",
    spec: "Geist Sans 400, 15–17px, line-height relaxed, ink-2, 48–64ch max",
    sample: "I read everything myself and reply to most of it.",
    cls: "text-[16px] leading-relaxed text-ink-2",
  },
  {
    n: "Eyebrow",
    spec: "Geist Mono 500, 11px, uppercase, tracking 0.2em, ink-3",
    sample: "What I do",
    cls: "font-mono text-[11px] font-medium tracking-[0.2em] text-ink-3 uppercase",
  },
  {
    n: "Caption",
    spec: "Geist Mono 400, 10px, uppercase, tracking 0.17em, ink-3",
    sample: "AI 101 · Dubai · May 2026",
    cls: "font-mono text-[10px] tracking-[0.17em] text-ink-3 uppercase",
  },
] as const;

export const VISUAL_RULES = [
  [
    "Light only.",
    "Ground for the page, white surfaces for cards, ink panels as bookends: one cover at the top, one footer at the bottom. No dark mode.",
  ],
  [
    "Cobalt is the only accent.",
    "It marks the star, the 40×2px rule under a cover eyebrow, list numbers and hover states. If two things on a screen are cobalt, one of them shouldn't be.",
  ],
  [
    "Square and flat.",
    "Square corners, 1px hairlines in line, no shadows, no gradients. The tile's rounded corner (22 on a 100 box) belongs to the mark alone.",
  ],
  [
    "One column.",
    "Content sits in a 896px column (max-w-4xl) with 24px side padding. Sections are separated by space (64px, 96px at md), not boxes.",
  ],
  [
    "Mono labels, sans content.",
    "Geist Mono is for eyebrows, captions, numbers, file names and meta. Everything a person reads for meaning is Geist Sans.",
  ],
  [
    "Real photos.",
    "Photos of actual rooms and work, never stock or generated. The cover portrait is greyscale; captions go underneath in mono.",
  ],
] as const;

export const MARK_RULES = [
  [
    "Use the files.",
    "Never retype a* in a font or redraw it. The marks are outlined paths so they look the same everywhere.",
  ],
  [
    "The star stays cobalt.",
    "If colour isn't available, switch to a mono file. Don't recolour the star alone: a black star reads as a footnote.",
  ],
  ["16px is the floor.", "Below that, use the star on its own or nothing."],
  [
    "Leave room.",
    "Keep clear space of at least the star's height on every side. Don't stretch, rotate, outline or put it on a busy photo.",
  ],
  [
    "Hold the entity line.",
    "The LLC-FZ wordmarks stay off the site, invoices and anything a client sees until the licence actually issues.",
  ],
] as const;

export const VOICE_RULES = [
  [
    "First person, singular.",
    "It's \"I\", never \"we\". There is one person behind this.",
  ],
  [
    "Say the specific thing.",
    "Name the company, the city, the month. \"Delivery Hero\" beats \"a global tech leader\".",
  ],
  [
    "Short and declarative.",
    "Headings are sentence case and end in a full stop: \"Three lanes.\" Body copy is plain sentences.",
  ],
  [
    "No pitch voice.",
    "No exclamation marks, no superlatives, no seamless, unlock, leverage or cutting-edge. Admit what's unsettled (\"the answer keeps moving\").",
  ],
  [
    "Light on punctuation tricks.",
    "Avoid em dashes, rhetorical triples and \"it's not X, it's Y\". If it sounds like a LinkedIn post, rewrite it.",
  ],
  ["British spelling.", "Colour, licence, organise."],
] as const;

/* What the site actually says, for tone matching. */
export const VOICE_SAMPLES = [
  "I spent ten years shipping software the old way. Now agents do the heavy lifting and I keep the two calls that matter: what to build, what ships.",
  "Either way you get a running system and the keys. No dependency on me, by design.",
  "Fair question, and the answer keeps moving.",
  "I'm not selling a methodology I read about.",
] as const;

export function brandMarkdown() {
  const rules = (rs: readonly (readonly [string, string])[]) =>
    rs.map(([k, v]) => `- **${k}** ${v}`).join("\n");

  return `# Asher Anjum: brand

Source of truth for anything made under the Asher Anjum name (${SITE}).
Human version: ${SITE}/brand. This file: ${SITE}/brand.md.

Asher builds software and AI systems in Dubai. The work covers agentic software development, AI inside existing business workflows, and in-person AI training. Before that came a decade at OLX, Careem, talabat and Delivery Hero.

## Mark

The mark is **a\\***. Anjum means stars, and A* is the pathfinding search. It's outlined from Geist Mono Medium: a lowercase a in ink (or white on ink) and an asterisk in cobalt #3E5BD9. The primary form is the tile: an ink #14171C square with corner radius 22 (on a 100 box), a white a and a cobalt star.

${rules(MARK_RULES)}

### Files

${ASSET_GROUPS.map(
  (g) =>
    `**${g.title}**\n\n${g.assets
      .map((a) => `- ${SITE}/brand/${a.file}: ${a.note}`)
      .join("\n")}`,
).join("\n\n")}

React components (in the site repo): \`MarkAStar\` and \`MarkADot\` in \`src/app/brand.tsx\`. The letter takes \`currentColor\` and the star is always cobalt.

## Colour

| Token | Hex | Role |
|---|---|---|
${PALETTE.map((c) => `| ${c.n} | ${c.hex} | ${c.role} |`).join("\n")}

Former-employer colours are only for each company's own name, set in semibold, in the track-record line: ${EMPLOYER_COLOURS.map((c) => `${c.n} ${c.hex}`).join(", ")}.

## Type

Geist Sans and Geist Mono (the \`geist\` npm package, or Google Fonts). No other faces.

| Style | Spec |
|---|---|
${TYPE.map((t) => `| ${t.n} | ${t.spec} |`).join("\n")}

## Layout

${rules(VISUAL_RULES)}

Page pattern: an ink cover with a mono meta bar on top ("ASHER ANJUM" left, "DUBAI · UTC+4" right), then a cobalt-bright eyebrow, a 40×2px cobalt rule, the display heading and a dusk lede. Sections follow on ground: an eyebrow, then a section heading, then content. Numbered lists use a cobalt mono number (01, 02, 03) and a hairline between rows. The page closes with an ink footer.

## Voice

${rules(VOICE_RULES)}

Samples from the site:

${VOICE_SAMPLES.map((s) => `> ${s}`).join("\n\n")}

## Contact

hello@asheranjum.com · github.com/asasher · Dubai
`;
}
