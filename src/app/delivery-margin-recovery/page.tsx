import { type Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "~/components/LeadForm";

export const metadata: Metadata = {
  title: "Delivery Margin Recovery Sprint",
  description:
    "Stop losing money on delivery you can't see. A live AI payout-vs-POS reconciliation system for Dubai F&B groups, built in 30 days by the ex-Talabat Head of Product. You own it.",
};

const ledgerRows = [
  {
    batch: "#TB-4471",
    detail: "312 orders",
    pos: "38,910",
    paid: "38,910",
    status: "Matched",
    kind: "ok" as const,
  },
  {
    batch: "#TB-4472",
    detail: "commission over-charge",
    pos: "41,205",
    paid: "37,640",
    status: "Short −3,565",
    kind: "leak" as const,
  },
  {
    batch: "#TB-4473",
    detail: "promo funded by you",
    pos: "12,480",
    paid: "10,900",
    status: "Promo gap",
    kind: "leak" as const,
  },
  {
    batch: "#TB-4474",
    detail: "284 orders",
    pos: "29,330",
    paid: "29,330",
    status: "Matched",
    kind: "ok" as const,
  },
];

const leaks = [
  {
    figure: "AED 15k+",
    unit: "recoverable, lost every month",
    title: "Payouts that don't match the till",
    body: "Short-paid batches and missing orders the aggregator never flags. Real money, invisible unless you reconcile line by line.",
  },
  {
    figure: "10–12",
    unit: "hours a week, on spreadsheets",
    title: "Manual checking that still misses it",
    body: "Someone on your team exports four portals into Excel, eyeballs the totals, and still can't prove what's owed. The disputes never get filed.",
  },
  {
    figure: "25–35%",
    unit: "commission, plus the disputes",
    title: "Promos and refunds you funded",
    body: "Refunds you didn't approve, promos charged to your P&L, fees that crept up. Each one small. Together, the difference between margin and none.",
  },
];

const weeks = [
  {
    n: "1",
    label: "Week 1",
    title: "Map and ingest",
    body: "I map your current reconciliation workflow, then wire up POS and aggregator exports for your top one or two channels. Real data, your numbers.",
  },
  {
    n: "2",
    label: "Week 2–3",
    title: "Build the dashboard and the dispute copilot",
    body: "The exception dashboard flags payout mismatches, missing and short-paid orders, promo and refund gaps every week. Then a human-approved AI workflow drafts the aggregator dispute pack for each flagged exception, so nothing goes out unchecked.",
  },
  {
    n: "3",
    label: "Week 4",
    title: "Hand over and train",
    body: "Bilingual EN/AR SOPs and two training sessions on your real data. Your team owns and runs the system, with me as the backstop rather than the dependency.",
  },
  {
    n: "✓",
    label: "Day 60",
    title: "The ROI memo lands",
    body: "One page: dirhams recovered and hours saved, measured against your real P&L. By now the system has paid for itself, or I have told you plainly that it did not.",
  },
];

const deliverables = [
  {
    title: "Exception dashboard",
    body: "Payout mismatches, missing and short-paid orders, promo and refund gaps. Flagged weekly, in plain dirhams.",
  },
  {
    title: "AI dispute copilot",
    body: "Drafts aggregator dispute packs for every flagged exception. Always human-approved before anything is sent.",
  },
  {
    title: "Bilingual EN / AR SOPs",
    body: "So your team runs it without me.",
    arabic: "دليل عربي وإنجليزي حتى يدير فريقك النظام بنفسه.",
  },
  {
    title: "Two training sessions + 60 days support",
    body: "Your team learns the workflow on your real data, then has me on call while it beds in.",
  },
  {
    title: "Day-60 ROI memo",
    body: "One page: dirhams recovered and hours saved, measured against your real P&L. The number is either there or it isn't.",
  },
  {
    title: "Full ownership",
    body: "Yours after I leave. No lock-in, no per-seat fee, nothing to renew but the optional retainer.",
  },
];

const faqs = [
  {
    q: "Do you touch my pricing or my suppliers?",
    a: "No. This is reconciliation only. I check what the aggregators paid you against what your POS says they owed, and I help you claim the gap. Your menu prices, your supplier deals, your operations stay exactly as they are. I never sit between you and your money.",
  },
  {
    q: "What if the leakage isn't there?",
    a: "Then I tell you on the audit call, and you have lost about half an hour. I would rather lose a sale than build a system that recovers nothing. The audit tests the leakage story on your real numbers first, before anyone signs anything.",
  },
  {
    q: "Does my team need to be technical?",
    a: "No. The system lands with bilingual SOPs and two training sessions on your own data. If your team can run the weekly aggregator exports today, they can run this.",
  },
  {
    q: "Why not just hire someone to do this?",
    a: "A full-time reconciliation hire costs more per month than this system does one time, and they leave with the knowledge. The system stays, and the retainer is optional.",
  },
];

export default function DeliveryMarginRecoveryPage() {
  return (
    <div className="min-h-screen bg-green-900 font-body text-bone">
      <header className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pt-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-bone-dim transition-colors hover:text-bone"
        >
          ← ash anjum
        </Link>
        <p className="font-mono text-xs tracking-widest text-mint uppercase">
          Margin Recovery
        </p>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p
              className="font-mono text-xs tracking-widest text-mint uppercase"
              style={{ animation: "var(--animate-rise)" }}
            >
              Delivery reconciliation, done for you · built by the ex-Talabat
              Head of Product
            </p>
            <h1
              className="font-display mt-6 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
              style={{
                animation: "var(--animate-rise)",
                animationDelay: "80ms",
              }}
            >
              You&apos;re losing{" "}
              <span className="text-coral">AED&nbsp;15k+</span> a month on
              delivery you can&apos;t see.
            </h1>
            <p
              className="mt-7 max-w-xl text-lg leading-relaxed text-bone-dim"
              style={{
                animation: "var(--animate-rise)",
                animationDelay: "160ms",
              }}
            >
              A 25–35% commission stack, short-paid orders, refused refunds. I
              build your group a live AI{" "}
              <strong className="text-bone">
                payout-vs-POS reconciliation system
              </strong>{" "}
              in 30 days, then hand it over. You own it. Not a certificate.
            </p>
            <div
              className="mt-9 flex flex-wrap items-center gap-5"
              style={{
                animation: "var(--animate-rise)",
                animationDelay: "240ms",
              }}
            >
              <a
                href="#audit"
                className="font-display bg-coral px-8 py-4 text-lg font-bold text-coral-ink transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book a Profit Audit →
              </a>
              <a
                href="#sprint"
                className="font-mono text-sm text-bone-dim underline decoration-green-700 underline-offset-4 transition-colors hover:text-bone"
              >
                See how the 30 days work
              </a>
            </div>
            <p
              className="mt-6 max-w-xl text-sm text-bone-dim"
              style={{
                animation: "var(--animate-rise)",
                animationDelay: "300ms",
              }}
            >
              A Profit Audit is a short call where I test the leakage story on
              your real numbers, no deck involved. For Dubai F&amp;B groups
              doing AED&nbsp;250k+/mo on delivery.
            </p>
          </div>

          {/* Exception ledger */}
          <div
            className="border border-green-700 bg-green-950/70 shadow-2xl"
            style={{ animation: "var(--animate-rise)", animationDelay: "200ms" }}
          >
            <div className="flex items-center justify-between border-b border-green-700 px-5 py-3">
              <p className="font-mono text-xs text-bone-dim">
                Exception dashboard · Talabat payout · week of 16 Jun
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" /> LIVE
              </span>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-[1.3fr_0.7fr_0.7fr_1fr] gap-2 border-b border-green-700/60 pb-2 font-mono text-[10px] tracking-wider text-bone-dim uppercase">
                <span>Order batch</span>
                <span className="text-right">POS</span>
                <span className="text-right">Paid out</span>
                <span className="text-right">Status</span>
              </div>
              {ledgerRows.map((row, i) => (
                <div
                  key={row.batch}
                  className="grid grid-cols-[1.3fr_0.7fr_0.7fr_1fr] items-center gap-2 border-b border-green-700/30 py-3 font-mono text-xs tabular-nums"
                  style={{
                    animation: "var(--animate-deal)",
                    animationDelay: `${400 + i * 140}ms`,
                  }}
                >
                  <span>
                    <span className="text-bone">{row.batch}</span>
                    <span className="mt-0.5 block text-[10px] text-bone-dim">
                      {row.detail}
                    </span>
                  </span>
                  <span className="text-right text-bone-dim">{row.pos}</span>
                  <span className="text-right text-bone-dim">{row.paid}</span>
                  <span
                    className={
                      row.kind === "leak"
                        ? "animate-flag justify-self-end bg-coral px-2 py-0.5 text-[10px] font-bold text-coral-ink"
                        : "justify-self-end text-[10px] text-mint"
                    }
                  >
                    {row.status}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-bone-dim">
                  Flagged this week:{" "}
                  <span className="font-bold text-coral">AED 5,145</span>{" "}
                  recoverable
                </p>
                <p className="font-mono text-[10px] text-mint">
                  ⤷ Draft dispute pack
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Where the money goes */}
        <section className="bg-green-950">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="reveal font-mono text-xs tracking-widest text-mint uppercase">
              Where the money actually goes
            </p>
            <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
              You feel the leak every month. You can&apos;t pinpoint it.
            </h2>
            <p className="reveal mt-5 max-w-2xl text-lg text-bone-dim">
              It isn&apos;t one number. It&apos;s three quiet ones stacking up
              across four aggregators, every single week, faster than a
              spreadsheet can keep up.
            </p>
            <div className="mt-16 space-y-14">
              {leaks.map((leak, i) => (
                <div
                  key={leak.title}
                  className={`reveal max-w-3xl ${i === 1 ? "sm:ml-24" : i === 2 ? "sm:ml-48" : ""}`}
                >
                  <p className="font-display text-6xl font-extrabold tracking-tight text-coral sm:text-7xl">
                    {leak.figure}
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-wider text-bone-dim uppercase">
                    {leak.unit}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-bold">
                    {leak.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-bone-dim">
                    {leak.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The 30-day sprint */}
        <section id="sprint" className="mx-auto max-w-6xl px-6 py-24">
          <p className="reveal font-mono text-xs tracking-widest text-mint uppercase">
            The 30-day sprint
          </p>
          <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
            A working system in four weeks. Then it&apos;s yours.
          </h2>
          <p className="reveal mt-5 max-w-2xl text-lg text-bone-dim">
            This is a genuine sequence, not a menu. Each week builds on the
            last toward a system your team runs without me — then 60 days of
            support while they take it over.
          </p>
          <ol className="mt-16 max-w-3xl space-y-0">
            {weeks.map((week, i) => (
              <li
                key={week.label}
                className="reveal relative grid gap-4 border-l-2 border-green-700 pb-12 pl-10 last:pb-0 sm:grid-cols-[7rem_1fr]"
              >
                <span
                  aria-hidden
                  className={`font-display absolute top-0 -left-5 flex h-10 w-10 items-center justify-center text-lg font-bold ${
                    i === weeks.length - 1
                      ? "bg-mint text-green-950"
                      : "bg-coral text-coral-ink"
                  }`}
                >
                  {week.n}
                </span>
                <p className="pt-1.5 font-mono text-xs tracking-wider text-bone-dim uppercase">
                  {week.label}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {week.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-bone-dim">
                    {week.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Deliverables */}
        <section className="bg-green-800/60">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="reveal font-mono text-xs tracking-widest text-mint uppercase">
              What you actually own at day 30
            </p>
            <h2 className="reveal font-display mt-4 text-4xl font-bold sm:text-5xl">
              A working system you keep.
            </h2>
            <dl className="mt-14 max-w-3xl divide-y divide-green-700/60">
              {deliverables.map((d) => (
                <div key={d.title} className="reveal grid gap-2 py-6 sm:grid-cols-[minmax(14rem,0.9fr)_1.6fr] sm:gap-8">
                  <dt className="font-display flex gap-3 text-xl font-bold">
                    <span className="text-mint">✓</span> {d.title}
                  </dt>
                  <dd className="leading-relaxed text-bone-dim">
                    {"arabic" in d && d.arabic ? (
                      <>
                        <span
                          dir="rtl"
                          lang="ar"
                          className="font-arabic block text-bone"
                        >
                          {d.arabic}
                        </span>
                        <span className="mt-1 block">{d.body}</span>
                      </>
                    ) : (
                      d.body
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Credential */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="reveal font-mono text-xs tracking-widest text-mint uppercase">
            Why me, and not an agency
          </p>
          <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
            The one credential a competitor can&apos;t copy.
          </h2>
          <blockquote className="reveal mt-10 max-w-3xl border-l-4 border-coral pl-6">
            <p className="font-display text-2xl leading-snug font-bold sm:text-3xl">
              &ldquo;I sat on the side that builds aggregator payouts. I know
              exactly where the economics leak, because I helped design the
              systems that produce the gap.&rdquo;
            </p>
            <footer className="mt-4 font-mono text-sm text-bone-dim">
              — Asher · ex-Talabat / Delivery Hero, Head of Product
            </footer>
          </blockquote>
          <div className="mt-14 grid max-w-4xl gap-10 sm:grid-cols-3">
            <div className="reveal">
              <h3 className="font-display text-xl font-bold">
                I built the other side of this
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                Years inside the aggregator running product. Commission logic,
                payout timing, refund flows. I&apos;m not guessing how the gap
                forms.
              </p>
            </div>
            <div className="reveal">
              <h3 className="font-display text-xl font-bold">
                Done for you, start to finish
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                I build the system on your data and hand it over, so you
                don&apos;t learn software or hire a team. You get a working
                tool instead of a course.
              </p>
            </div>
            <div className="reveal">
              <h3 className="font-display text-xl font-bold">
                Numbers or nothing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                If the Profit Audit can&apos;t find a defensible leak on your
                real figures, I&apos;ll tell you on the call. No build, no
                retainer.
              </p>
            </div>
          </div>
        </section>

        {/* Price */}
        <section className="bg-green-950">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="reveal font-mono text-xs tracking-widest text-mint uppercase">
              What it costs, in full
            </p>
            <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
              Fixed price. Pays for itself in six to eight weeks.
            </h2>
            <div className="reveal mt-14 flex max-w-3xl flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p className="font-display text-6xl font-extrabold tracking-tight text-coral">
                  AED 20,000
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-bone-dim uppercase">
                  fixed build, one time
                </p>
              </div>
              <p className="font-display pb-4 text-3xl text-bone-dim">+</p>
              <div>
                <p className="font-display text-5xl font-extrabold tracking-tight">
                  AED 6,000<span className="text-2xl text-bone-dim">/mo</span>
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-bone-dim uppercase">
                  retainer, 3-month minimum
                </p>
              </div>
            </div>
            <ul className="reveal mt-10 max-w-2xl space-y-3 text-bone-dim">
              <li className="flex gap-3">
                <span className="text-mint">✓</span>
                <span>
                  <strong className="text-bone">
                    50% upfront, 50% at go-live.
                  </strong>{" "}
                  You pay the second half when the system is live on your data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-mint">✓</span> The retainer covers
                optimization and support as new edge cases surface across your
                channels.
              </li>
              <li className="flex gap-3">
                <span className="text-mint">✓</span> Fixed scope, fixed price.
                Never billed by the hour. You know the number before we start.
              </li>
            </ul>
            <div className="reveal mt-12 max-w-2xl border border-coral/50 bg-green-900 p-8">
              <p className="font-mono text-xs tracking-widest text-coral uppercase">
                Founding clients · first 1–2 only
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold">
                Lock AED 6k/mo for six months
              </h3>
              <p className="mt-3 leading-relaxed text-bone-dim">
                The first one or two groups lock the{" "}
                <strong className="text-bone">
                  AED 6,000/mo rate for six months
                </strong>{" "}
                for a named case study once your ROI number is in. After that,
                the retainer rises for later clients. No countdown, no
                pressure. When the two seats are taken, they&apos;re taken.
              </p>
            </div>
            <p className="reveal mt-8 font-mono text-sm text-bone-dim">
              Typical payback: ~6–8 weeks of recovered leakage clears the
              build.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="reveal font-mono text-xs tracking-widest text-mint uppercase">
            Straight answers before you book
          </p>
          <h2 className="reveal font-display mt-4 text-4xl font-bold sm:text-5xl">
            The questions operators actually ask.
          </h2>
          <div className="mt-12 max-w-3xl divide-y divide-green-700/60">
            {faqs.map((faq) => (
              <details key={faq.q} className="reveal group py-5">
                <summary className="font-display flex cursor-pointer list-none items-baseline justify-between gap-4 text-xl font-bold">
                  {faq.q}
                  <span className="font-mono text-coral transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA + form */}
        <section id="audit" className="bg-green-950">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="reveal font-display text-4xl leading-tight font-extrabold sm:text-5xl">
                Find out what delivery is really costing you.
              </h2>
              <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-bone-dim">
                One short call. Your payout reports and your POS totals, side
                by side. Either the leak is there and we scope the sprint, or
                it isn&apos;t and I say so.
              </p>
              <p className="reveal mt-8 font-mono text-xs text-bone-dim">
                {"// No retainer pitch. No follow-up sequence. One honest look at the numbers."}
              </p>
            </div>
            <div className="reveal">
              <LeadForm
                lane="delivery-margin-recovery"
                heading="Book a Profit Audit"
                subheading="Tell me where to reach you. I reply within one working day with times for the call."
                askVenues
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-green-700/40 bg-green-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-bone-dim">
          <Link href="/" className="transition-colors hover:text-bone">
            ← ashanjum.com
          </Link>
          <p>Delivery Margin Recovery Sprint · Dubai, UAE</p>
        </div>
      </footer>
    </div>
  );
}
