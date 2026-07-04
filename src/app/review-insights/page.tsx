import { type Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "~/components/LeadForm";

export const metadata: Metadata = {
  title: "Review Insights Triage",
  description:
    "Your reviews already say which brand is bleeding and why. A triage system for multi-brand Dubai F&B operators that ranks the damage and hands your ops team the fix. Built in 30 days. You own it.",
};

const triageRows = [
  {
    brand: "Brand 07 · burgers",
    attention: "31",
    issue: "Missing / wrong item",
    trend: "▲ worsening",
    kind: "leak" as const,
  },
  {
    brand: "Brand 12 · korean",
    attention: "24",
    issue: "Portion vs photo",
    trend: "▲ worsening",
    kind: "leak" as const,
  },
  {
    brand: "Brand 03 · poke",
    attention: "9",
    issue: "Packaging / spillage",
    trend: "— flat",
    kind: "mid" as const,
  },
  {
    brand: "Brand 19 · breakfast",
    attention: "3",
    issue: "—",
    trend: "▼ recovering",
    kind: "ok" as const,
  },
];

const problems = [
  {
    figure: "100s",
    unit: "of under-4★ reviews, unread",
    title: "The evidence is sitting in five portals",
    body: "Talabat, Deliveroo, Noon, Careem, Keeta — every one of them holds reviews naming the exact dish, the exact venue, the exact problem. Nobody has time to read them, so the same mistake ships every day.",
  },
  {
    figure: "1★",
    unit: "reviews cost you the algorithm",
    title: "Ratings decide your ranking and your sales",
    body: "Aggregator search buries falling brands. A quality problem you can't see becomes a revenue problem you can measure — three weeks later.",
  },
  {
    figure: "26",
    unit: "brands triaged in one live build",
    title: "This isn't a concept",
    body: "I built this system for a Dubai cloud-kitchen group running 26 virtual brands: portfolio-wide triage, one attention score, issue playbooks per brand. This offer productizes that build.",
  },
];

const weeks = [
  {
    n: "1",
    label: "Week 1",
    title: "Connect and backfill",
    body: "I wire up review feeds for your brands across your aggregators and backfill the recent history, so the first triage runs on real evidence, not a sample.",
  },
  {
    n: "2",
    label: "Week 2–3",
    title: "Build the triage dashboard and playbooks",
    body: "One ranking metric — attention, weighted by 1-star volume — across every brand. Drill from portfolio to brand to issue to the individual order. AI-drafted issue playbooks (pack-out, portion standards, packaging, QA) that your ops leads approve and assign.",
  },
  {
    n: "3",
    label: "Week 4",
    title: "Hand over and train",
    body: "Your ops team runs the weekly triage themselves: open the dashboard, know the worst brand and issue in five seconds, leave with a fix per issue. SOPs and training included.",
  },
  {
    n: "✓",
    label: "Day 60",
    title: "The before/after memo",
    body: "One page: attention scores by brand, issues closed, rating trend by brand since go-live. The number moved or it didn't, and you'll see which.",
  },
];

const faqs = [
  {
    q: "Is this reputation management?",
    a: "No. I don't post replies, buy reviews, or massage ratings. This is an operations tool: it turns the reviews you already have into a ranked list of kitchen and pack-out problems, with evidence, so your team fixes the cause.",
  },
  {
    q: "We already look at our ratings. What's different?",
    a: "A rating tells you a brand slipped. It doesn't tell you that one venue keeps missing add-ons on one dish after 10pm. The triage reads every under-4★ review, groups the causes, and ranks where an hour of ops attention recovers the most rating.",
  },
  {
    q: "Does it work with virtual brands?",
    a: "It was built for them. The live build behind this offer covered 26 virtual brands on one portfolio dashboard. Multi-brand is the point: that's where reading reviews by hand stops scaling.",
  },
  {
    q: "Who owns the system?",
    a: "You do, after handover. Same terms as everything I build: no black box, no lock-in, an optional retainer for optimization only.",
  },
];

export default function ReviewInsightsPage() {
  return (
    <div className="lane-violet min-h-screen bg-panel font-body text-bone">
      <header className="mx-auto flex max-w-6xl items-baseline justify-between px-6 pt-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-bone-dim transition-colors hover:text-bone"
        >
          ← ash anjum
        </Link>
        <p className="font-mono text-xs tracking-widest text-accent-2 uppercase">
          Review Insights
        </p>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p
              className="font-mono text-xs tracking-widest text-accent-2 uppercase"
              style={{ animation: "var(--animate-rise)" }}
            >
              Review triage, done for you · for multi-brand delivery operators
            </p>
            <h1
              className="font-display mt-6 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
              style={{
                animation: "var(--animate-rise)",
                animationDelay: "80ms",
              }}
            >
              Your reviews already say{" "}
              <span className="text-accent">which brand is bleeding</span>. Read
              them in five seconds.
            </h1>
            <p
              className="mt-7 max-w-xl text-lg leading-relaxed text-bone-dim"
              style={{
                animation: "var(--animate-rise)",
                animationDelay: "160ms",
              }}
            >
              Hundreds of under-4★ reviews across five aggregators name the
              dish, the venue, and the mistake. I build your group a{" "}
              <strong className="text-bone">review-insights triage system</strong>{" "}
              in 30 days — one dashboard, one attention score, a fix per issue
              — then hand it over. You own it.
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
                className="font-display bg-accent px-8 py-4 text-lg font-bold text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book a Review Audit →
              </a>
              <a
                href="#sprint"
                className="font-mono text-sm text-bone-dim underline decoration-line underline-offset-4 transition-colors hover:text-bone"
              >
                See how the 30 days work
              </a>
            </div>
          </div>

          {/* Triage board */}
          <div
            className="border border-line bg-panel-2/70 shadow-2xl"
            style={{ animation: "var(--animate-rise)", animationDelay: "200ms" }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="font-mono text-xs text-bone-dim">
                Portfolio triage · this week · all aggregators
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-2" /> SYNCED
              </span>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-[1.4fr_0.6fr_1.1fr_0.9fr] gap-2 border-b border-line/60 pb-2 font-mono text-[10px] tracking-wider text-bone-dim uppercase">
                <span>Brand</span>
                <span className="text-right">Attn</span>
                <span>Top issue</span>
                <span className="text-right">Trend</span>
              </div>
              {triageRows.map((row, i) => (
                <div
                  key={row.brand}
                  className="grid grid-cols-[1.4fr_0.6fr_1.1fr_0.9fr] items-center gap-2 border-b border-line/30 py-3 font-mono text-xs tabular-nums"
                  style={{
                    animation: "var(--animate-deal)",
                    animationDelay: `${400 + i * 140}ms`,
                  }}
                >
                  <span className="text-bone">{row.brand}</span>
                  <span
                    className={`text-right font-bold ${
                      row.kind === "leak"
                        ? "text-accent"
                        : row.kind === "mid"
                          ? "text-bone"
                          : "text-accent-2"
                    }`}
                  >
                    {row.attention}
                  </span>
                  <span className="text-bone-dim">{row.issue}</span>
                  <span
                    className={`text-right text-[10px] ${
                      row.kind === "leak" ? "text-accent" : "text-accent-2"
                    }`}
                  >
                    {row.trend}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-bone-dim">
                  Worst issue this week:{" "}
                  <span className="font-bold text-accent">
                    missing / wrong item
                  </span>
                </p>
                <p className="font-mono text-[10px] text-accent-2">
                  ⤷ Open playbook
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="bg-panel-2">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="reveal font-mono text-xs tracking-widest text-accent-2 uppercase">
              What the reviews are worth
            </p>
            <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
              The cheapest ops consultant you have is already writing to you.
            </h2>
            <div className="mt-16 space-y-14">
              {problems.map((p, i) => (
                <div
                  key={p.title}
                  className={`reveal max-w-3xl ${i === 1 ? "sm:ml-24" : i === 2 ? "sm:ml-48" : ""}`}
                >
                  <p className="font-display text-6xl font-extrabold tracking-tight text-accent sm:text-7xl">
                    {p.figure}
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-wider text-bone-dim uppercase">
                    {p.unit}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-bold">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-bone-dim">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sprint */}
        <section id="sprint" className="mx-auto max-w-6xl px-6 py-24">
          <p className="reveal font-mono text-xs tracking-widest text-accent-2 uppercase">
            The 30-day build
          </p>
          <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
            From unread reviews to a weekly ops ritual.
          </h2>
          <ol className="mt-16 max-w-3xl">
            {weeks.map((week, i) => (
              <li
                key={week.label}
                className="reveal relative grid gap-4 border-l-2 border-line pb-12 pl-10 last:pb-0 sm:grid-cols-[7rem_1fr]"
              >
                <span
                  aria-hidden
                  className={`font-display absolute top-0 -left-5 flex h-10 w-10 items-center justify-center text-lg font-bold ${
                    i === weeks.length - 1
                      ? "bg-accent-2 text-panel"
                      : "bg-accent text-accent-ink"
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

        {/* Price */}
        <section className="bg-panel-2">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="reveal font-mono text-xs tracking-widest text-accent-2 uppercase">
              What it costs, in full
            </p>
            <h2 className="reveal font-display mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
              Fixed price. Smaller build, same terms.
            </h2>
            <div className="reveal mt-14 flex max-w-3xl flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p className="font-display text-6xl font-extrabold tracking-tight text-accent">
                  AED 12,000
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-bone-dim uppercase">
                  fixed build, one time
                </p>
              </div>
              <p className="font-display pb-4 text-3xl text-bone-dim">+</p>
              <div>
                <p className="font-display text-5xl font-extrabold tracking-tight">
                  AED 4,000<span className="text-2xl text-bone-dim">/mo</span>
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-bone-dim uppercase">
                  retainer, 3-month minimum
                </p>
              </div>
            </div>
            <ul className="reveal mt-10 max-w-2xl space-y-3 text-bone-dim">
              <li className="flex gap-3">
                <span className="text-accent-2">✓</span>
                <span>
                  <strong className="text-bone">
                    50% upfront, 50% at go-live.
                  </strong>{" "}
                  You pay the second half when the triage runs on your real
                  reviews.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-2">✓</span> The retainer covers new
                brands, new aggregators, and playbook tuning as your portfolio
                moves.
              </li>
              <li className="flex gap-3">
                <span className="text-accent-2">✓</span> Fixed scope, fixed price.
                Never billed by the hour.
              </li>
            </ul>
            <p className="reveal mt-8 max-w-2xl font-mono text-sm text-bone-dim">
              Running the margin-recovery sprint too? The two systems share
              the same data plumbing — ask about the combined build on the
              call.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="reveal font-mono text-xs tracking-widest text-accent-2 uppercase">
            Straight answers before you book
          </p>
          <h2 className="reveal font-display mt-4 text-4xl font-bold sm:text-5xl">
            The questions operators actually ask.
          </h2>
          <div className="mt-12 max-w-3xl divide-y divide-line/60">
            {faqs.map((faq) => (
              <details key={faq.q} className="reveal group py-5">
                <summary className="font-display flex cursor-pointer list-none items-baseline justify-between gap-4 text-xl font-bold">
                  {faq.q}
                  <span className="font-mono text-accent transition-transform duration-200 group-open:rotate-45">
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

        {/* CTA + form */}
        <section id="audit" className="bg-panel-2">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="reveal font-display text-4xl leading-tight font-extrabold sm:text-5xl">
                Find out what your reviews have been telling you.
              </h2>
              <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-bone-dim">
                One short call. I run a first-pass triage on a sample of your
                real reviews before it. Either there&apos;s a fixable pattern
                and we scope the build, or there isn&apos;t and I say so.
              </p>
              <p className="reveal mt-8 font-mono text-xs text-bone-dim">
                {"// Built once already, for 26 brands. This call decides whether it's worth building for yours."}
              </p>
            </div>
            <div className="reveal">
              <LeadForm
                lane="review-insights"
                heading="Book a Review Audit"
                subheading="Tell me where to reach you. I reply within one working day with times for the call."
                askVenues
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line/40 bg-panel-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-bone-dim">
          <Link href="/" className="transition-colors hover:text-bone">
            ← ashanjum.com
          </Link>
          <p>Review Insights Triage · Dubai, UAE</p>
        </div>
      </footer>
    </div>
  );
}
