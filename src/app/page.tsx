/* ashanjum.com — a single credibility page in the language of the
   Exalogic proposal deck. The deck points here; this page has one job:
   confirm that the person behind the deck is real, specific, and has
   the track record. Everything the site used to be lives in history. */

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
    line: "Production systems running this loop today — ETL, project lifecycle, legal case management",
  },
] as const;

const WORK = [
  {
    n: "01",
    k: "Audit",
    v: "Every repository read and scored against a fixed readiness rubric. A structured interview with every developer on the team.",
  },
  {
    n: "02",
    k: "Talent",
    v: "I sit on the technical panel as interviewer — grading the team you have, screening the people you hire next.",
  },
  {
    n: "03",
    k: "Agentic readiness",
    v: "Repositories rebuilt for agent work: playbooks, spec templates, verification gates, adversarial review.",
  },
  {
    n: "04",
    k: "Lifecycle install",
    v: "The loop installed and taught, until your team runs it without me in the room.",
  },
] as const;

function Eyebrow({
  children,
  quiet,
}: {
  children: React.ReactNode;
  quiet?: boolean;
}) {
  return (
    <p
      className={`font-mono text-[11px] font-medium tracking-[0.2em] uppercase ${
        quiet ? "text-ink-3" : "text-cobalt"
      }`}
    >
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ---- Cover ---- */}
      <header className="bg-ink text-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
          <p>Asher Anjum</p>
          <p>External CTO · Dubai</p>
        </div>
        <div className="mx-auto w-full max-w-3xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-cobalt-bright uppercase">
            Agentic software development
          </p>
          <div className="mt-8 h-0.5 w-10 bg-cobalt" />
          <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl">
            Two human decisions.
            <br />
            Nothing in between.
          </h1>
          <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-dusk">
            You decide what gets built. You decide what ships. Everything
            between those two decisions is owned by agents. I install that
            lifecycle inside software teams — and it&apos;s the workflow I use
            myself, published as-is.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        {/* ---- Who ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow quiet>Track record</Eyebrow>
          <h2 className="mt-4 text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-4xl">
            I&apos;m not selling a methodology I read about.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-2">
            Ten years shipping production software in this market —{" "}
            <span className="font-semibold text-ink">OLX</span>,{" "}
            <span className="font-semibold text-careem">Careem</span>,{" "}
            <span className="font-semibold text-talabat">talabat</span>,{" "}
            <span className="font-semibold text-ink">Delivery Hero</span>. I
            know where the delivery lifecycle fails because I&apos;ve spent my
            whole career inside it.
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

        {/* ---- The work ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow quiet>The work</Eyebrow>
          <h2 className="mt-4 text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-4xl">
            Four workstreams, in this order.
          </h2>
          <div className="mt-10 flex flex-col gap-8">
            {WORK.map((w) => (
              <div key={w.n} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <p className="pt-0.5 font-mono text-[13px] tracking-[0.05em] text-cobalt">
                  {w.n}
                </p>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                    {w.k}
                  </h3>
                  <p className="mt-1.5 max-w-[62ch] text-[14px] leading-relaxed text-ink-2">
                    {w.v}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[70ch] text-[13px] leading-relaxed text-ink-3">
            The order isn&apos;t arbitrary. Audit first, because I won&apos;t
            prescribe before reading the code. Talent second, because the wrong
            team makes the rest impossible. Anyone selling you step four
            without one to three is selling a subscription.
          </p>
        </section>

        {/* ---- The honest part ---- */}
        <section className="pt-16 pb-16 md:pt-24 md:pb-24">
          <div className="bg-ink p-8 text-white md:p-10">
            <p className="font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
              The honest part
            </p>
            <h2 className="mt-4 text-[24px] leading-[1.15] font-semibold tracking-[-0.025em] md:text-[30px]">
              The workflow is free. The setup is where it lives or dies.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-dusk">
              The skill was never the hard part. It encodes a workflow; it
              cannot know your codebase, your conventions, or your people.
              I&apos;d rather you read the source and arrive convinced than pay
              me for a black box.
            </p>
            <a
              href="https://github.com/asasher/asher-skills"
              className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-white/15 px-5 py-4 transition-colors hover:border-white/40"
            >
              <span className="font-mono text-[14px] tracking-[-0.01em]">
                github.com/asasher/asher-skills
              </span>
              <span className="font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
                public · 60+ skills · take it today
              </span>
            </a>
          </div>
        </section>
      </main>

      {/* ---- Next step ---- */}
      <footer className="bg-ink text-white">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-cobalt-bright uppercase">
            Next step
          </p>
          <div className="mt-8 h-0.5 w-10 bg-cobalt" />
          <h2 className="mt-8 text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
            If your roadmap is capped by review capacity, write to me.
          </h2>
          <p className="mt-10 font-mono text-[13px] leading-loose text-dusk-2">
            <a
              href="mailto:as.asher.anjum@gmail.com"
              className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
            >
              as.asher.anjum@gmail.com
            </a>
            <br />
            <a
              href="https://github.com/asasher"
              className="hover:text-dusk"
            >
              github.com/asasher
            </a>
            &nbsp;&nbsp;·&nbsp;&nbsp;Dubai
          </p>
        </div>
      </footer>
    </div>
  );
}
