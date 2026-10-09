import Image from "next/image";
import { type ReactElement, type ReactNode } from "react";
import { COPY, type Copy } from "./copy";

/* ashanjum.com — personal brand site. One page: who I am, what I do,
   the track record, and the workflow published in the open. Same
   design language as my proposal documents (ground/ink/accent, mono
   eyebrows, hairline rules) — but this page stands on its own.

   The slots exist for /lab, which layers procedural pieces over the same
   page. The live homepage passes none of them. */

export type HomeSlots = {
  /** replaces the 40×2 accent rule on the cover */
  coverRule?: ReactNode;
  /** fills the footer behind the contact copy; on a light footer it may
      overhang upward (position it with -z-10 to sit behind the page) */
  footerArt?: ReactNode;
  /** a right-hand column in the footer */
  footerAside?: ReactNode;
  /** absolutely positioned against the main column, full height */
  rail?: ReactNode;
  /** full-page layer behind everything; shows wherever a section has no fill */
  background?: ReactNode;
  /** "light" drops the ink cover for a ground-coloured one */
  cover?: "ink" | "light";
  /** "light" puts the contact block on ground, with nothing marking the
      edge, so footer art can drift up into the page */
  footer?: "ink" | "light";
  /** bracketed keys on eyebrows: [a] What I do */
  tags?: boolean;
  /** wraps each photo, e.g. to add a hover state */
  photo?: (img: ReactElement, src: string) => ReactNode;
};

function Eyebrow({ children, tag }: { children: ReactNode; tag?: string }) {
  return (
    <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-ink-3 uppercase">
      {tag && <span className="mr-2 text-accent normal-case">[{tag}]</span>}
      {children}
    </p>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-4xl">
      {children}
    </h2>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 font-mono text-[10px] tracking-[0.17em] text-ink-3 uppercase">
      {children}
    </p>
  );
}

export function Home({ copy = COPY, slots = {} }: { copy?: Copy; slots?: HomeSlots }) {
  const photo = slots.photo ?? ((img: ReactElement) => img);
  const tag = (t: string) => (slots.tags ? t : undefined);
  const light = slots.cover === "light";
  const lightFoot = slots.footer === "light";

  return (
    <div
      className={`flex min-h-screen flex-col ${
        slots.background || slots.footerArt ? "relative isolate" : ""
      }`}
    >
      {slots.background && (
        <div aria-hidden className="absolute inset-0 -z-10">
          {slots.background}
        </div>
      )}

      {/* ---- Cover ---- */}
      <header className={light ? "text-ink" : "bg-ink text-white"}>
        <div
          className={`mx-auto flex w-full max-w-4xl items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.17em] uppercase ${
            light ? "text-ink-3" : "text-dusk-2"
          }`}
        >
          <p>Asher Anjum</p>
          <p>Dubai · UTC+4</p>
        </div>
        <div className="mx-auto grid w-full max-w-4xl items-center gap-12 px-6 pt-16 pb-16 md:grid-cols-[1fr_16rem] md:pt-24 md:pb-24">
          <div>
            <p
              className={`font-mono text-[11px] font-medium tracking-[0.2em] uppercase ${
                light ? "text-accent" : "text-accent-bright"
              }`}
            >
              {copy.eyebrow}
            </p>
            {slots.coverRule ?? <div className="mt-8 h-0.5 w-10 bg-accent" />}
            <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
              {copy.h1[0]}
              <br />
              {copy.h1[1]}
            </h1>
            <p
              className={`mt-8 max-w-[48ch] text-[17px] leading-relaxed ${
                light ? "text-ink-2" : "text-dusk"
              }`}
            >
              {copy.lede}
            </p>
          </div>
          <div className="relative w-56 md:w-full">
            {photo(
              <Image
                src="/photos/hero.jpg"
                alt="Asher Anjum working at a laptop in a Dubai cafe"
                width={640}
                height={853}
                priority
                className="aspect-[3/4] w-full object-cover grayscale contrast-105"
              />,
              "/photos/hero.jpg",
            )}
            <p
              className={`absolute bottom-0 left-0 px-3 py-2 font-mono text-[10px] tracking-[0.15em] uppercase ${
                light ? "bg-surface text-ink" : "bg-ink text-white"
              }`}
            >
              Asher Anjum
            </p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-4xl flex-1 px-6">
        {slots.rail}

        {/* ---- What I do ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow tag={tag("a")}>{copy.lanesEyebrow}</Eyebrow>
          <H2>{copy.lanesH2}</H2>
          <div className="mt-10">
            {copy.work.map((w) => (
              <div
                key={w.n}
                className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line py-6 last:border-b md:grid-cols-[2.5rem_16rem_1fr] md:gap-8"
              >
                <p className="pt-0.5 font-mono text-[13px] tracking-[0.05em] text-accent">
                  {w.n}
                </p>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em]">
                  {w.k}
                </h3>
                <p className="col-start-2 max-w-[64ch] text-[14px] leading-relaxed text-ink-2 md:col-start-3">
                  {w.v}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- In the room ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow tag={tag("b")}>{copy.roomEyebrow}</Eyebrow>
          <H2>{copy.roomH2}</H2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <figure>
              {photo(
                <Image
                  src="/photos/workshop.jpg"
                  alt="The AI 101 workshop room in Dubai"
                  width={960}
                  height={720}
                  className="aspect-[4/3] w-full border border-line object-cover"
                />,
                "/photos/workshop.jpg",
              )}
              <Caption>{copy.captions[0]}</Caption>
            </figure>
            <figure>
              {photo(
                <Image
                  src="/photos/listening.jpg"
                  alt="Asher standing at the table, mid-explanation, during a working session"
                  width={960}
                  height={720}
                  className="aspect-[4/3] w-full border border-line object-cover"
                />,
                "/photos/listening.jpg",
              )}
              <Caption>{copy.captions[1]}</Caption>
            </figure>
          </div>
        </section>

        {/* ---- Where I've been ---- */}
        <section className="pt-16 pb-16 md:pt-24 md:pb-24">
          <Eyebrow tag={tag("c")}>{copy.pastEyebrow}</Eyebrow>
          <H2>{copy.pastH2}</H2>
          <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-2">
            {copy.pastLead}
            <span className="font-semibold text-olx">OLX</span>,{" "}
            <span className="font-semibold text-careem">Careem</span>,{" "}
            <span className="font-semibold text-talabat">talabat</span> and{" "}
            <span className="font-semibold text-delivery-hero">
              Delivery Hero
            </span>
            {copy.pastTail}
          </p>
        </section>
      </main>

      {/* ---- Contact ---- */}
      <footer
        className={`relative ${lightFoot ? "text-ink" : "overflow-hidden bg-ink text-white"}`}
      >
        {slots.footerArt}
        <div
          className={`relative mx-auto grid w-full max-w-4xl gap-12 px-6 py-16 md:py-20 ${
            slots.footerArt ? "pointer-events-none" : ""
          } ${slots.footerAside ? "md:grid-cols-[1fr_20rem]" : ""}`}
        >
          <div>
            <p
              className={`font-mono text-[11px] font-medium tracking-[0.2em] uppercase ${
                lightFoot ? "text-accent" : "text-accent-bright"
              }`}
            >
              {slots.tags && <span className="mr-2 normal-case">[d]</span>}
              Contact
            </p>
            <div className="mt-8 h-0.5 w-10 bg-accent" />
            <h2 className="mt-8 max-w-[24ch] text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
              {copy.contactH2}
            </h2>
            <p
              className={`mt-6 max-w-[48ch] text-[15px] leading-relaxed ${
                lightFoot ? "text-ink-2" : "text-dusk"
              }`}
            >
              {copy.contactBody}
            </p>
            <p
              className={`pointer-events-auto mt-8 font-mono text-[13px] leading-loose ${
                lightFoot ? "text-ink-3" : "text-dusk-2"
              }`}
            >
              <a
                href="mailto:hello@asheranjum.com"
                className={`underline underline-offset-4 ${
                  lightFoot
                    ? "text-ink decoration-ink/25 hover:decoration-ink"
                    : "text-white decoration-white/25 hover:decoration-white"
                }`}
              >
                hello@asheranjum.com
              </a>
              <br />
              <a
                href="https://github.com/asasher"
                className={lightFoot ? "hover:text-ink-2" : "hover:text-dusk"}
              >
                github.com/asasher
              </a>
              &nbsp;&nbsp;·&nbsp;&nbsp;Dubai
            </p>
          </div>
          {slots.footerAside && (
            <div className="pointer-events-auto">{slots.footerAside}</div>
          )}
        </div>
      </footer>
    </div>
  );
}
