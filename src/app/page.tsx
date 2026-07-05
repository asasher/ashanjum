import { existsSync } from "fs";
import path from "path";
import { type Metadata } from "next";
import Image from "next/image";

import { DubaiTime } from "~/components/DubaiTime";
import { ThemeToggle } from "~/components/ThemeToggle";

/* Root — ashanjum.com. A personal index, not a lane: who I am and the
   two doors. The lanes live on subdomains (rewritten in src/proxy.ts)
   and remain reachable at /ai and /agentic on any host. */

export const metadata: Metadata = {
  title: { absolute: "Asher Anjum" },
  description:
    "I build software and AI systems in Dubai. Operations businesses hire me to build the systems their margin depends on; software teams hire me as an external CTO in the age of AI.",
};

const LANES = [
  {
    href: "/ai",
    domain: "ai.ashanjum.com",
    name: "AI systems for operations businesses",
    line: "True cost per order, review intelligence, a P&L that tells the truth. For businesses that run on operations, not software teams.",
  },
  {
    href: "/agentic",
    domain: "agentic.ashanjum.com",
    name: "Your external CTO in the age of AI",
    line: "Agentic development for teams building software — the workflow is free and public; I set it up inside your business and stay on call.",
  },
] as const;

export default function HomePage() {
  const hasPortrait = existsSync(
    path.join(process.cwd(), "public", "photos", "portrait.jpg"),
  );
  return (
    <div className="v7 flex min-h-screen flex-col">
      <header className="border-b border-rule-soft">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-6 py-4">
          <p className="text-[15px] font-medium tracking-[-0.01em]">
            Asher Anjum
          </p>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6">
        <section className="grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
              <span className="text-azure-text">●</span> Dubai · <DubaiTime />
            </p>
            <h1 className="mt-6 text-4xl leading-[1.1] font-medium tracking-[-0.02em] md:text-5xl">
              I build software and AI systems.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
              For the last decade that has meant systems for operations
              businesses — the unglamorous software the margin depends on.
              These days I build them with agents, and I hand over the keys
              when I&apos;m done. Two kinds of people hire me:
            </p>
          </div>
          {hasPortrait && (
            <div className="md:col-span-3 md:col-start-10">
              <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden border border-rule bg-page-2">
                <Image
                  src="/photos/portrait.jpg"
                  alt="Asher Anjum"
                  fill
                  sizes="(min-width: 900px) 20vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </section>

        <section className="border-t border-rule">
          {LANES.map((lane) => (
            <a
              key={lane.href}
              href={lane.href}
              className="group grid gap-3 border-b border-rule py-8 transition-colors hover:bg-page-2 md:grid-cols-12 md:gap-6"
            >
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 md:col-span-3">
                {lane.domain}
              </p>
              <div className="md:col-span-8">
                <h2 className="text-[19px] font-medium tracking-[-0.01em]">
                  {lane.name}
                </h2>
                <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-ink-2">
                  {lane.line}
                </p>
              </div>
              <p className="text-right font-mono text-[15px] text-azure-text transition-transform md:col-span-1 md:group-hover:translate-x-1">
                →
              </p>
            </a>
          ))}
        </section>

        <section className="py-12">
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
            Not sure which door is yours? Write to me —{" "}
            <a
              href="mailto:as.asher.anjum@gmail.com"
              className="underline decoration-rule underline-offset-4 hover:text-ink"
            >
              as.asher.anjum@gmail.com
            </a>
            . I read everything myself.
          </p>
        </section>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] tracking-[0.08em] text-ink-3">
          <p>Asher Anjum</p>
          <p className="text-ink-4">
            Built by me, on the systems I sell. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
