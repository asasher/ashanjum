import Link from "next/link";
import { type CSSProperties } from "react";

import { LeadForm } from "~/components/LeadForm";

const ray = (color: string) =>
  ({ "--color-accent": `var(--color-ray-${color})` }) as CSSProperties;

const PACKETS = [
  {
    slug: "constraints",
    color: "orange",
    name: "Constraint Finder",
    what: "Theory-of-Constraints facilitation that hunts down the one bottleneck throttling your whole operation — then runs the experiments to break it.",
    who: "FOUNDERS · COO · OPS LEADS",
  },
  {
    slug: "fair-deal",
    color: "pink",
    name: "Fair Deal Canvas",
    what: "Two founders, two agents, one canvas. A mediated negotiation that lands a partnership both sides would sign again a year later.",
    who: "CO-FOUNDERS · PARTNERSHIPS · JVS",
  },
  {
    slug: "triage",
    color: "blue",
    name: "Backlog Triage Loop",
    what: "Your issue backlog groomed, scoped, and run through agents into reviewed pull requests. The queue stops being a graveyard.",
    who: "PRODUCT & ENGINEERING LEADS",
  },
  {
    slug: "skill-loop",
    color: "indigo",
    name: "Skill Loop",
    what: "Eval-driven improvement for your AI workflows: measure, edit, re-run, until there is no evaluation-backed change left to make.",
    who: "TEAMS ALREADY RUNNING AGENTS",
  },
  {
    slug: "teamdrive",
    color: "mint",
    name: "TeamDrive",
    what: "Agents operating directly inside Google Workspace — Drive, Docs, Sheets, Slides — with revision history and managed versions intact.",
    who: "OPS · ADMIN-HEAVY TEAMS",
  },
] as const;

export default function UmbrellaPage() {
  return (
    <div className="min-h-screen bg-ink-deep font-sans text-bone">
      {/* Fixed perspective grid floor — the page's depth layer */}
      <div className="fx-grid" aria-hidden="true" />

      <div className="relative z-10">
        {/* Ticker strip */}
        <div className="overflow-hidden border-b border-line bg-panel py-2 whitespace-nowrap">
          <div className="animate-ticker inline-block will-change-transform">
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden={i === 1}
                className="font-mono text-xs tracking-wider text-bone-dim"
              >
                ~ AI SYSTEMS FOR DUBAI OPERATORS · BUILT IN 30 DAYS · HANDED
                OVER · YOU OWN IT ~ THE KNOWLEDGE IS FREE · THE IMPLEMENTATION
                IS THE PRODUCT ·{" "}
              </span>
            ))}
          </div>
        </div>

        <header className="mx-auto flex max-w-5xl items-baseline justify-between px-6 pt-10">
          <p className="font-mono text-sm font-semibold tracking-tight">
            ash anjum<span className="animate-caret text-accent">▊</span>
          </p>
          <nav className="flex flex-wrap gap-5 font-mono text-xs text-bone-dim">
            <a href="#systems" className="transition-colors hover:text-accent">
              [ SYSTEMS ]
            </a>
            <Link
              href="/delivery-margin-recovery"
              className="transition-colors hover:text-ray-blue"
            >
              [ MARGIN RECOVERY ]
            </Link>
            <Link
              href="/review-insights"
              className="transition-colors hover:text-ray-indigo"
            >
              [ REVIEW INSIGHTS ]
            </Link>
            <a href="#contact" className="transition-colors hover:text-accent">
              [ CONTACT ]
            </a>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-6">
          {/* Hero — tilts back into depth as you scroll past */}
          <div className="fx-stage">
            <section data-scene="exit" className="fx-hero pt-24 pb-24 sm:pt-36">
              <p
                className="mb-6 font-mono text-xs tracking-widest text-accent-2 uppercase"
                style={{ animation: "var(--animate-rise)" }}
              >
                ex-Talabat / Delivery Hero · Head of Product
              </p>
              <h1
                className="font-mono max-w-4xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl"
                style={{
                  animation: "var(--animate-rise)",
                  animationDelay: "80ms",
                }}
              >
                I build AI systems
                <br />
                your team <span className="bg-accent px-2 text-accent-ink">
                  owns
                </span>
                .
              </h1>
              <p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim"
                style={{
                  animation: "var(--animate-rise)",
                  animationDelay: "160ms",
                }}
              >
                Not decks. Not certificates. Working systems, built on your
                real numbers, handed over with the keys. There&apos;s a gold
                rush on and everyone is selling shovels — I teach you to dig,
                or I dig and hand you the hole.
              </p>
              <div
                className="mt-10 flex flex-wrap gap-4"
                style={{
                  animation: "var(--animate-rise)",
                  animationDelay: "240ms",
                }}
              >
                <a
                  href="#systems"
                  className="bg-accent px-7 py-3.5 font-mono text-sm font-bold text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  BROWSE THE SYSTEMS →
                </a>
                <a
                  href="#work-with-me"
                  className="border border-line px-7 py-3.5 font-mono text-sm text-bone-dim transition-colors hover:border-accent hover:text-bone"
                >
                  [ HOW IT WORKS ]
                </a>
              </div>
            </section>
          </div>

          {/* Pinned manifesto — highlight sweeps line by line with scroll */}
          <section data-scene="pin" className="relative h-[240vh]">
            <div className="sticky top-0 flex h-screen flex-col items-start justify-center">
              <p className="mb-8 font-mono text-xs tracking-widest text-bone-dim">
                {"// THE OPERATING MODEL"}
              </p>
              {[
                "The knowledge is free.",
                "The implementation is for sale.",
                "You own what I build.",
              ].map((line, i) => (
                <p
                  key={line}
                  className="fx-line font-mono text-3xl leading-tight font-bold sm:text-5xl"
                  style={{ "--i": i } as CSSProperties}
                >
                  {line}
                </p>
              ))}
            </div>
          </section>

          {/* Two tiers */}
          <section id="work-with-me" className="py-20">
            <h2 data-scene="enter" className="fx-card font-mono text-3xl font-bold sm:text-4xl">
              Two ways to work with me
            </h2>
            <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
              <div data-scene="enter" className="fx-card bg-panel p-8">
                <p className="font-mono text-xs tracking-widest text-accent-2">
                  01 / DONE WITH YOU
                </p>
                <h3 className="mt-4 font-mono text-2xl font-bold">
                  You learn by building
                </h3>
                <p className="mt-4 leading-relaxed text-bone-dim">
                  We build a real AI system for your own business, together.
                  Your team learns the tools on a problem that pays for the
                  learning. No sandbox exercises, no certificate mill.
                </p>
              </div>
              <div data-scene="enter" className="fx-card bg-panel p-8">
                <p className="font-mono text-xs tracking-widest text-accent-2">
                  02 / DONE FOR YOU
                </p>
                <h3 className="mt-4 font-mono text-2xl font-bold">
                  I build it, you keep it
                </h3>
                <p className="mt-4 leading-relaxed text-bone-dim">
                  I audit the workflow, build the system on your data, train
                  your team, and hand it over. You own it outright — the
                  optional retainer covers optimization, not hostage-keeping.
                </p>
              </div>
            </div>
            <p className="mt-6 font-mono text-xs text-bone-dim">
              {"// The difference from an agency: no black box, no lock-in. The system is yours after I leave."}
            </p>
          </section>

          <div className="font-mono text-xs text-line select-none">
            ────────────────────────────────────────────────────────────
          </div>

          {/* Flagship offers */}
          <section className="py-20">
            <h2 data-scene="enter" className="fx-card font-mono text-3xl font-bold sm:text-4xl">
              On the bench right now
            </h2>
            <div className="mt-12 grid gap-6">
              <Link
                href="/delivery-margin-recovery"
                data-scene="enter"
                style={ray("blue")}
                className="fx-card group block border border-line bg-panel-2 p-8 transition-colors hover:border-accent"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-mono text-2xl font-bold">
                    Delivery Margin Recovery Sprint
                  </h3>
                  <span className="font-mono text-xs text-accent">
                    F&amp;B · 30 DAYS · AED 20,000
                  </span>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
                  A live payout-vs-POS reconciliation system for Dubai
                  restaurant groups losing AED 15k+/month to aggregator leakage
                  they can&apos;t see. Built in 30 days, then it&apos;s yours.
                </p>
                <p className="mt-5 font-mono text-sm text-accent transition-transform duration-200 group-hover:translate-x-1">
                  → Book a Profit Audit
                </p>
              </Link>
              <Link
                href="/review-insights"
                data-scene="enter"
                style={ray("indigo")}
                className="fx-card group block border border-line bg-panel-2 p-8 transition-colors hover:border-accent"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-mono text-2xl font-bold">
                    Review Insights Triage
                  </h3>
                  <span className="font-mono text-xs text-accent">
                    MULTI-BRAND F&amp;B · 30 DAYS
                  </span>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
                  Your reviews already say which brand is bleeding and why —
                  nobody has time to read hundreds of them. A triage system
                  that ranks the damage and hands your ops team the fix.
                </p>
                <p className="mt-5 font-mono text-sm text-accent transition-transform duration-200 group-hover:translate-x-1">
                  → See how it works
                </p>
              </Link>
            </div>
          </section>

          <div className="font-mono text-xs text-line select-none">
            ────────────────────────────────────────────────────────────
          </div>

          {/* Systems library — the packets */}
          <section id="systems" className="py-20">
            <div data-scene="enter" className="fx-card max-w-3xl">
              <p className="font-mono text-xs tracking-widest text-accent">
                {"// SYSTEMS LIBRARY"}
              </p>
              <h2 className="mt-4 font-mono text-3xl font-bold sm:text-4xl">
                The playbook is free.
                <br />
                The implementation is the product.
              </h2>
              <p className="mt-6 leading-relaxed text-bone-dim">
                Every system below runs in my own work today. Each one ships
                as a knowledge packet — the full method, written down, free —
                because knowing how it works and having it running on your
                data are different products. When you want it running, that
                part is for sale.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {PACKETS.map((p, i) => (
                <div
                  key={p.slug}
                  data-scene="enter"
                  style={ray(p.color)}
                  className="fx-card flex flex-col border border-line bg-panel-2 p-8 transition-colors hover:border-accent"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-xs tracking-widest text-accent">
                      {String(i + 1).padStart(2, "0")} / {p.slug.toUpperCase()}
                    </p>
                    <span className="border border-accent px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent">
                      PACKET: FREE
                    </span>
                  </div>
                  <h3 className="mt-4 font-mono text-xl font-bold">{p.name}</h3>
                  <p className="mt-3 grow leading-relaxed text-bone-dim">
                    {p.what}
                  </p>
                  <p className="mt-5 font-mono text-[11px] tracking-wider text-bone-dim">
                    FOR: {p.who}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 font-mono text-sm text-accent transition-transform duration-200 hover:translate-x-1"
                  >
                    → Get the implementation
                  </a>
                </div>
              ))}
              <div
                data-scene="enter"
                className="fx-card flex flex-col items-start justify-center border border-dashed border-line p-8"
              >
                <p className="font-mono text-xs tracking-widest text-bone-dim">
                  ++ / MORE IN THE DRAWER
                </p>
                <p className="mt-4 leading-relaxed text-bone-dim">
                  Reconciliation pipelines, ops analytics, agent-run
                  onboarding flows — packets drop as they&apos;re written up.
                  Tell me your bottleneck and I&apos;ll tell you which system
                  fits.
                </p>
                <a
                  href="#contact"
                  className="mt-5 font-mono text-sm text-accent transition-transform duration-200 hover:translate-x-1"
                >
                  → Describe your bottleneck
                </a>
              </div>
            </div>
          </section>

          <div className="font-mono text-xs text-line select-none">
            ────────────────────────────────────────────────────────────
          </div>

          {/* Credential */}
          <section className="py-20">
            <blockquote data-scene="enter" className="fx-card max-w-3xl">
              <p className="font-mono text-2xl leading-snug font-bold sm:text-3xl">
                &ldquo;I sat on the side that builds aggregator payouts. I know
                exactly where the economics leak, because I helped design the
                systems that produce the gap.&rdquo;
              </p>
              <footer className="mt-6 font-mono text-sm text-bone-dim">
                — Asher Anjum · ex-Talabat / Delivery Hero, Head of Product ·
                Dubai
              </footer>
            </blockquote>
          </section>

          {/* Contact */}
          <section id="contact" className="pb-24">
            <div data-scene="enter" className="fx-card border border-line bg-panel p-8 sm:p-12">
              <LeadForm
                lane="umbrella"
                heading="Tell me what's leaking"
                subheading="Name the system you want running — or just describe the bottleneck. I reply within one working day. Paid engagements start with 50% upfront; that part is non-negotiable."
                packets={[
                  "Delivery Margin Recovery",
                  "Review Insights Triage",
                  ...PACKETS.map((p) => p.name),
                  "Not sure — here's my bottleneck",
                ]}
              />
            </div>
          </section>
        </main>

        <footer className="border-t border-line bg-panel">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10 font-mono text-xs text-bone-dim">
            <p>~*~ ashanjum.com · Dubai, UAE ~*~</p>
            <a
              href="mailto:as.asher.anjum@gmail.com"
              className="transition-colors hover:text-accent"
            >
              [ EMAIL ME ]
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
