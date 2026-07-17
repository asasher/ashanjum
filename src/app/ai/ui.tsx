import Link from "next/link";

import { DubaiTime } from "~/components/DubaiTime";
import { ThemeToggle } from "~/components/ThemeToggle";

/* Shared chrome for the AI lane (/ai and its subpages). One CTA,
   repeated verbatim everywhere. First person only. */

export const CTA =
  "Bring me your worst bottleneck — watch me build the fix live";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink-3 font-mono text-[11px] tracking-[0.14em] uppercase">
      {children}
    </p>
  );
}

export function CtaLink({ href = "#contact" }: { href?: string }) {
  return (
    <a
      href={href}
      className="text-azure-text decoration-rule hover:decoration-azure font-mono text-[13px] tracking-[0.04em] underline underline-offset-8 transition-colors"
    >
      {CTA} →
    </a>
  );
}

export function AiHeader({
  nav = [],
  sub = false,
}: {
  nav?: [label: string, href: string][];
  sub?: boolean;
}) {
  return (
    <header className="border-rule-soft bg-page/85 sticky top-0 z-10 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        {sub ? (
          <Link
            href="/ai"
            className="hover:text-azure-text text-[15px] font-medium tracking-[-0.01em] transition-colors"
          >
            ← Asher Anjum <span className="text-ink-3">— AI systems</span>
          </Link>
        ) : (
          <p className="text-[15px] font-medium tracking-[-0.01em]">
            Asher Anjum <span className="text-ink-3">— AI systems</span>
          </p>
        )}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-ink-2 hover:text-ink font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

export function AiFooter() {
  return (
    <footer className="border-rule border-t">
      <div className="text-ink-3 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] tracking-[0.08em]">
        <p>
          Asher Anjum —{" "}
          <a
            href="mailto:as.asher.anjum@gmail.com"
            className="decoration-rule hover:text-ink underline underline-offset-4"
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
  );
}
