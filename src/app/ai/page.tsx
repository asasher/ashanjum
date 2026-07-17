import { existsSync } from "fs";
import path from "path";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "~/components/ContactForm";
import { OrderAnatomy } from "~/components/OrderAnatomy";

import { AiFooter, AiHeader, CTA, CtaLink, Eyebrow } from "./ui";

/* v8 — the AI lane. Canonical entry: ai.ashanjum.com (host-rewritten by
   src/proxy.ts); also reachable at /ai on any host.
   Design: Gallery Light editorial system, warm near-black dark mode.
   Positioning: problem-led horizontal — owner-led operations businesses,
   revenue-critical workflow bottlenecks. F&B is the flagship case, not
   the niche. The paid working session (/ai/session) is the front door;
   this page positions, proves, and routes. Spokes so far:
   /ai/work/cloud-kitchen (proof), /ai/session (entry offer),
   /ai/partners (unlisted trigger sheet).
   Spine: hero → proof → systems → demo → process → pricing → insight →
   person → FAQ → contact. One CTA, repeated verbatim. First person only. */

export const metadata: Metadata = {
  title: "AI systems for Dubai operations",
  description:
    "I remove the workflow bottlenecks that throttle owner-led operations businesses in Dubai — proven live in a 90-minute working session, then delivered as fixed-price AI systems you own.",
};

/* Real photos: drop files into public/photos/ as workshop.jpg (wide
   table shot) and listening.jpg. Frames render a placeholder until the
   file exists (checked at build time). */
function hasPhoto(name: string) {
  return existsSync(path.join(process.cwd(), "public", "photos", name));
}

function PhotoFrame({
  file,
  alt,
  caption,
  aspect = "aspect-[3/4]",
}: {
  file: string;
  alt: string;
  caption: string;
  aspect?: string;
}) {
  const exists = hasPhoto(file);
  return (
    <figure>
      <div
        className={`relative ${aspect} border-rule bg-page-2 w-full overflow-hidden border`}
      >
        {exists ? (
          <Image
            src={`/photos/${file}`}
            alt={alt}
            fill
            sizes="(min-width: 900px) 40vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-ink-4 font-mono text-[11px] tracking-[0.14em] uppercase">
              Photo — {alt}
            </span>
          </div>
        )}
      </div>
      <figcaption className="text-ink-3 mt-2 font-mono text-[11px] tracking-[0.08em]">
        {caption}
      </figcaption>
    </figure>
  );
}

/* Six recurring bottlenecks, grouped by the problem the owner feels —
   not by industry. Titles one level above their first instance; the
   F&B origin lives in the body copy where it's proof, not a filter. */
const SYSTEM_GROUPS = [
  {
    label: "Know what you're actually making",
    systems: [
      {
        n: "01",
        name: "True unit economics",
        header: "What did that order actually make you? A number, finally.",
        body: "Vendor invoices reconciled against every sale, weighed against campaigns, discounts, and fees — so pricing stops being folklore. Built first for delivery orders; the same arithmetic runs anywhere units leave the door.",
        when: "You can quote revenue per order, but not margin per order",
        status: "new — founding client open",
        proof: "/ai/work/cloud-kitchen",
      },
      {
        n: "02",
        name: "Owner's P&L",
        header: "Earned, received, and unexplained — on one running page.",
        body: "Channel statements, bank deposits, and the operational record — outages, cancellations, availability — in one ledger an owner can read month over month.",
        when: "Platforms or channels pay you, and nobody checks their arithmetic",
        status: "field-proven",
        proof: "/ai/work/cloud-kitchen",
      },
    ],
  },
  {
    label: "Catch demand before it dies",
    systems: [
      {
        n: "03",
        name: "Customer-feedback triage",
        header:
          "Every 1–3★ review triaged, tagged, and answered — across every brand and branch.",
        body: "Complaints land ranked by issue, product, and location, with a drafted reply. Your ops meeting starts from a ranked list, not a scroll through the apps.",
        when: "Feedback arrives in five apps and gets answered in none",
        status: "field-proven",
        proof: "/ai/work/cloud-kitchen",
      },
      {
        n: "04",
        name: "WhatsApp sales pipeline",
        header: "Every lead answered in minutes. Every deal visible.",
        body: "Sales here happen in WhatsApp — and die there politely when the first reply comes hours late. This puts the pipeline on one screen and the first response on a clock.",
        when: "Your pipeline is a stack of chat threads",
        status: "in service",
        proof: null,
      },
    ],
  },
  {
    label: "Unblock the work",
    systems: [
      {
        n: "05",
        name: "On-brand imagery at scale",
        header: "A spreadsheet in, finished visuals out — in your brand's DNA.",
        body: "Menus, catalogs, proposal decks: every item rendered on-brand — palette, staging, mood — without a shoot for each new product or each new brand.",
        when: "Sales or listings are waiting on visuals",
        status: "field-proven",
        proof: null,
      },
      {
        n: "06",
        name: "Ask your legacy system",
        header:
          "Plain-English questions against software with no API. No migration.",
        body: "A setup phase maps how your old system holds its data and how to get it out. Then anyone on the team asks in plain English and gets the number.",
        when: "The answer exists, but only one person knows how to pull it",
        status: "in service",
        proof: null,
      },
    ],
  },
] as const;

export default function HomePage() {
  return (
    <div className="v7 min-h-screen">
      <AiHeader
        nav={[
          ["Systems", "#systems"],
          ["The session", "/ai/session"],
          ["Pricing", "#pricing"],
          ["Contact", "#contact"],
        ]}
      />

      <main className="mx-auto max-w-6xl px-6">
        {/* ---------- hero ---------- */}
        <section className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <Eyebrow>
              <span className="text-azure-text">●</span> AI systems for
              operations — Dubai
            </Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-5xl">
              I&apos;m Asher Anjum. I remove the workflow bottlenecks that
              throttle operations businesses — with working AI systems you own.
            </h1>
            <p className="text-ink-2 mt-6 max-w-xl text-[17px] leading-relaxed">
              For owner-led businesses in Dubai. One bottleneck at a time: I
              prove the fix in a{" "}
              <Link
                href="/ai/session"
                className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
              >
                90-minute working session
              </Link>
              , then deliver it as a production system. Fixed price. Paid in
              advance. Keys included.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#contact"
                className="bg-azure px-7 py-3.5 font-mono text-[13px] tracking-[0.06em] text-white uppercase transition-transform hover:-translate-y-0.5"
              >
                {CTA}
              </a>
            </div>
            <p className="text-ink-4 mt-4 font-mono text-[11px]">
              Starts with a free 20-minute fit call. Not defensible? I say so
              there.
            </p>
          </div>
          {/* Hero image removed for now — Asher is picking a new one. */}
        </section>

        {/* ---------- proof strip ---------- */}
        <section className="border-rule border-y py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              ["40,803", "orders — one full year, modeled order by order"],
              ["88,408", "order lines analyzed, down to the fils"],
              ["31", "brands in one financial model"],
            ].map(([num, cap]) => (
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
          <p className="text-ink-3 mt-8 font-mono text-[11px] tracking-[0.08em]">
            The flagship build, for a Dubai cloud-kitchen group. Their name
            stays private. The numbers don&apos;t.{" "}
            <Link
              href="/ai/work/cloud-kitchen"
              className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
            >
              Read the case →
            </Link>
          </p>
        </section>

        {/* ---------- systems menu ---------- */}
        <section id="systems" className="py-16 md:py-20">
          <Eyebrow>02 — Start with a system</Eyebrow>
          <p className="text-ink-2 mt-4 max-w-xl text-[15px]">
            Six bottlenecks I keep meeting, turned into systems. Different
            industries, same leaks — find yours by the sentence that stings.
          </p>
          {SYSTEM_GROUPS.map((group) => (
            <div key={group.label} className="mt-10">
              <p className="text-azure-text font-mono text-[11px] tracking-[0.14em] uppercase">
                {group.label}
              </p>
              <div className="border-rule mt-4 border-t">
                {group.systems.map((s) => (
                  <div
                    key={s.n}
                    className="group border-rule hover:bg-page-2 grid gap-3 border-b px-6 py-6 transition-colors md:grid-cols-12 md:gap-6 md:px-8"
                  >
                    <p className="text-ink-4 font-mono text-[12px] md:col-span-1">
                      {s.n}
                    </p>
                    <div className="md:col-span-7">
                      <h3 className="text-[17px] font-medium tracking-[-0.01em]">
                        {s.header}
                      </h3>
                      <p className="text-ink-2 mt-2 max-w-prose text-[14px] leading-relaxed">
                        {s.body}
                      </p>
                      {s.proof && (
                        <p className="mt-2 font-mono text-[11px]">
                          <Link
                            href={s.proof}
                            className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
                          >
                            Proven in the flagship build →
                          </Link>
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-4 md:text-right">
                      <p
                        className={`inline-block border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ${
                          s.status === "field-proven"
                            ? "border-azure/40 text-azure-text"
                            : s.status.startsWith("new")
                              ? "border-azure bg-azure text-white"
                              : "border-rule text-ink-3"
                        }`}
                      >
                        {s.status}
                      </p>
                      <p className="text-ink-3 mt-3 font-mono text-[11px]">
                        Best when: {s.when}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-ink-4 mt-6 font-mono text-[11px] tracking-[0.06em]">
            Bottleneck not on the menu? That&apos;s what the working session is
            for — most of these started as somebody&apos;s odd request.
          </p>
        </section>

        {/* ---------- signature demo ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <Eyebrow>03 — From the flagship build</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em]">
            Where does an order&apos;s money actually go?
          </h2>
          <p className="text-ink-2 mt-3 max-w-xl text-[15px]">
            One delivery order from the cloud-kitchen case, taken apart the way
            the production model does it — one worked example of what &ldquo;a
            working system&rdquo; means here. Press the button.
          </p>
          <div className="mt-8">
            <OrderAnatomy />
          </div>
          <div className="mt-6">
            <CtaLink />
          </div>
        </section>

        {/* ---------- how it works ---------- */}
        <section id="process" className="border-rule border-t py-16 md:py-20">
          <Eyebrow>04 — How it works</Eyebrow>
          <div className="border-rule bg-rule mt-8 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "1 · The fit call",
                "Twenty minutes, free. We pick the one bottleneck worth attacking and put a rough cost on it. If there's nothing defensible, I say so and we stop there.",
              ],
              [
                "2 · The working session",
                "Ninety minutes, AED 4,900. I build the fix in front of you — you leave with a working proof, a written go/no-go, and a fixed-price proposal. Half the fee credits into the build.",
              ],
              [
                "3 · The build",
                "Weeks, not quarters. A weekly update you can read in one minute, and nothing billed by the hour.",
              ],
              [
                "4 · Handover",
                "Code, data, keys — yours. Your team runs it. I stay on call if you want me to.",
              ],
            ].map(([head, body]) => (
              <div key={head} className="bg-card p-6">
                <p className="text-azure-text font-mono text-[12px] tracking-[0.08em] uppercase">
                  {head}
                </p>
                <p className="text-ink-2 mt-3 text-[14px] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-ink-4 mt-6 font-mono text-[11px] tracking-[0.06em]">
            The session, in detail — what you bring, what you leave with, where
            its honest boundary sits:{" "}
            <Link
              href="/ai/session"
              className="text-azure-text decoration-rule hover:decoration-azure underline underline-offset-4"
            >
              the working session →
            </Link>
          </p>
        </section>

        {/* ---------- pricing ---------- */}
        <section id="pricing" className="border-rule border-t py-16 md:py-20">
          <Eyebrow>05 — Pricing</Eyebrow>
          <div className="border-rule bg-rule mt-8 grid gap-px overflow-hidden border md:grid-cols-3">
            <div className="bg-card p-8">
              <p className="text-ink-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                The working session
              </p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.02em]">
                AED 4,900 <span className="text-ink-3 text-base">fixed</span>
              </p>
              <p className="text-ink-2 mt-4 max-w-prose text-[14px] leading-relaxed">
                Ninety minutes. Your bottleneck, built live to a working proof,
                with a written go/no-go. Half credits against a build
                commissioned within 30 days.
              </p>
            </div>
            <div className="bg-card p-8">
              <p className="text-ink-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                Built with your team
              </p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.02em]">
                from AED 15,000{" "}
                <span className="text-ink-3 text-base">per system</span>
              </p>
              <p className="text-ink-2 mt-4 max-w-prose text-[14px] leading-relaxed">
                Up to four of your people in the room. We build it together —
                they learn to run it, and to extend it after I&apos;m gone.
              </p>
            </div>
            <div className="bg-card p-8">
              <p className="text-ink-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                Delivered running
              </p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.02em]">
                from AED 20,000{" "}
                <span className="text-ink-3 text-base">per system</span>
              </p>
              <p className="text-ink-2 mt-4 max-w-prose text-[14px] leading-relaxed">
                I build it, hand it over running, and train the person who owns
                it. Most engagements land between AED 20,000–40,000.
              </p>
            </div>
          </div>
          <div className="text-ink-2 mt-6 space-y-2 text-[15px]">
            <p>
              Ongoing optimization from AED 3,500/month, quarterly in advance.
            </p>
            <p className="text-ink font-medium">
              Paid in advance — half on signature. You own everything: code,
              data, keys.
            </p>
          </div>
          <div className="mt-8">
            <CtaLink />
          </div>
        </section>

        {/* ---------- written insight ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>06 — Field notes</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                Different industries, same four leaks
              </h2>
              <div className="text-ink-2 mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  In May I ran AI 101 in Dubai for a room of business owners —
                  service education, F&amp;B, pricing, financial consulting.
                  Every operation in the room leaked in the same four places.
                  Money nobody reconciles: channels and platforms take their
                  cut, and in the year of payout data I&apos;ve modeled, the fee
                  lines nobody reads were exactly where the surprises lived.
                  Customer feedback nobody triages, piling up across apps while
                  the team argues about anecdotes. Sales dying politely in
                  WhatsApp because the first reply came four hours late. And
                  answers locked inside a legacy system only one person knows
                  how to query.
                </p>
                <p>
                  None of this needs more staff. It needs systems that check,
                  answer, and escalate on their own — and an owner who can see
                  all of it on one page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- person ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <Eyebrow>07 — The person</Eyebrow>
              <div className="text-ink-2 mt-5 max-w-[58ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  I&apos;ve spent a decade building software for operations
                  businesses — most recently the flagship P&amp;L and
                  feedback-triage systems above, for a group running 31 brands
                  on delivery platforms.
                </p>
                <p>
                  I work alone, on purpose — you get the person who made the
                  promise. My name is on the domain because you should know
                  exactly who to call when something breaks.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:col-span-5 md:col-start-8">
              <PhotoFrame
                file="workshop.jpg"
                alt="the AI 101 room"
                caption="AI 101 for Dubai business owners & solopreneurs · May 2026"
                aspect="aspect-[4/3]"
              />
              <PhotoFrame
                file="listening.jpg"
                alt="listening first"
                caption="The first step is always listening."
                aspect="aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <Eyebrow>08 — Four questions</Eyebrow>
          <div className="border-rule mt-8 border-t">
            {[
              [
                "Do I need a tech team?",
                "No. These systems are built to be run by the people you already have. If your team can use WhatsApp and a spreadsheet, they can run what I hand over.",
              ],
              [
                "Our data is a mess. Is that a problem?",
                "It's the norm. Messy exports, three formats, no API — that's what the working session is for. The systems above were built on exactly that kind of data.",
              ],
              [
                "What if the session produces nothing?",
                "Then you'll know by minute ninety, not month three. You keep the recording, the artifacts, and a written no-go with reasons. That's the point of pricing the diagnosis separately from the build.",
              ],
              [
                "Why paid in advance?",
                "It keeps both of us honest. You get a fixed price and a named person accountable for it; I spend my attention building, not invoicing. Half on signature is standard practice here — and it's non-negotiable.",
              ],
            ].map(([q, a]) => (
              <div
                key={q}
                className="border-rule grid gap-3 border-b py-6 md:grid-cols-12 md:gap-6"
              >
                <h3 className="text-[16px] font-medium md:col-span-4">{q}</h3>
                <p className="text-ink-2 max-w-prose text-[14px] leading-relaxed md:col-span-7">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="border-rule border-t py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>09 — The ask</Eyebrow>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] text-balance">
                {CTA}.
              </h2>
              <p className="text-ink-2 mt-4 max-w-prose text-[15px]">
                Bring whatever you have — a platform statement, a messy export,
                a WhatsApp thread that went quiet. The fit call is free and
                takes twenty minutes. If your bottleneck isn&apos;t defensible,
                I&apos;ll say so there.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <AiFooter />
    </div>
  );
}
