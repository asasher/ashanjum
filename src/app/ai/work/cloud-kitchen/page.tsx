import { type Metadata } from "next";
import Link from "next/link";

import { OrderAnatomy } from "~/components/OrderAnatomy";

import { AiFooter, AiHeader, CtaLink, Eyebrow } from "../../ui";

/* The flagship proof asset: the cloud-kitchen build, written as a case —
   trigger → old workflow → build choices → result → limits. The client's
   name stays private by agreement; the numbers don't.
   TODO(asher): two things only you can add — a client quote for the
   "What changed" section, and one before/after metric if the client
   clears it. Both slots are marked below. */

export const metadata: Metadata = {
  title: "Case: 31 brands, one honest P&L",
  description:
    "A year of delivery-platform payouts for a Dubai cloud-kitchen group — 40,803 orders modeled line by line into per-order economics, an owner's P&L, and a review-triage system. What was built, how, and its limits.",
};

const NUMBERS = [
  ["40,803", "orders — one full year, modeled order by order"],
  ["88,408", "order lines analyzed, down to the fils"],
  ["31", "brands in one financial model"],
] as const;

export default function CloudKitchenCasePage() {
  return (
    <div className="v7 min-h-screen">
      <AiHeader sub nav={[["The systems", "/ai#systems"]]} />

      <main className="mx-auto max-w-6xl px-6">
        {/* ---------- hero ---------- */}
        <section className="py-16 md:py-24">
          <Eyebrow>
            <span className="text-azure-text">●</span> Case — Dubai
            cloud-kitchen group · name private by agreement
          </Eyebrow>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-5xl">
            31 brands, a year of payouts, and no one could say what an order
            actually made.
          </h1>
          <p className="text-ink-2 mt-6 max-w-xl text-[17px] leading-relaxed">
            The flagship build: per-order economics, an owner&apos;s P&amp;L,
            and review triage — for a group running 31 delivery brands across
            Dubai&apos;s platforms.
          </p>
        </section>

        {/* ---------- numbers ---------- */}
        <section className="border-rule border-y py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            {NUMBERS.map(([num, cap]) => (
              <div key={num}>
                <p className="text-4xl font-medium tracking-[-0.02em] tabular-nums">
                  {num}
                </p>
                <p className="text-ink-2 mt-2 max-w-[26ch] text-[14px]">
                  {cap}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- before ---------- */}
        <section className="py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>01 — Before</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                Revenue was visible. Margin was folklore.
              </h2>
              <div className="text-ink-2 mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  The platforms reported gross sales; the bank received
                  something smaller; nobody reconciled the distance between the
                  two. Commission, payment fees, VAT on both, and two kinds of
                  discount — one funded by the platform, one quietly funded by
                  the kitchen — arrived tangled in statements nobody had time to
                  read.
                </p>
                <p>
                  Pricing decisions were made brand by brand on instinct. Vendor
                  invoices never met order data, so &ldquo;what did this item
                  cost us&rdquo; had no answer. And 1–3★ reviews piled up across
                  31 brands&apos; apps faster than anyone could read them, let
                  alone answer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- the build ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>02 — The build</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                Three systems on one data spine
              </h2>
              <div className="text-ink-2 mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  <span className="text-ink font-medium">
                    Per-order economics.
                  </span>{" "}
                  A year of payout data — 40,803 orders, 88,408 lines — parsed
                  into a model with an explicit fee taxonomy: merchant-funded
                  vs. platform-funded discounts, commission, payment fee, VAT,
                  other fees. Every order carries its own net income; every fee
                  line is checkable arithmetic instead of a statement nobody
                  reads.
                </p>
                <p>
                  <span className="text-ink font-medium">
                    The owner&apos;s P&amp;L.
                  </span>{" "}
                  Order economics and bank reality on one running page, month
                  over month — what the orders earned, what the bank actually
                  received, which cash movements remain unexplained — with
                  outages, cancellations, and item availability in the same
                  ledger.
                </p>
                <p>
                  <span className="text-ink font-medium">Review triage.</span>{" "}
                  Every 1–3★ review across all brands lands tagged by issue,
                  dish, and branch, with a drafted reply. The ops meeting starts
                  from a ranked list, not a scroll through the apps.
                </p>
              </div>
              <div className="border-rule bg-page-2 mt-8 border p-6">
                <p className="text-ink-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                  From the model — one order, taken apart
                </p>
                <div className="mt-4">
                  <OrderAnatomy />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- what changed ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>03 — What changed</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                Arguments now start from a number
              </h2>
              <div className="text-ink-2 mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  Pricing and promo decisions argue from per-order margin
                  instead of instinct. The fee lines nobody used to read are
                  where the surprises lived — and they&apos;re now checked
                  arithmetic. The weekly ops meeting opens on a ranked list of
                  what&apos;s actually hurting which brand at which branch.
                </p>
                {/* TODO(asher): client quote goes here when cleared —
                    one sentence in their words beats this paragraph.
                    TODO(asher): one before/after metric if the client
                    clears it (e.g. hours saved, a repriced item, a
                    recovered fee line). */}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- limits ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>04 — Limits</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                What this case does and doesn&apos;t prove
              </h2>
              <div className="text-ink-2 mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  The client&apos;s name stays private — that&apos;s their call,
                  and the numbers stand on their own. The systems were built
                  against their specific stack of platforms and formats; yours
                  will differ, which is exactly what the{" "}
                  <Link
                    href="/ai/session"
                    className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
                  >
                    working session
                  </Link>{" "}
                  establishes before any build is priced.
                </p>
                <p>
                  And it&apos;s one industry. The arithmetic — money in, fees
                  out, nobody checking — is not. Channel statements, vendor
                  invoices, and unanswered customers look remarkably alike
                  everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section className="border-rule border-t py-16 md:py-24">
          <Eyebrow>05 — Your version of this</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em] text-balance">
            Your statements, invoices, or chat threads have their own fee lines
            nobody reads.
          </h2>
          <div className="mt-8">
            <CtaLink href="/ai#contact" />
          </div>
        </section>
      </main>

      <AiFooter />
    </div>
  );
}
