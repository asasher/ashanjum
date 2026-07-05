"use client";

import { useMutation } from "convex/react";
import { anyApi } from "convex/server";
import { useState, type FormEvent } from "react";

import { env } from "~/env";

// anyApi keeps the build green before `bunx convex dev` has generated
// convex/_generated; swap for `api` from ../../convex/_generated/api after.
const submitLead = anyApi.leads!.submit!;

const FALLBACK_EMAIL = "as.asher.anjum@gmail.com";

export const SYSTEM_OPTIONS = [
  "True cost per order",
  "P&L, month over month",
  "Review intelligence",
  "Brand-DNA image generation",
  "Ask your legacy system",
  "WhatsApp sales dashboard",
  "Not sure yet — start with the call",
] as const;

type Payload = {
  lane: "umbrella";
  packet?: string;
  name: string;
  company: string;
  email: string;
  sourcePath?: string;
};

/** Exactly three fields. Every extra field is measured loss. */
export function ContactForm({ id }: { id?: string }) {
  if (env.NEXT_PUBLIC_CONVEX_URL) return <ConvexContactForm id={id} />;
  return <ContactFormShell id={id} send={null} />;
}

function ConvexContactForm({ id }: { id?: string }) {
  const submit = useMutation(submitLead);
  return (
    <ContactFormShell
      id={id}
      send={async (p) => void (await submit(p))}
    />
  );
}

function ContactFormShell({
  id,
  send,
}: {
  id?: string;
  send: ((p: Payload) => Promise<void>) | null;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Payload = {
      lane: "umbrella",
      packet: String(data.get("system") ?? "") || undefined,
      name: String(data.get("name") ?? ""),
      company: "",
      email: String(data.get("email") ?? ""),
      sourcePath: "/",
    };

    if (!send) {
      const body = encodeURIComponent(
        `name: ${payload.name}\nemail: ${payload.email}\nsystem: ${payload.packet ?? "—"}`,
      );
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        `20 minutes — ${payload.name}`,
      )}&body=${body}`;
      return;
    }

    setState("sending");
    try {
      await send(payload);
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div id={id} className="border border-rule bg-card p-8">
        <p className="text-xl font-medium text-ink">
          Got it. I reply within one working day, with times.
        </p>
        <p className="mt-2 max-w-prose text-[15px] text-ink-2">
          If your numbers don&apos;t show a defensible leak, I&apos;ll say so
          on the call and we&apos;re done in twenty minutes.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border-0 border-b border-rule bg-transparent px-0 py-2.5 text-[15px] text-ink placeholder:text-ink-4 focus:border-azure focus:outline-none";
  const labelCls =
    "mb-1 block font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase";

  return (
    <form id={id} onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Work email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-system" className={labelCls}>
          What should we look at?
        </label>
        <select
          id="cf-system"
          name="system"
          required
          defaultValue=""
          className={`${inputCls} appearance-none`}
        >
          <option value="" disabled>
            Select
          </option>
          {SYSTEM_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-azure px-7 py-3.5 font-mono text-[13px] tracking-[0.06em] text-white uppercase transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {state === "sending"
            ? "Sending…"
            : "Book 20 minutes — I'll show you where your margin leaks"}
        </button>
      </div>
      <p className="font-mono text-[11px] text-ink-4">
        No deck. Your numbers, if you have them.
      </p>
      {state === "error" && (
        <p className="text-[14px] text-flag">
          That didn&apos;t go through — email me instead at{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">
            {FALLBACK_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
