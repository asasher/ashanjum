import Link from "next/link";

export default function UmbrellaPage() {
  return (
    <div className="min-h-screen bg-ink-deep font-sans text-bone">
      {/* Top marquee-style strip */}
      <div className="overflow-hidden border-b border-green-700/40 bg-green-950 px-4 py-2">
        <p className="truncate text-center font-mono text-xs tracking-wider text-bone-dim">
          ~ AI SYSTEMS FOR DUBAI OPERATORS · BUILT IN 30 DAYS · HANDED OVER ·
          YOU OWN IT ~
        </p>
      </div>

      <header className="mx-auto flex max-w-4xl items-baseline justify-between px-6 pt-10">
        <p className="font-mono text-sm font-semibold tracking-tight">
          ash anjum<span className="animate-caret text-coral">▊</span>
        </p>
        <nav className="flex gap-5 font-mono text-xs text-bone-dim">
          <Link
            href="/delivery-margin-recovery"
            className="transition-colors hover:text-coral"
          >
            [ MARGIN RECOVERY ]
          </Link>
          <Link
            href="/review-insights"
            className="transition-colors hover:text-coral"
          >
            [ REVIEW INSIGHTS ]
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        {/* Hero */}
        <section className="pt-24 pb-20 sm:pt-32">
          <p
            className="mb-6 font-mono text-xs tracking-widest text-mint uppercase"
            style={{ animation: "var(--animate-rise)" }}
          >
            ex-Talabat / Delivery Hero · Head of Product
          </p>
          <h1
            className="font-display max-w-3xl text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl"
            style={{ animation: "var(--animate-rise)", animationDelay: "80ms" }}
          >
            I build AI systems your team{" "}
            <span className="text-coral">owns</span>.
          </h1>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim"
            style={{
              animation: "var(--animate-rise)",
              animationDelay: "160ms",
            }}
          >
            Not decks. Not certificates. Working systems, built on your real
            numbers, handed over with the keys. There&apos;s a gold rush on and
            everyone is selling shovels — I teach you to dig, or I dig and hand
            you the hole.
          </p>
          <div
            className="mt-10 flex flex-wrap gap-4"
            style={{
              animation: "var(--animate-rise)",
              animationDelay: "240ms",
            }}
          >
            <Link
              href="/delivery-margin-recovery"
              className="font-display bg-coral px-7 py-3.5 font-bold text-coral-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              See the current offer →
            </Link>
            <a
              href="#work-with-me"
              className="border border-green-700 px-7 py-3.5 font-mono text-sm text-bone-dim transition-colors hover:border-coral hover:text-bone"
            >
              [ HOW IT WORKS ]
            </a>
          </div>
        </section>

        <div className="font-mono text-xs text-green-700 select-none">
          ────────────────────────────────────────────────────────────
        </div>

        {/* Two tiers */}
        <section id="work-with-me" className="py-20">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Two ways to work with me
          </h2>
          <div className="mt-12 grid gap-px border border-green-700/50 bg-green-700/50 sm:grid-cols-2">
            <div className="reveal bg-green-950 p-8">
              <p className="font-mono text-xs tracking-widest text-mint">
                01 / DONE WITH YOU
              </p>
              <h3 className="font-display mt-4 text-2xl font-bold">
                You learn by building
              </h3>
              <p className="mt-4 leading-relaxed text-bone-dim">
                We build a real AI system for your own business, together. Your
                team learns the tools on a problem that pays for the learning.
                No sandbox exercises, no certificate mill.
              </p>
            </div>
            <div className="reveal bg-green-950 p-8">
              <p className="font-mono text-xs tracking-widest text-mint">
                02 / DONE FOR YOU
              </p>
              <h3 className="font-display mt-4 text-2xl font-bold">
                I build it, you keep it
              </h3>
              <p className="mt-4 leading-relaxed text-bone-dim">
                I audit the workflow, build the system on your data, train your
                team, and hand it over. You own it outright — the optional
                retainer covers optimization, not hostage-keeping.
              </p>
            </div>
          </div>
          <p className="reveal mt-6 font-mono text-xs text-bone-dim">
            {"// The difference from an agency: no black box, no lock-in. The system is yours after I leave."}
          </p>
        </section>

        <div className="font-mono text-xs text-green-700 select-none">
          ────────────────────────────────────────────────────────────
        </div>

        {/* Current offers */}
        <section className="py-20">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            On the bench right now
          </h2>
          <div className="mt-12 grid gap-6">
            <Link
              href="/delivery-margin-recovery"
              className="reveal group block border border-green-700/50 bg-green-900 p-8 transition-colors hover:border-coral"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-bold">
                  Delivery Margin Recovery Sprint
                </h3>
                <span className="font-mono text-xs text-coral">
                  F&amp;B · 30 DAYS · AED 20,000
                </span>
              </div>
              <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
                A live payout-vs-POS reconciliation system for Dubai restaurant
                groups losing AED 15k+/month to aggregator leakage they
                can&apos;t see. Built in 30 days, then it&apos;s yours.
              </p>
              <p className="mt-5 font-mono text-sm text-mint transition-transform duration-200 group-hover:translate-x-1">
                → Book a Profit Audit
              </p>
            </Link>
            <Link
              href="/review-insights"
              className="reveal group block border border-green-700/50 bg-green-900 p-8 transition-colors hover:border-coral"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-bold">
                  Review Insights Triage
                </h3>
                <span className="font-mono text-xs text-coral">
                  MULTI-BRAND F&amp;B · 30 DAYS
                </span>
              </div>
              <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
                Your reviews already say which brand is bleeding and why —
                nobody has time to read hundreds of them. A triage system that
                ranks the damage and hands your ops team the fix.
              </p>
              <p className="mt-5 font-mono text-sm text-mint transition-transform duration-200 group-hover:translate-x-1">
                → See how it works
              </p>
            </Link>
          </div>
        </section>

        <div className="font-mono text-xs text-green-700 select-none">
          ────────────────────────────────────────────────────────────
        </div>

        {/* Credential */}
        <section className="py-20">
          <blockquote className="reveal max-w-3xl">
            <p className="font-display text-2xl leading-snug font-bold sm:text-3xl">
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
      </main>

      <footer className="border-t border-green-700/40 bg-green-950">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-10 font-mono text-xs text-bone-dim">
          <p>~*~ ashanjum.com · Dubai, UAE ~*~</p>
          <a
            href="mailto:as.asher.anjum@gmail.com"
            className="transition-colors hover:text-coral"
          >
            [ EMAIL ME ]
          </a>
        </div>
      </footer>
    </div>
  );
}
