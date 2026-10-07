/* Shared pieces for the policy pages behind my Meta app. Meta's App
   Review needs a public privacy policy, data deletion instructions and terms
   of service; these pages are those URLs. Plain and short on purpose: the
   app exists only to automate my own business's advertising and has no
   public users. */

import Link from "next/link";

export const APP_NAME = "Asher Anjum";
export const OPERATOR = "Asher Anjum";
export const CONTACT_EMAIL = "hello@asheranjum.com";
export const EFFECTIVE_DATE = "7 October 2026";

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-ink text-white">
        <div className="text-dusk-2 mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-6 font-mono text-[11px] tracking-[0.17em] uppercase">
          <Link href="/" className="hover:text-dusk">
            Asher Anjum
          </Link>
          <p>Meta app policies</p>
        </div>
        <div className="mx-auto w-full max-w-3xl px-6 pt-14 pb-14 md:pt-20 md:pb-16">
          <p className="text-cobalt-bright font-mono text-[11px] font-medium tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
          <div className="bg-cobalt mt-8 h-0.5 w-10" />
          <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
            {title}
          </h1>
          <div className="text-dusk mt-6 max-w-[56ch] text-[16px] leading-relaxed">
            {intro}
          </div>
          <p className="text-dusk-2 mt-8 font-mono text-[10px] tracking-[0.17em] uppercase">
            Effective {EFFECTIVE_DATE}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 md:py-20">
        {children}
      </main>

      <footer className="border-line border-t">
        <div className="text-ink-3 mx-auto flex w-full max-w-3xl flex-wrap gap-x-6 gap-y-2 px-6 py-8 font-mono text-[11px] tracking-[0.12em] uppercase">
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/data-deletion" className="hover:text-ink">
            Data deletion
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
            {CONTACT_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-line scroll-mt-8 border-t py-8 first:border-t-0 first:pt-0"
    >
      <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{title}</h2>
      <div className="text-ink-2 [&_a]:text-cobalt [&_strong]:text-ink mt-4 space-y-4 text-[15px] leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function Mail() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}
