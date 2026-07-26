import Image from "next/image";

/* ashanjum.com — personal brand site. One page: who I am, what I do,
   the track record, and the workflow published in the open. Same
   design language as my proposal documents (ground/ink/cobalt, mono
   eyebrows, hairline rules) — but this page stands on its own. */

const TRACK = [
  { years: "2016–17", name: "OLX Group" },
  { years: "2017–18", name: "Shedd" },
  { years: "2019–20", name: "Careem", tone: "text-careem" },
  { years: "2020–22", name: "talabat", tone: "text-talabat" },
  { years: "2022–23", name: "Delivery Hero" },
  { years: "2023–24", name: "talabat", tone: "text-talabat" },
  {
    years: "2024–now",
    name: "Dunn Harland",
    role: "Head of Product & Innovation",
    tone: "text-cobalt",
  },
] as const;

const PROOF = [
  {
    big: "€1M",
    line: "Additional ad revenue from customer lifecycle targeting, at Delivery Hero",
  },
  {
    big: "€120k",
    line: "Revenue from a single feature launch, shipped end to end",
  },
  {
    big: "3",
    line: "Production systems running my agentic loop today — ETL, project lifecycle, legal case management",
  },
] as const;

const WORK = [
  {
    k: "Agentic delivery, installed",
    v: "For software teams: repositories made agent-ready — playbooks, spec templates, verification gates, adversarial review — and the delivery loop taught until it runs without me in the room. I stay on call as an external CTO.",
  },
  {
    k: "AI systems, built end to end",
    v: "For operations businesses: the unglamorous systems the margin depends on. Built with agents, run in production, and handed over with the keys — no dependency on me by design.",
  },
  {
    k: "People, taught in person",
    v: "AI 101 for business owners and solopreneurs, hands-on agentic working sessions for engineering teams. Tools change monthly; judgment about them doesn't.",
  },
] as const;

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

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 font-mono text-[10px] tracking-[0.17em] text-ink-3 uppercase">
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ---- Cover ---- */}
      <header className="bg-ink text-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
          <p>Asher Anjum</p>
          <p>Dubai · UTC+4</p>
        </div>
        <div className="mx-auto grid w-full max-w-4xl items-center gap-12 px-6 pt-16 pb-16 md:grid-cols-[1fr_16rem] md:pt-24 md:pb-24">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-cobalt-bright uppercase">
              Software · AI systems · Dubai
            </p>
            <div className="mt-8 h-0.5 w-10 bg-cobalt" />
            <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
              I build software
              <br />
              and AI systems.
            </h1>
            <p className="mt-8 max-w-[48ch] text-[17px] leading-relaxed text-dusk">
              Ten years shipping production software in this market — OLX,
              Careem, talabat, Delivery Hero. Today I build with agents: people
              make the two decisions that matter, what to build and what
              ships; agents own the work in between. I install that way of
              working inside teams, teach it in rooms, and run my own systems
              on it every day.
            </p>
          </div>
          <div className="relative w-56 md:w-full">
            <Image
              src="/photos/hero.jpg"
              alt="Asher Anjum working at a laptop in a Dubai cafe"
              width={640}
              height={853}
              priority
              className="aspect-[3/4] w-full object-cover grayscale contrast-105"
            />
            <p className="absolute bottom-0 left-0 bg-ink px-3 py-2 font-mono text-[10px] tracking-[0.15em] text-white uppercase">
              Asher Anjum
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6">
        {/* ---- What I do ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow>What I do</Eyebrow>
          <H2>Three kinds of work, one way of working.</H2>
          <div className="mt-10">
            {WORK.map((w) => (
              <div
                key={w.k}
                className="grid gap-2 border-t border-line py-6 last:border-b md:grid-cols-[16rem_1fr] md:gap-8"
              >
                <h3 className="text-[16px] font-semibold tracking-[-0.02em]">
                  {w.k}
                </h3>
                <p className="max-w-[64ch] text-[14px] leading-relaxed text-ink-2">
                  {w.v}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- In the room ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow>In the room</Eyebrow>
          <H2>Some of this work happens on paper, not in repos.</H2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <figure>
              <Image
                src="/photos/workshop.jpg"
                alt="The AI 101 workshop room in Dubai"
                width={960}
                height={720}
                className="aspect-[4/3] w-full border border-line object-cover"
              />
              <Caption>
                AI 101 · Dubai business owners &amp; solopreneurs · May 2026
              </Caption>
            </figure>
            <figure>
              <Image
                src="/photos/listening.jpg"
                alt="Asher listening across a workshop table"
                width={960}
                height={720}
                className="aspect-[4/3] w-full border border-line object-cover"
              />
              <Caption>The first step is always listening</Caption>
            </figure>
          </div>
        </section>

        {/* ---- Track record ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow>Track record</Eyebrow>
          <H2>I&apos;m not selling a methodology I read about.</H2>
          <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-2">
            A decade inside the delivery lifecycle at{" "}
            <span className="font-semibold text-ink">OLX</span>,{" "}
            <span className="font-semibold text-careem">Careem</span>,{" "}
            <span className="font-semibold text-talabat">talabat</span> and{" "}
            <span className="font-semibold text-ink">Delivery Hero</span> — as
            the engineer being reviewed, the reviewer holding the queue, and
            the interviewer on the hiring panel. I know where it fails because
            I&apos;ve stood in every seat.
          </p>

          <div className="mt-10">
            {TRACK.map((t) => (
              <div
                key={t.years}
                className="flex items-baseline gap-6 border-t border-line py-3.5 last:border-b"
              >
                <p className="w-20 shrink-0 font-mono text-[12px] tracking-[0.05em] text-ink-3 tabular-nums">
                  {t.years}
                </p>
                <p
                  className={`text-[15px] font-semibold tracking-[-0.01em] ${
                    "tone" in t ? t.tone : "text-ink"
                  }`}
                >
                  {t.name}
                </p>
                {"role" in t && (
                  <p className="hidden text-[13px] text-ink-3 sm:block">
                    {t.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---- Proof ---- */}
        <section className="grid gap-8 pt-16 sm:grid-cols-3 md:pt-24">
          {PROOF.map((p) => (
            <div key={p.big} className="border-t-2 border-ink pt-4">
              <p className="font-mono text-4xl font-medium tracking-[-0.04em] tabular-nums">
                {p.big}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-2">
                {p.line}
              </p>
            </div>
          ))}
        </section>

        {/* ---- In the open ---- */}
        <section className="pt-16 pb-16 md:pt-24 md:pb-24">
          <div className="bg-ink p-8 text-white md:p-10">
            <p className="font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
              Working in the open
            </p>
            <h2 className="mt-4 text-[24px] leading-[1.15] font-semibold tracking-[-0.025em] md:text-[30px]">
              The workflow I use is public.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-dusk">
              Playbooks, review loops, verification gates — the agentic
              workflow behind my own production systems, published as-is.
              I&apos;d rather you read the source than take my word for it.
            </p>
            <a
              href="https://github.com/asasher/asher-skills"
              className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-white/15 px-5 py-4 transition-colors hover:border-white/40"
            >
              <span className="font-mono text-[14px] tracking-[-0.01em]">
                github.com/asasher/asher-skills
              </span>
              <span className="font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
                public · 60+ skills · take it
              </span>
            </a>
          </div>
        </section>
      </main>

      {/* ---- Contact ---- */}
      <footer className="bg-ink text-white">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-cobalt-bright uppercase">
            Contact
          </p>
          <div className="mt-8 h-0.5 w-10 bg-cobalt" />
          <h2 className="mt-8 max-w-[24ch] text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
            Building something? Write to me.
          </h2>
          <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-dusk">
            I read everything myself and reply to most of it.
          </p>
          <p className="mt-8 font-mono text-[13px] leading-loose text-dusk-2">
            <a
              href="mailto:as.asher.anjum@gmail.com"
              className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
            >
              as.asher.anjum@gmail.com
            </a>
            <br />
            <a href="https://github.com/asasher" className="hover:text-dusk">
              github.com/asasher
            </a>
            &nbsp;&nbsp;·&nbsp;&nbsp;Dubai
          </p>
        </div>
      </footer>
    </div>
  );
}
