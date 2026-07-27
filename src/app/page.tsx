import Image from "next/image";

/* ashanjum.com — personal brand site. One page: who I am, what I do,
   the track record, and the workflow published in the open. Same
   design language as my proposal documents (ground/ink/cobalt, mono
   eyebrows, hairline rules) — but this page stands on its own. */

const WORK = [
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
              I spent ten years shipping software the old way. Now agents do
              the heavy lifting and I keep the two calls that matter: what to
              build, what ships. I build systems like this, integrate them
              into businesses, and teach it.
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
          <H2>Three lanes.</H2>
          <div className="mt-10">
            {WORK.map((w) => (
              <div
                key={w.k}
                className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line py-6 last:border-b md:grid-cols-[2.5rem_16rem_1fr] md:gap-8"
              >
                <p className="pt-0.5 font-mono text-[13px] tracking-[0.05em] text-cobalt">
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
          <Eyebrow>In person</Eyebrow>
          <H2>Some of this work happens in a room.</H2>
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
                alt="Asher standing at the table, mid-explanation, during a working session"
                width={960}
                height={720}
                className="aspect-[4/3] w-full border border-line object-cover"
              />
              <Caption>Hands-on agentic working session · Dubai</Caption>
            </figure>
          </div>
        </section>

        {/* ---- Where I've been ---- */}
        <section className="pt-16 md:pt-24">
          <Eyebrow>Where I&apos;ve been</Eyebrow>
          <H2>I&apos;m not selling a methodology I read about.</H2>
          <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-2">
            I spent a decade shipping production software for millions of
            users, with great people, at companies like{" "}
            <span className="font-semibold text-ink">OLX</span>,{" "}
            <span className="font-semibold text-careem">Careem</span>,{" "}
            <span className="font-semibold text-talabat">talabat</span> and{" "}
            <span className="font-semibold text-ink">Delivery Hero</span>.
          </p>
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
              The playbooks, review loops and verification gates behind the
              systems I run in production, for ETL, project lifecycle and
              legal case management. Read the source.
            </p>
            <a
              href="https://github.com/asasher/asher-skills"
              className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-white/15 px-5 py-4 transition-colors hover:border-white/40"
            >
              <span className="font-mono text-[14px] tracking-[-0.01em]">
                github.com/asasher/asher-skills
              </span>
              <span className="font-mono text-[11px] tracking-[0.17em] text-dusk-2 uppercase">
                public
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
