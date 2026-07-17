import { type Metadata } from "next";

import { ContactForm } from "~/components/ContactForm";

import { AiFooter, AiHeader, Eyebrow } from "../ui";

/* The Bottleneck-to-Build Session — the paid entry offer for the AI
   lane. One page, WhatsApp-able. Canonical: ai.ashanjum.com/session
   (src/proxy.ts); also /ai/session on any host. */

export const metadata: Metadata = {
  title: "The working session — bring a bottleneck, leave with it working",
  description:
    "90 minutes, AED 4,900, Dubai or remote. Bring the workflow that costs you the most; watch me build the fix live. You leave with a working proof, a written go/no-go, and a fixed-price proposal — half the fee credits into the build.",
};

const DELIVERABLES = [
  [
    "A working proof",
    "The first live version of the fix, built in front of you on a sanitized sample of your real process. Not slides. Not a spec. A thing that runs.",
  ],
  [
    "Everything we made",
    "The session recording, the prompts, the code, the assets. Yours regardless of what you decide afterwards.",
  ],
  [
    "A one-page recommendation",
    "What the fix is worth, what it depends on, where it can break — and three honest paths: it's a no-go, your team implements it, or I deliver it as a production system.",
  ],
  [
    "A fixed-price proposal",
    "If the build is worth commissioning, you get a fixed price on the spot-checked scope. Half the session fee credits against a build commissioned within 30 days.",
  ],
] as const;

const STEPS = [
  [
    "Before",
    "You send me the bottleneck: what the workflow is, roughly what it costs you, and a sanitized sample of the real inputs. I do capped preparation — enough to not waste your ninety minutes, not a hidden discovery project.",
  ],
  [
    "During",
    "You, whoever runs the process, and me. We map the workflow live, I build the fix in front of you, and we run it against your sample until it produces something you can judge.",
  ],
  [
    "After",
    "Within two working days: the recording, the artifacts, and the one-page recommendation with the three paths priced.",
  ],
] as const;

export default function SessionPage() {
  return (
    <div className="v7 min-h-screen">
      <AiHeader sub nav={[["Book it", "#contact"]]} />

      <main className="mx-auto max-w-6xl px-6">
        {/* ---------- hero ---------- */}
        <section className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <Eyebrow>
              <span className="text-azure-text">●</span> The working session —
              AED 4,900 · 90 minutes · Dubai or remote
            </Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-5xl">
              Bring the workflow that costs you the most. Leave with the fix
              running.
            </h1>
            <p className="text-ink-2 mt-6 max-w-xl text-[17px] leading-relaxed">
              One bottleneck, ninety minutes, built live in front of you and the
              person who runs the process. You leave with a working proof, a
              written go/no-go, and a fixed price for the production build — or
              a clear reason not to build at all.
            </p>
            <div className="mt-9">
              <a
                href="#contact"
                className="bg-azure px-7 py-3.5 font-mono text-[13px] tracking-[0.06em] text-white uppercase transition-transform hover:-translate-y-0.5"
              >
                Book the session
              </a>
            </div>
            <p className="text-ink-4 mt-4 font-mono text-[11px]">
              Starts with a free 20-minute fit call. Not defensible? I say so
              there, and it costs you nothing.
            </p>
          </div>
        </section>

        {/* ---------- what you leave with ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <Eyebrow>01 — What you leave with</Eyebrow>
          <div className="border-rule bg-rule mt-8 grid gap-px overflow-hidden border sm:grid-cols-2">
            {DELIVERABLES.map(([head, body]) => (
              <div key={head} className="bg-card p-7">
                <h2 className="text-[16px] font-medium">{head}</h2>
                <p className="text-ink-2 mt-3 text-[14px] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- how it runs ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <Eyebrow>02 — How it runs</Eyebrow>
          <div className="border-rule mt-8 border-t">
            {STEPS.map(([head, body]) => (
              <div
                key={head}
                className="border-rule grid gap-3 border-b py-6 md:grid-cols-12 md:gap-6"
              >
                <p className="text-azure-text font-mono text-[12px] tracking-[0.08em] uppercase md:col-span-2">
                  {head}
                </p>
                <p className="text-ink-2 max-w-prose text-[15px] leading-relaxed md:col-span-9">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- a recent session ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>03 — A recent session</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                An events fabricator whose renders kept killing his deals
              </h2>
              <div className="text-ink-2 mt-5 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
                <p>
                  He builds exhibition booths. His proposals went out with
                  imagery that wasn&apos;t true to scale, clients couldn&apos;t
                  see what they were buying, and every render cost him time he
                  didn&apos;t have. Thirty minutes of conversation, one hour of
                  building.
                </p>
                <p>
                  What he left with: a workflow that first generates
                  true-to-scale 3D blockouts of the booth, renders them into
                  high-fidelity images, and compiles them into a client-ready
                  proposal deck. His closing tool now costs him a prompt instead
                  of a week.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- the boundary ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <Eyebrow>04 — The honest boundary</Eyebrow>
          <div className="text-ink-2 mt-6 max-w-[62ch] space-y-4 text-[16px] leading-relaxed">
            <p>
              What you get in ninety minutes is a{" "}
              <span className="text-ink font-medium">working proof</span> —
              enough to judge whether the fix is real and what it&apos;s worth.
              It is not the production system: it runs on sanitized sample data,
              it isn&apos;t wired into your live accounts, and it hasn&apos;t
              met your edge cases yet. The production build — integrations,
              exception handling, training, handover — is what the fixed-price
              proposal covers.
            </p>
            <p>
              And sometimes the honest output is a no-go. You&apos;ll know by
              minute ninety, not month three — in writing, with reasons. That is
              what you paid for.
            </p>
          </div>
        </section>

        {/* ---------- fit ---------- */}
        <section className="border-rule border-t py-16 md:py-20">
          <Eyebrow>05 — Who this is for</Eyebrow>
          <div className="border-rule bg-rule mt-8 grid gap-px overflow-hidden border md:grid-cols-2">
            <div className="bg-card p-8">
              <p className="text-ink-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                Bring it if
              </p>
              <ul className="text-ink-2 mt-4 space-y-3 text-[14px] leading-relaxed">
                <li>
                  You own the business or run its operations, and you can put
                  the person who actually does the workflow in the room.
                </li>
                <li>
                  The bottleneck recurs — weekly reporting, reconciliation,
                  proposals, follow-up — and you can put a rough cost on it.
                </li>
                <li>You can share a sanitized sample of the real inputs.</li>
              </ul>
            </div>
            <div className="bg-card p-8">
              <p className="text-ink-3 font-mono text-[11px] tracking-[0.12em] uppercase">
                Don&apos;t bring
              </p>
              <ul className="text-ink-2 mt-4 space-y-3 text-[14px] leading-relaxed">
                <li>
                  &ldquo;Show us what AI can do&rdquo; — that&apos;s a workshop,
                  not a working session.
                </li>
                <li>
                  A bottleneck whose owner isn&apos;t in the room. The session
                  works because decisions happen in it.
                </li>
                <li>
                  Something you&apos;d never commission at any price. The
                  session exists to price a real decision.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="border-rule border-t py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>06 — Book it</Eyebrow>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] text-balance">
                Tell me the bottleneck. I&apos;ll tell you if it&apos;s worth
                ninety minutes.
              </h2>
              <p className="text-ink-2 mt-4 max-w-prose text-[15px]">
                We start with a free 20-minute fit call: what the workflow is,
                what it costs you, whether a session can move it. If it
                can&apos;t, we stop there.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ContactForm defaultPacket="The working session — I'll bring my bottleneck" />
            </div>
          </div>
        </section>
      </main>

      <AiFooter />
    </div>
  );
}
