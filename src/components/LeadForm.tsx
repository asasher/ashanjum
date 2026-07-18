"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";

import { env } from "~/env";

const submitLead = api.leads.submit;

type Lane = "umbrella" | "delivery-margin-recovery" | "review-insights";

type Payload = {
  lane: Lane;
  packet?: string;
  name: string;
  company: string;
  email: string;
  whatsapp?: string;
  venues?: string;
  monthlyDeliveryGmv?: string;
  notes?: string;
  sourcePath?: string;
};

const FALLBACK_EMAIL = "as.asher.anjum@gmail.com";

type LeadFormProps = {
  lane: Lane;
  heading: string;
  subheading: string;
  askVenues?: boolean;
  /** When set, renders a "which system" select recorded on the lead. */
  packets?: readonly string[];
  ctaLabel?: string;
};

export function LeadForm(props: LeadFormProps) {
  // useMutation requires a ConvexProvider; only mount it when a client exists.
  if (env.NEXT_PUBLIC_CONVEX_URL) return <ConvexLeadForm {...props} />;
  return <LeadFormShell {...props} send={null} />;
}

function ConvexLeadForm(props: LeadFormProps) {
  const submit = useMutation(submitLead);
  return (
    <LeadFormShell {...props} send={async (p) => void (await submit(p))} />
  );
}

function LeadFormShell({
  lane,
  heading,
  subheading,
  askVenues = false,
  packets,
  ctaLabel = "Book a Profit Audit →",
  send,
}: LeadFormProps & { send: ((p: Payload) => Promise<void>) | null }) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Payload = {
      lane,
      packet: packets
        ? String(data.get("packet") ?? "") || undefined
        : undefined,
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? "") || undefined,
      venues: askVenues
        ? String(data.get("venues") ?? "") || undefined
        : undefined,
      monthlyDeliveryGmv: askVenues
        ? String(data.get("gmv") ?? "") || undefined
        : undefined,
      notes: String(data.get("notes") ?? "") || undefined,
      sourcePath: pathname,
    };

    if (!send) {
      const body = encodeURIComponent(
        Object.entries(payload)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${String(v)}`)
          .join("\n"),
      );
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        `Profit Audit request — ${payload.company || payload.name}`,
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
      <div className="border border-line bg-panel-3 p-8">
        <p className="font-display text-2xl font-bold text-bone">
          Got it. I reply within one working day.
        </p>
        <p className="mt-3 max-w-prose text-bone-dim">
          You&apos;ll get a short email from me with two or three times for the
          call. If your numbers don&apos;t show a defensible leak, I&apos;ll
          tell you that on the call and we&apos;re done in half an hour.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-line bg-panel/60 px-4 py-3 text-bone placeholder:text-bone-dim/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";
  const labelCls =
    "mb-1.5 block font-mono text-xs tracking-wide text-bone-dim uppercase";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div>
        <h3 className="font-display text-3xl font-bold text-bone">{heading}</h3>
        <p className="mt-2 max-w-prose text-bone-dim">{subheading}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${lane}-name`} className={labelCls}>
            Your name
          </label>
          <input
            id={`${lane}-name`}
            name="name"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor={`${lane}-company`} className={labelCls}>
            Company / group
          </label>
          <input
            id={`${lane}-company`}
            name="company"
            required
            autoComplete="organization"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor={`${lane}-email`} className={labelCls}>
            Work email
          </label>
          <input
            id={`${lane}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor={`${lane}-whatsapp`} className={labelCls}>
            WhatsApp (optional)
          </label>
          <input
            id={`${lane}-whatsapp`}
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            className={inputCls}
          />
        </div>
        {askVenues && (
          <>
            <div>
              <label htmlFor={`${lane}-venues`} className={labelCls}>
                Venues / brands
              </label>
              <select
                id={`${lane}-venues`}
                name="venues"
                className={inputCls}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option>1–2</option>
                <option>3–8</option>
                <option>9+</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${lane}-gmv`} className={labelCls}>
                Monthly delivery sales
              </label>
              <select
                id={`${lane}-gmv`}
                name="gmv"
                className={inputCls}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option>Under AED 100k</option>
                <option>AED 100–250k</option>
                <option>AED 250k–1m</option>
                <option>Over AED 1m</option>
              </select>
            </div>
          </>
        )}
      </div>

      {packets && (
        <div>
          <label htmlFor={`${lane}-packet`} className={labelCls}>
            Which system?
          </label>
          <select
            id={`${lane}-packet`}
            name="packet"
            className={inputCls}
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            {packets.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor={`${lane}-notes`} className={labelCls}>
          Anything I should know (optional)
        </label>
        <textarea
          id={`${lane}-notes`}
          name="notes"
          rows={3}
          className={inputCls}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-accent px-8 py-4 font-display text-lg font-bold text-accent-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel-2 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : ctaLabel}
        </button>
        <p className="font-mono text-xs text-bone-dim">
          A short call. Your real numbers. No deck.
        </p>
      </div>
      {state === "error" && (
        <p className="text-accent">
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
