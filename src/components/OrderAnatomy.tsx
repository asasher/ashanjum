"use client";

import { useMemo, useRef, useState } from "react";

/**
 * The page's signature demo: the anatomy of one delivery order, taken
 * apart the way the delivered order-economics model does it — Gross Order
 * Value down to Net Income, using the model's real fee taxonomy
 * (merchant- vs platform-funded discounts, commission, payment fee, VAT,
 * other fees). The visitor presses the button, deduction lines land in
 * sequence, and a commission slider re-evaluates the whole order live.
 * Simulated numbers, user-triggered, no autoplay; prefers-reduced-motion
 * renders the completed state in one step.
 */

const GROSS = 148.0;
const MERCHANT_DISCOUNT = 14.8; // 10% promo, funded by the restaurant
const PLATFORM_DISCOUNT = 12.0; // funded by the platform — costs you nothing
const PAYMENT_FEE_PCT = 2.5;
const VAT_PCT = 5;
const OTHER_FEES = 1.5;

const AED = new Intl.NumberFormat("en-AE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function breakdown(ratePct: number) {
  const commission = (GROSS * ratePct) / 100;
  const paymentFee = (GROSS * PAYMENT_FEE_PCT) / 100;
  const vat = ((commission + paymentFee) * VAT_PCT) / 100;
  const net =
    GROSS - MERCHANT_DISCOUNT - commission - paymentFee - vat - OTHER_FEES;
  return [
    {
      term: "Gross Order Value",
      note: "what the customer saw on the menu",
      amount: GROSS,
      kind: "gross" as const,
    },
    {
      term: "Merchant-Funded Discount",
      note: "the promo — funded by you, not the platform",
      amount: -MERCHANT_DISCOUNT,
      kind: "cost" as const,
    },
    {
      term: "Platform-Funded Discount",
      note: `the platform's promo — their cost, not yours (${AED.format(PLATFORM_DISCOUNT)} to them)`,
      amount: 0,
      kind: "free" as const,
    },
    {
      term: "Commission",
      note: `${ratePct}% of the order`,
      amount: -commission,
      kind: "flag" as const,
    },
    {
      term: "Payment Fee",
      note: `card and processing, ${PAYMENT_FEE_PCT}%`,
      amount: -paymentFee,
      kind: "cost" as const,
    },
    {
      term: "VAT on fees",
      note: `${VAT_PCT}% on commission and payment fee`,
      amount: -vat,
      kind: "cost" as const,
    },
    {
      term: "Other Fees",
      note: "adjustments, admin, the lines nobody reads",
      amount: -OTHER_FEES,
      kind: "cost" as const,
    },
    {
      term: "Net Income",
      note: "what actually reaches your bank",
      amount: net,
      kind: "net" as const,
    },
  ];
}

export function OrderAnatomy() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [shown, setShown] = useState(0);
  const [rate, setRate] = useState(27);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const rows = useMemo(() => breakdown(rate), [rate]);
  const net = rows[rows.length - 1]!.amount;
  const survived = Math.round((net / GROSS) * 100);
  const visible = phase === "done" ? rows.length : shown;

  function run() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setShown(rows.length);
      setPhase("done");
      return;
    }
    setPhase("running");
    setShown(1); // gross line lands immediately
    timer.current = setInterval(() => {
      setShown((n) => {
        if (n + 1 >= rows.length) {
          if (timer.current) clearInterval(timer.current);
          setPhase("done");
        }
        return n + 1;
      });
    }, 340);
  }

  function reset() {
    if (timer.current) clearInterval(timer.current);
    setPhase("idle");
    setShown(0);
    setRate(27);
  }

  return (
    <div className="border border-rule bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft px-5 py-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
          Fig. 01 — Anatomy of an order
        </p>
        <p className="font-mono text-[11px] text-ink-4">
          Built from the order-economics model I run for a 31-brand kitchen
          group. Simulated numbers.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse font-mono text-[13px]">
          <thead>
            <tr className="text-left text-[11px] tracking-[0.1em] text-ink-3 uppercase">
              <th className="px-5 py-3 font-normal">Line</th>
              <th className="px-2 py-3 font-normal">What it is</th>
              <th className="px-5 py-3 text-right font-normal">AED</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((row, i) => {
              const seen = i < visible;
              return (
                <tr
                  key={row.term}
                  className={`border-t border-rule-soft ${
                    seen && row.kind === "flag" ? "bg-flag-wash" : ""
                  } ${row.kind === "net" ? "border-t-2 border-t-rule" : ""}`}
                >
                  <td
                    className={`px-5 py-2.5 ${
                      row.kind === "net"
                        ? "font-medium text-ink"
                        : row.kind === "gross"
                          ? "text-ink"
                          : "text-ink-2"
                    }`}
                  >
                    {seen ? row.term : "—"}
                  </td>
                  <td className="px-2 py-2.5 text-[12px] text-ink-4">
                    {seen ? row.note : phase === "running" ? "…" : ""}
                  </td>
                  <td
                    className={`px-5 py-2.5 text-right ${
                      !seen
                        ? "text-ink-4"
                        : row.kind === "flag"
                          ? "text-flag"
                          : row.kind === "net"
                            ? "font-medium text-ink"
                            : row.kind === "free"
                              ? "text-ink-4"
                              : "text-ink-2"
                    }`}
                  >
                    {seen
                      ? row.amount === 0
                        ? "0.00"
                        : AED.format(row.amount)
                      : "·"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule px-5 py-4">
        {phase === "idle" ? (
          <button
            type="button"
            onClick={run}
            className="bg-azure px-6 py-3 font-mono text-[13px] tracking-[0.06em] text-white uppercase transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
          >
            Break it down →
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-3 font-mono text-[12px] text-ink-2">
              <span className="text-[11px] tracking-[0.1em] text-ink-3 uppercase">
                Commission rate
              </span>
              <input
                type="range"
                min={20}
                max={35}
                step={1}
                value={rate}
                disabled={phase !== "done"}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-36 accent-[var(--v7-azure)]"
              />
              <span className="w-9 tabular-nums">{rate}%</span>
            </label>
            <button
              type="button"
              onClick={reset}
              className="font-mono text-[11px] tracking-[0.1em] text-ink-3 uppercase underline-offset-4 hover:text-ink hover:underline"
            >
              Reset
            </button>
          </div>
        )}

        <p className="font-mono text-[13px] tabular-nums">
          <span className="text-[11px] tracking-[0.1em] text-ink-3 uppercase">
            Survives to your bank{" "}
          </span>
          <span className={phase === "done" ? "text-ink" : "text-ink-3"}>
            AED {AED.format(Math.max(net, 0))}
          </span>
          {phase === "done" && (
            <span className="text-ink-4"> · {survived}% of the menu price</span>
          )}
        </p>
      </div>

      {phase === "done" && (
        <p className="border-t border-rule-soft px-5 py-3 text-[13px] text-ink-2">
          One simulated order. The real model ran this breakdown across
          88,408 order lines and a year of payouts for a 31-brand kitchen
          group — then matched order economics against what actually hit the
          bank, month over month.
        </p>
      )}
    </div>
  );
}
