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

/* Light and dark values for each token. The site follows the visitor's
   system setting; anything without a dark value is light-only. */
export const PALETTE = [
  { n: "ground", hex: "#F5F6F7", dark: "#0F1215", role: "Page background. Never pure white or pure black." },
  { n: "surface", hex: "#FFFFFF", dark: "#161A1F", role: "Cards, specimen cells, the photo name tag." },
  { n: "ink", hex: "#14171C", dark: "#E8EAED", role: "Headings and primary text." },
  { n: "ink-2", hex: "#565E69", dark: "#A3AAB4", role: "Body copy." },
  { n: "ink-3", hex: "#8F97A1", dark: "#767E8A", role: "Eyebrows, captions, labels." },
  { n: "line", hex: "#DEE1E6", dark: "#262B32", role: "1px hairlines between rows." },
  { n: "line-2", hex: "#EAEDEF", dark: "#1D2127", role: "Fainter rule." },
  { n: "accent", hex: "#3B4048", dark: "#C3C8CF", role: "Graphite. The one accent: eyebrows, list numbers, the 40×2px rule." },
  { n: "life", hex: "#D2D5DA", dark: "#2B2F35", role: "The footer Life cells. Close to ground on purpose." },
  { n: "cobalt", hex: "#3E5BD9", role: "The mark's star only. Not used on pages anymore." },
] as const;

/* Only ever applied to the company's own name in the track-record line.
   The dark tones are each brand's brighter colour, for legibility on dark. */
export const EMPLOYER_COLOURS = [
  { n: "OLX", hex: "#6E0AD6", dark: "#A46CF5" },
  { n: "Careem", hex: "#00493E", dark: "#00E784" },
  { n: "talabat", hex: "#D94E00", dark: "#FF6A1A" },
  { n: "Delivery Hero", hex: "#D91C2B", dark: "#FF4F5C" },
] as const;

export const TYPE = [
  {
    n: "Display",
    spec: "Geist Sans 600, 36px / 60px at md, line-height 1.05, tracking -0.03em",
    sample: "I help businesses put AI to work.",
    cls: "text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl",
  },
  {
    n: "Section",
    spec: "Geist Sans 600, 26px / 36px at md, line-height 1.1, tracking -0.025em",
    sample: "Three ways I help.",
    cls: "text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-4xl",
  },
  {
    n: "Item",
    spec: "Geist Sans 600, 16px, tracking -0.02em",
    sample: "Put AI into the work you already do",
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
    sample: "What I can do for you",
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
    "Light, with a dark twin.",
    "Ground for the page, white surfaces for cards. No ink blocks: the cover and the footer sit on ground like everything else. Dark mode follows the visitor's system setting and swaps the tokens, never the layout.",
  ],
  [
    "Graphite is the only accent.",
    "It marks eyebrows on the cover, list numbers and the 40×2px rule. The employer names are the only colour on the page, and photos the only full-colour images.",
  ],
  [
    "A little e-ink.",
    "Anything procedural is drawn in square pixels and fades by ordered (Bayer) dithering, never by opacity or blur. Close to the ground colour, so it reads as texture, not decoration.",
  ],
  [
    "Life in the footer.",
    "The a* mark is seeded into Conway's Game of Life behind the contact block. The cells can drift up past the footer and dither away; only the footer takes the pointer. Off on phones, still under reduced motion.",
  ],
  [
    "Square and flat.",
    "Square corners, 1px hairlines in line, no shadows, no gradients. The tile's rounded corner (22 on a 100 box) belongs to the mark alone.",
  ],
  [
    "One column.",
    "Content sits in a 896px column (max-w-4xl) with 24px side padding. Sections are separated by space (64px, 96px at md), not boxes or borders.",
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
    "It's the last place cobalt lives. If colour isn't available, switch to a mono file. Don't recolour the star alone: a black star reads as a footnote.",
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
    "Lead with them.",
    "Say who it's for and what they get before anything about me. \"I help businesses put AI to work\" beats \"I build software and AI systems\".",
  ],
  [
    "Only claim what you can show.",
    "Proof goes right under the promise: the employers, the decade, photos from real sessions. No invented numbers, clients or testimonials.",
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
  "Most owners I meet know AI could save their team hours. They don't know where to start, or who to trust with it.",
  "Tell me the problem. I build the software and hand over a running system and the keys. You won't need me to keep it alive.",
  "Fair question, and the answer keeps moving.",
  "Tell me what's slowing your team down.",
] as const;

export function brandMarkdown() {
  const rules = (rs: readonly (readonly [string, string])[]) =>
    rs.map(([k, v]) => `- **${k}** ${v}`).join("\n");

  return `# Asher Anjum: brand

Source of truth for anything made under the Asher Anjum name (${SITE}).
Human version: ${SITE}/brand. This file: ${SITE}/brand.md.

Asher helps Dubai businesses put AI to work: he builds the systems, connects them to the tools a business already uses, and trains its people to run them, in person. Before that came a decade at OLX, Careem, talabat and Delivery Hero.

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

| Token | Light | Dark | Role |
|---|---|---|---|
${PALETTE.map((c) => `| ${c.n} | ${c.hex} | ${"dark" in c ? c.dark : "n/a"} | ${c.role} |`).join("\n")}

Former-employer colours are only for each company's own name, set in semibold, in the track-record line: ${EMPLOYER_COLOURS.map((c) => `${c.n} ${c.hex} (dark ${c.dark})`).join(", ")}.

## Type

Geist Sans and Geist Mono (the \`geist\` npm package, or Google Fonts). No other faces.

| Style | Spec |
|---|---|
${TYPE.map((t) => `| ${t.n} | ${t.spec} |`).join("\n")}

## Layout

${rules(VISUAL_RULES)}

Page pattern: a cover on ground with a mono meta bar on top ("ASHER ANJUM" left, "DUBAI · UTC+4" right), then a graphite eyebrow, a 40×2px graphite rule, the display heading (who it's for and what they get), an ink-2 lede and the greyscale portrait. Sections follow: an eyebrow, a section heading, then content. Numbered lists use a graphite mono number (01, 02, 03) and a hairline between rows. The page closes with the contact block on ground, no border above it, with the footer Life behind it.

## Voice

${rules(VOICE_RULES)}

Samples from the site:

${VOICE_SAMPLES.map((s) => `> ${s}`).join("\n\n")}

## Contact

hello@asheranjum.com · github.com/asasher · Dubai
`;
}
