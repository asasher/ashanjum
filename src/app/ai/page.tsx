import { existsSync } from "fs";
import path from "path";
import { type Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "~/components/ContactForm";
import { DubaiTime } from "~/components/DubaiTime";
import { OrderAnatomy } from "~/components/OrderAnatomy";
import { ThemeToggle } from "~/components/ThemeToggle";

/* v7 — the AI lane. Canonical entry: ai.ashanjum.com (host-rewritten by
   src/proxy.ts); also reachable at /ai on any host.
   Design: Gallery Light editorial system, warm near-black dark mode.
   Spine: hero → proof → demo → process → systems → insight → pricing →
   person → FAQ → contact. One CTA, repeated verbatim. First person only. */

export const metadata: Metadata = {
  title: "AI systems for Dubai operations",
  description:
    "I build AI systems that run your operations — true cost per order, review intelligence, sales follow-up — for Dubai businesses. Fixed price, paid in advance. You own everything I hand over.",
};

const CTA = "Book 20 minutes — I'll show you where your margin leaks";

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
        className={`relative ${aspect} w-full overflow-hidden border border-rule bg-page-2`}
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
            <span className="font-mono text-[11px] tracking-[0.14em] text-ink-4 uppercase">
              Photo — {alt}
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-2 font-mono text-[11px] tracking-[0.08em] text-ink-3">
        {caption}
      </figcaption>
    </figure>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
      {children}
    </p>
  );
}

function CtaLink() {
  return (
    <a
      href="#contact"
      className="font-mono text-[13px] tracking-[0.04em] text-azure-text underline decoration-rule underline-offset-8 transition-colors hover:decoration-azure"
    >
      {CTA} →
    </a>
  );
}

const SYSTEMS = [
  {
    n: "01",
    name: "True cost per order",
    header: "What did that order actually make you? Finally, a number.",
    body: "Vendor invoices reconciled into data you can query, matched against every order, and weighed against your campaigns, discounts, and fees — so pricing decisions stop being folklore.",
    who: "Kitchen and restaurant groups buying from many vendors",
    status: "new — founding client open",
  },
  {
    n: "02",
    name: "P&L, month over month",
    header: "Order economics and bank reality, on one running page.",
    body: "What the orders earned, what the bank actually received, and which cash movements remain unexplained — with outages, cancellations, and item availability in the same ledger.",
    who: "Owners who want one honest page on performance",
    status: "field-proven",
  },
  {
    n: "03",
    name: "Review intelligence",
    header:
      "Every 1–3★ review triaged, tagged, and answered — across all brands.",
    body: "Reviews land tagged by issue, dish, and branch, with a drafted reply. Your ops meeting starts from a ranked list, not a scroll through the apps.",
    who: "Multi-brand and multi-branch operators",
    status: "field-proven",
  },
  {
    n: "04",
    name: "Brand-DNA image generation",
    header: "Menu images in your brand's colors and DNA — at catalog scale.",
    body: "A spreadsheet in, finished imagery out: every item rendered on-brand — palette, plating, mood — without a shoot for each new dish or each new brand.",
    who: "F&B brands feeding menus to apps and aggregators",
    status: "field-proven",
  },
  {
    n: "05",
    name: "Ask your legacy system",
    header: "Plain-English questions against software with no API. No migration.",
    body: "A setup phase maps how your old system holds its data and how to get it out. Then anyone on the team asks in plain English and gets the number.",
    who: "Businesses running on aging ERP or inventory software",
    status: "in service",
  },
  {
    n: "06",
    name: "WhatsApp sales dashboard",
    header: "Every lead answered in minutes. Every deal visible.",
    body: "Sales here happen in WhatsApp — and die there politely when the first reply comes hours late. This puts the pipeline on one screen and the first response on a clock.",
    who: "Owners whose sales live in chat threads",
    status: "in service",
  },
] as const;

export default function HomePage() {
  return (
    <div className="v7 min-h-screen">
      {/* ---------- header ---------- */}
      <header className="sticky top-0 z-10 border-b border-rule-soft bg-page/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <p className="text-[15px] font-medium tracking-[-0.01em]">
            Asher Anjum <span className="text-ink-3">— AI systems</span>
          </p>
          <nav className="hidden items-center gap-6 md:flex">
            {[
              ["Systems", "#systems"],
              ["How it works", "#process"],
              ["Pricing", "#pricing"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[11px] tracking-[0.12em] text-ink-2 uppercase transition-colors hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* ---------- hero ---------- */}
        <section className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <Eyebrow>
              <span className="text-azure-text">●</span> AI systems for
              operations — Dubai
            </Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-5xl">
              I&apos;m Asher Anjum. I build AI systems that run your
              operations — and you own everything I hand over.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
              True cost per order, review intelligence, sales follow-up,
              plain-English answers from legacy software. For businesses that
              run on operations, not software teams. Fixed price. Paid in
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
            <p className="mt-4 font-mono text-[11px] text-ink-4">
              20 minutes. Your numbers. No deck.
            </p>
          </div>
          {/* Hero image removed for now — Asher is picking a new one. */}
        </section>

        {/* ---------- proof strip ---------- */}
        <section className="border-y border-rule py-10">
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
                <p className="mt-2 max-w-[26ch] text-[14px] text-ink-2">
                  {cap}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.08em] text-ink-3">
            Modeled for a Dubai cloud-kitchen group. Their name stays
            private. The numbers don&apos;t.
          </p>
        </section>

        {/* ---------- signature demo ---------- */}
        <section className="py-16 md:py-20">
          <Eyebrow>02 — The argument</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em]">
            Where does an order&apos;s money actually go?
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-ink-2">
            One order, taken apart the way my P&amp;L model does it. Press the
            button.
          </p>
          <div className="mt-8">
            <OrderAnatomy />
          </div>
          <div className="mt-6">
            <CtaLink />
          </div>
        </section>

        {/* ---------- how it works ---------- */}
        <section id="process" className="border-t border-rule py-16 md:py-20">
          <Eyebrow>03 — How it works</Eyebrow>
          <div className="mt-8 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "1 · The call",
                "Twenty minutes on where your operation leaks. If there's nothing defensible, I say so and we stop there.",
              ],
              [
                "2 · Setup, paid",
                "Systems that need discovery — legacy software, knowledgebases — start with a paid setup phase: AED 6,000, credited against the build. You get a fixed-price proposal either way.",
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
                <p className="font-mono text-[12px] tracking-[0.08em] text-azure-text uppercase">
                  {head}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- systems menu ---------- */}
        <section id="systems" className="border-t border-rule py-16 md:py-20">
          <Eyebrow>04 — Start with a system</Eyebrow>
          <p className="mt-4 max-w-xl text-[15px] text-ink-2">
            Most engagements begin with one of these.
          </p>
          <div className="mt-8 border-t border-rule">
            {SYSTEMS.map((s) => (
              <div
                key={s.n}
                className="group grid gap-3 border-b border-rule px-5 py-6 transition-colors hover:bg-page-2 md:grid-cols-12 md:gap-6 md:px-6"
              >
                <p className="font-mono text-[12px] text-ink-4 md:col-span-1">
                  {s.n}
                </p>
                <div className="md:col-span-7">
                  <h3 className="text-[17px] font-medium tracking-[-0.01em]">
                    {s.header}
                  </h3>
                  <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-ink-2">
                    {s.body}
                  </p>
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
                  <p className="mt-3 font-mono text-[11px] text-ink-3">
                    For: {s.who}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-[0.06em] text-ink-4">
            In the lab: team knowledgebases, agentic development workflows,
            media curation and video-editing agents, and the tools I use to
            build all of the above.
          </p>
        </section>

        {/* ---------- written insight ---------- */}
        <section className="border-t border-rule py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>05 — Field notes</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                What I keep seeing inside Dubai operations
              </h2>
              <div className="mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed text-ink-2">
                <p>
                  The platforms take 20–35% and almost nobody checks the
                  arithmetic — in the year of payout data I modeled, the fee
                  lines nobody reads were exactly where the surprises lived.
                  Almost nobody can say what a single order actually made
                  them, because the vendor invoices never meet the order
                  data. Reviews pile up unanswered while the kitchen argues
                  about a rating nobody actually reads. Sales die politely in
                  WhatsApp threads because the first reply came four hours
                  late. And half the answers already sit inside a legacy
                  system nobody can query.
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

        {/* ---------- pricing ---------- */}
        <section id="pricing" className="border-t border-rule py-16 md:py-20">
          <Eyebrow>06 — Pricing</Eyebrow>
          <div className="mt-8 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2">
            <div className="bg-card p-8">
              <p className="font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
                Built with your team
              </p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.02em]">
                from AED 15,000{" "}
                <span className="text-base text-ink-3">per system</span>
              </p>
              <p className="mt-4 max-w-prose text-[14px] leading-relaxed text-ink-2">
                Up to four of your people in the room. We build it together —
                they learn to run it, and to extend it after I&apos;m gone.
              </p>
            </div>
            <div className="bg-card p-8">
              <p className="font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">
                Delivered running
              </p>
              <p className="mt-3 text-3xl font-medium tracking-[-0.02em]">
                from AED 20,000{" "}
                <span className="text-base text-ink-3">per system</span>
              </p>
              <p className="mt-4 max-w-prose text-[14px] leading-relaxed text-ink-2">
                I build it, hand it over running, and train the person who
                owns it. Most engagements land between AED 20,000–40,000.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-[15px] text-ink-2">
            <p>
              Ongoing optimization from AED 3,500/month, quarterly in advance.
            </p>
            <p className="font-medium text-ink">
              Paid in advance — half on signature. You own everything: code,
              data, keys.
            </p>
            <p className="font-mono text-[11px] text-ink-4">
              For scale: a system costs less than one waiter costs you in a
              year.
            </p>
          </div>
          <div className="mt-8">
            <CtaLink />
          </div>
        </section>

        {/* ---------- person ---------- */}
        <section className="border-t border-rule py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <Eyebrow>07 — The person</Eyebrow>
              {/* NOTE for Asher: voice-check this story; the facts are drawn
                  from delivered work + the May 2026 workshop only. */}
              <div className="mt-5 max-w-[58ch] space-y-4 text-[16px] leading-relaxed text-ink-2">
                <p>
                  I&apos;ve spent a decade building software for operations
                  businesses — most recently the P&amp;L and review systems
                  above, for a group running 31 brands on delivery
                  platforms.
                </p>
                <p>
                  In May I ran AI 101 in Dubai for a room of business owners:
                  service education, F&amp;B, pricing, financial consulting.
                  Different industries, same four leaks.
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
        <section className="border-t border-rule py-16 md:py-20">
          <Eyebrow>08 — Three questions</Eyebrow>
          <div className="mt-8 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
            {[
              [
                "Do I need a tech team?",
                "No. These systems are built to be run by the people you already have. If your team can use WhatsApp and a spreadsheet, they can run what I hand over.",
              ],
              [
                "Our data is a mess. Is that a problem?",
                "It's the norm. Messy exports, three formats, no API — that's exactly what the setup phase is for. The systems above were built on that kind of data.",
              ],
              [
                "Why paid in advance?",
                "It keeps both of us honest. You get a fixed price and a named person accountable for it; I spend my attention building, not invoicing. Half on signature is standard practice here — and it's non-negotiable.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="bg-card p-7">
                <h3 className="text-[16px] font-medium">{q}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="border-t border-rule py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>09 — The ask</Eyebrow>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] text-balance">
                {CTA}.
              </h2>
              <p className="mt-4 max-w-prose text-[15px] text-ink-2">
                Bring whatever numbers you have — platform statements, a
                ratings screenshot, nothing at all. If there&apos;s no
                defensible leak, I&apos;ll tell you on the call.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] tracking-[0.08em] text-ink-3">
          <p>
            Asher Anjum —{" "}
            <a
              href="mailto:as.asher.anjum@gmail.com"
              className="underline decoration-rule underline-offset-4 hover:text-ink"
            >
              as.asher.anjum@gmail.com
            </a>
          </p>
          <p>
            <DubaiTime />
          </p>
          <p className="text-ink-4">
            Built by me, on the systems I sell. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
