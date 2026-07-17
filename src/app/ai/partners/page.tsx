import { type Metadata } from "next";
import Link from "next/link";

import { AiFooter, AiHeader, Eyebrow } from "../ui";

/* The partner trigger sheet — for accountants, consultants, and vendors
   who already serve operations businesses. Unlisted: not linked from the
   main page, noindex. Shared person-to-person; prints to one page. */

export const metadata: Metadata = {
  title: "Partner sheet — five things your clients say",
  description:
    "For advisers and vendors serving Dubai operations businesses: five observable bottlenecks worth an introduction, and exactly how the handoff works.",
  robots: { index: false, follow: false },
};

const TRIGGERS = [
  {
    n: "01",
    hear: "“I honestly couldn't tell you what we make on a single order.”",
    means:
      "Revenue is visible, margin is folklore. Vendor invoices never meet the sales data; channel fees go unchecked.",
    build:
      "True unit economics — per-order/per-job margin, reconciled and queryable.",
  },
  {
    n: "02",
    hear: "“Finance spends the first week of the month retyping statements.”",
    means:
      "Platform payouts, bank deposits, and invoices are reconciled by hand — or not at all.",
    build:
      "Owner's P&L — earned vs. received vs. unexplained, one running page.",
  },
  {
    n: "03",
    hear: "“We know the reviews are bad, we just can't keep up with them.”",
    means:
      "Complaints scattered across apps and branches, answered late or never; the ops meeting argues about anecdotes.",
    build:
      "Customer-feedback triage — tagged, ranked, reply drafted, across every brand and branch.",
  },
  {
    n: "04",
    hear: "“The lead messaged on WhatsApp Tuesday. We replied Thursday.”",
    means:
      "Sales live in chat threads with no pipeline view and no clock on the first response.",
    build:
      "WhatsApp sales pipeline — every lead on one screen, first reply timed in minutes.",
  },
  {
    n: "05",
    hear: "“Only Imran knows how to get that number out of the system.”",
    means:
      "The answers exist inside an aging ERP or inventory system nobody can query — and one person is the API.",
    build: "Ask your legacy system — plain-English questions, no migration.",
  },
] as const;

export default function PartnersPage() {
  return (
    <div className="v7 min-h-screen">
      <AiHeader sub nav={[["The session", "/ai/session"]]} />

      <main className="mx-auto max-w-6xl px-6">
        {/* ---------- hero ---------- */}
        <section className="py-16 md:py-20">
          <Eyebrow>
            <span className="text-azure-text">●</span> For partners — not a
            public page
          </Eyebrow>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-balance">
            Five things your clients say that are worth an introduction.
          </h1>
          <p className="text-ink-2 mt-6 max-w-xl text-[17px] leading-relaxed">
            You advise or supply operations businesses — accounting, POS,
            consulting, distribution. You hear these sentences before I ever
            could. When one lands, I&apos;m the person to hand it to, and you
            stay the primary adviser.
          </p>
        </section>

        {/* ---------- triggers ---------- */}
        <section className="border-rule border-t py-12 md:py-16">
          <Eyebrow>01 — The five triggers</Eyebrow>
          <div className="border-rule mt-8 border-t">
            {TRIGGERS.map((t) => (
              <div
                key={t.n}
                className="border-rule grid gap-3 border-b py-6 md:grid-cols-12 md:gap-6"
              >
                <p className="text-ink-4 font-mono text-[12px] md:col-span-1">
                  {t.n}
                </p>
                <div className="md:col-span-5">
                  <h2 className="text-[16px] font-medium tracking-[-0.01em]">
                    {t.hear}
                  </h2>
                </div>
                <div className="md:col-span-6">
                  <p className="text-ink-2 text-[14px] leading-relaxed">
                    {t.means}
                  </p>
                  <p className="text-azure-text mt-2 font-mono text-[11px] leading-relaxed">
                    → {t.build}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- the handoff ---------- */}
        <section className="border-rule border-t py-12 md:py-16">
          <Eyebrow>02 — How the handoff works</Eyebrow>
          <div className="border-rule bg-rule mt-8 grid gap-px overflow-hidden border md:grid-cols-3">
            {[
              [
                "You make the intro",
                "One WhatsApp message or a three-way coffee. You stay the primary adviser throughout — I build systems; I don't take clients' accounting, consulting, or vendor relationships.",
              ],
              [
                "I run the session",
                "A free 20-minute fit call, then a paid 90-minute working session where I build the fix live. Your client leaves with a working proof and a written go/no-go — even if nothing gets commissioned.",
              ],
              [
                "The boundary, in writing",
                "No poaching, ever. Client data stays the client's; I work on sanitized samples until an engagement is signed. Any referral arrangement is agreed with you up front, in writing.",
              ],
            ].map(([head, body]) => (
              <div key={head} className="bg-card p-7">
                <h2 className="text-azure-text font-mono text-[12px] tracking-[0.08em] uppercase">
                  {head}
                </h2>
                <p className="text-ink-2 mt-3 text-[14px] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section className="border-rule border-t py-12 md:py-20">
          <Eyebrow>03 — Point them here</Eyebrow>
          <div className="text-ink-2 mt-6 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
            <p>
              The session, its price, and what your client walks away with:{" "}
              <Link
                href="/ai/session"
                className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
              >
                the working session
              </Link>
              . The flagship build, if they want proof first:{" "}
              <Link
                href="/ai/work/cloud-kitchen"
                className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
              >
                31 brands, one honest P&amp;L
              </Link>
              .
            </p>
            <p>
              Or just send me the sentence you heard, verbatim —{" "}
              <a
                href="mailto:as.asher.anjum@gmail.com"
                className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
              >
                as.asher.anjum@gmail.com
              </a>
              . I&apos;ll tell you honestly whether it&apos;s worth your
              client&apos;s ninety minutes.
            </p>
          </div>
        </section>
      </main>

      <AiFooter />
    </div>
  );
}
