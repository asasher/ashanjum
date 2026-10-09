import { type Metadata } from "next";

import { MarkAStar } from "../brand";
import { FooterLife } from "../footer-life";
import { AssetCard } from "./asset-card";
import { CopyButton } from "./copy-button";
import {
  ASSET_GROUPS,
  EMPLOYER_COLOURS,
  MARK_RULES,
  PALETTE,
  TYPE,
  VISUAL_RULES,
  VOICE_RULES,
  VOICE_SAMPLES,
  brandMarkdown,
} from "./spec";

/* Brand reference. Not linked from the site and not indexed. It exists so
   the marks can be reviewed at real sizes and pulled down in whatever format
   the job needs, and so an agent can be handed the whole system at once
   (/brand.md, rendered from the same spec). */

export const metadata: Metadata = {
  title: "Brand",
  robots: { index: false, follow: false },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-ink-3 uppercase">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-4xl">
      {children}
    </h2>
  );
}

function Rules({ rules }: { rules: readonly (readonly [string, string])[] }) {
  return (
    <div className="mt-10">
      {rules.map(([k, v], i) => (
        <div
          key={k}
          className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line py-5 last:border-b md:grid-cols-[2.5rem_16rem_1fr] md:gap-8"
        >
          <p className="pt-0.5 font-mono text-[13px] tracking-[0.05em] text-accent">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="text-[15px] font-semibold tracking-[-0.02em]">{k}</h3>
          <p className="col-start-2 max-w-[60ch] text-[14px] leading-relaxed text-ink-2 md:col-start-3">
            {v}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function BrandPage() {
  const md = brandMarkdown();

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <header className="text-ink">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.17em] text-ink-3 uppercase">
          <div className="flex items-center gap-2 text-ink">
            <MarkAStar size={24} />
            <p className="text-ink-3">Asher Anjum</p>
          </div>
          <p>Internal · not indexed</p>
        </div>
        <div className="mx-auto w-full max-w-4xl px-6 pt-16 pb-4 md:pt-24">
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
            Brand reference
          </p>
          <div className="mt-8 h-0.5 w-10 bg-accent" />
          <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
            a<span className="text-cobalt">*</span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
            Anjum means stars. A* is the pathfinding search: the best route
            through a graph you can&apos;t see all of at once. That&apos;s the
            job, and it&apos;s the same glyph. Outlined from Geist Mono Medium,
            so the mark carries no font dependency.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6">
        <section className="pt-16 md:pt-24">
          <Eyebrow>For agents</Eyebrow>
          <H2>Hand the model this, not a screenshot.</H2>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-ink-2">
            Everything on this page as one markdown file: the marks with their
            URLs, the tokens, the type, the layout and the voice. Paste it
            above a brief, or point the agent at the URL.
          </p>
          <div className="mt-8 bg-ink text-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
              <a
                href="/brand.md"
                className="font-mono text-[12px] text-dusk underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white"
              >
                asheranjum.com/brand.md
              </a>
              <CopyButton text={md} label="copy markdown" />
            </div>
            <pre className="max-h-80 overflow-auto px-5 py-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-dusk">
              {md}
            </pre>
          </div>
        </section>

        <section className="pt-16 md:pt-24">
          <Eyebrow>Legibility</Eyebrow>
          <H2>It has to hold at 16px.</H2>
          <div className="mt-10 flex flex-wrap items-end gap-8 bg-ink p-8 text-white md:p-10">
            {[96, 64, 40, 24, 16].map((s) => (
              <div key={s} className="flex flex-col items-center gap-4">
                <MarkAStar size={s} />
                <p className="font-mono text-[10px] tracking-[0.15em] text-dusk-2">
                  {s}px
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-8 border border-line bg-surface p-8 text-ink md:p-10">
            {[96, 64, 40, 24, 16].map((s) => (
              <div key={s} className="flex flex-col items-center gap-4">
                <MarkAStar size={s} />
                <p className="font-mono text-[10px] tracking-[0.15em] text-ink-3">
                  {s}px
                </p>
              </div>
            ))}
          </div>
        </section>

        {ASSET_GROUPS.map((g) => (
          <section key={g.title} className="pt-16 md:pt-24">
            <Eyebrow>{g.title}</Eyebrow>
            <H2>{g.lede}</H2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.assets.map((a) => (
                <AssetCard
                  key={a.file}
                  file={a.file}
                  note={a.note}
                  onInk={"onInk" in a ? a.onInk : false}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="pt-16 md:pt-24">
          <Eyebrow>Using the mark</Eyebrow>
          <H2>Five rules.</H2>
          <Rules rules={MARK_RULES} />
        </section>

        <section className="pt-16 md:pt-24">
          <Eyebrow>Palette</Eyebrow>
          <H2>One accent, light and dark.</H2>
          <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            {PALETTE.map((c) => (
              <div key={c.n} className="bg-surface p-4">
                <div className="flex h-14 w-full border border-line">
                  <div className="flex-1" style={{ background: c.hex }} />
                  {"dark" in c && (
                    <div className="flex-1" style={{ background: c.dark }} />
                  )}
                </div>
                <p className="mt-3 font-mono text-[11px] tracking-[0.05em] text-ink">
                  {c.n}
                </p>
                <p className="font-mono text-[10px] tracking-[0.05em] text-ink-3">
                  {c.hex}
                  {"dark" in c && ` · ${c.dark}`}
                </p>
                <p className="mt-2 text-[12px] leading-snug text-ink-2">
                  {c.role}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[62ch] text-[14px] leading-relaxed text-ink-2">
            The left half of each swatch is light mode, the right half dark.
            Former-employer colours only ever touch that company&apos;s own
            name, in semibold, with a brighter tone in dark mode:{" "}
            {EMPLOYER_COLOURS.map((c, i) => (
              <span key={c.n}>
                <span className="font-semibold" style={{ color: c.hex }}>
                  {c.n}
                </span>{" "}
                <span className="font-mono text-[11px] text-ink-3">
                  {c.hex} / {c.dark}
                </span>
                {i < EMPLOYER_COLOURS.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </section>

        <section className="pt-16 md:pt-24">
          <Eyebrow>Type</Eyebrow>
          <H2>Geist, and nothing else.</H2>
          <div className="mt-10">
            {TYPE.map((t) => (
              <div
                key={t.n}
                className="grid gap-3 border-t border-line py-6 last:border-b md:grid-cols-[12rem_1fr] md:gap-8"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.05em] text-ink">
                    {t.n}
                  </p>
                  <p className="mt-1 font-mono text-[10px] leading-relaxed tracking-[0.02em] text-ink-3">
                    {t.spec}
                  </p>
                </div>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-16 md:pt-24">
          <Eyebrow>Layout</Eyebrow>
          <H2>Light, flat, a little e-ink.</H2>
          <Rules rules={VISUAL_RULES} />
        </section>

        <section className="pt-16 pb-16 md:pt-24 md:pb-24">
          <Eyebrow>Voice</Eyebrow>
          <H2>Plain, specific, first person.</H2>
          <Rules rules={VOICE_RULES} />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {VOICE_SAMPLES.map((s) => (
              <blockquote
                key={s}
                className="bg-surface p-5 text-[15px] leading-relaxed text-ink"
              >
                {s}
              </blockquote>
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.17em] text-ink-3 uppercase">
            Lines from the site, for tone matching
          </p>
        </section>
      </main>

      <footer className="relative text-ink">
        <FooterLife />
        <div className="relative mx-auto w-full max-w-4xl px-6 pt-10 pb-24 md:pb-40">
          <div className="flex items-center gap-2.5">
            <MarkAStar size={22} />
            <p className="font-mono text-[10px] tracking-[0.17em] text-ink-3 uppercase">
              asheranjum.com · brand reference
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
