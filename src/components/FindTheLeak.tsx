"use client";

import { useMemo, useRef, useState } from "react";

/**
 * The page's signature demo: a toy reconciliation ledger. The visitor
 * presses Reconcile, lines get checked in sequence against the contracted
 * commission rate, disputed lines flag with a reason, and a recoverable
 * total tallies. After the first pass the rate slider re-evaluates the
 * ledger live. Simulated numbers, user-triggered, no autoplay;
 * prefers-reduced-motion renders the completed state in one step.
 */

type Row = {
  id: string;
  platform: string;
  total: number;
  feeCharged: number;
  /** Non-commission dispute independent of the slider. */
  fixedDispute?: { reason: string; amount: number };
};

const ROWS: Row[] = [
  { id: "ORD-4821", platform: "PLT-A", total: 148.0, feeCharged: 39.96 },
  { id: "ORD-4822", platform: "PLT-B", total: 212.0, feeCharged: 63.6 },
  { id: "ORD-4823", platform: "PLT-A", total: 96.5, feeCharged: 26.06 },
  {
    id: "ORD-4824",
    platform: "PLT-C",
    total: 305.0,
    feeCharged: 82.35,
    fixedDispute: {
      reason: "refund deducted — order was delivered",
      amount: 305.0,
    },
  },
  { id: "ORD-4825", platform: "PLT-B", total: 174.0, feeCharged: 47.0 },
  { id: "ORD-4826", platform: "PLT-A", total: 231.5, feeCharged: 71.77 },
  {
    id: "ORD-4827",
    platform: "PLT-C",
    total: 128.0,
    feeCharged: 34.56,
    fixedDispute: {
      reason: "commission charged on a cancelled order",
      amount: 34.56,
    },
  },
  { id: "ORD-4828", platform: "PLT-B", total: 89.0, feeCharged: 24.03 },
  { id: "ORD-4829", platform: "PLT-A", total: 342.0, feeCharged: 99.18 },
  { id: "ORD-4830", platform: "PLT-C", total: 156.0, feeCharged: 42.12 },
];

const AED = new Intl.NumberFormat("en-AE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function disputeFor(row: Row, ratePct: number) {
  if (row.fixedDispute) return row.fixedDispute;
  const expected = (row.total * ratePct) / 100;
  const over = row.feeCharged - expected;
  if (over > 0.5) {
    return {
      reason: `charged ${((row.feeCharged / row.total) * 100).toFixed(0)}% against a ${ratePct}% contract`,
      amount: over,
    };
  }
  return null;
}

export function FindTheLeak() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [checked, setChecked] = useState(0);
  const [rate, setRate] = useState(27);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const disputes = useMemo(
    () => ROWS.map((r) => disputeFor(r, rate)),
    [rate],
  );

  const visible = phase === "done" ? ROWS.length : checked;
  const recoverable = disputes
    .slice(0, visible)
    .reduce((sum, d) => sum + (d?.amount ?? 0), 0);
  const flaggedCount = disputes.slice(0, visible).filter(Boolean).length;

  function reconcile() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setChecked(ROWS.length);
      setPhase("done");
      return;
    }
    setPhase("running");
    setChecked(0);
    timer.current = setInterval(() => {
      setChecked((n) => {
        if (n + 1 >= ROWS.length) {
          if (timer.current) clearInterval(timer.current);
          setPhase("done");
        }
        return n + 1;
      });
    }, 150);
  }

  function reset() {
    if (timer.current) clearInterval(timer.current);
    setPhase("idle");
    setChecked(0);
    setRate(27);
  }

  return (
    <div className="border border-rule bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft px-5 py-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
          Fig. 01 — Find the leak
        </p>
        <p className="font-mono text-[11px] text-ink-4">
          A toy version of the real system. Simulated numbers.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse font-mono text-[13px]">
          <thead>
            <tr className="text-left text-[11px] tracking-[0.1em] text-ink-3 uppercase">
              <th className="px-5 py-3 font-normal">Order</th>
              <th className="px-2 py-3 font-normal">Platform</th>
              <th className="px-2 py-3 text-right font-normal">Total AED</th>
              <th className="px-2 py-3 text-right font-normal">Fee taken</th>
              <th className="px-5 py-3 font-normal">Finding</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {ROWS.map((row, i) => {
              const seen = i < visible;
              const dispute = seen ? disputes[i] : null;
              return (
                <tr
                  key={row.id}
                  className={`border-t border-rule-soft ${
                    dispute ? "bg-flag-wash" : ""
                  }`}
                >
                  <td className="px-5 py-2.5 text-ink-2">{row.id}</td>
                  <td className="px-2 py-2.5 text-ink-3">{row.platform}</td>
                  <td className="px-2 py-2.5 text-right text-ink-2">
                    {AED.format(row.total)}
                  </td>
                  <td className="px-2 py-2.5 text-right text-ink-2">
                    {AED.format(row.feeCharged)}
                  </td>
                  <td className="px-5 py-2.5">
                    {!seen ? (
                      <span className="text-ink-4">
                        {phase === "idle" ? "—" : "…"}
                      </span>
                    ) : dispute ? (
                      <span className="text-flag">
                        ⚑ {dispute.reason} · {AED.format(dispute.amount)}
                      </span>
                    ) : (
                      <span className="text-ink-4">✓ matched</span>
                    )}
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
            onClick={reconcile}
            className="bg-azure px-6 py-3 font-mono text-[13px] tracking-[0.06em] text-white uppercase transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
          >
            Reconcile →
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-3 font-mono text-[12px] text-ink-2">
              <span className="text-[11px] tracking-[0.1em] text-ink-3 uppercase">
                Your contracted rate
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
            Recoverable{" "}
          </span>
          <span className={flaggedCount ? "text-flag" : "text-ink-3"}>
            AED {AED.format(recoverable)}
          </span>
          {phase === "done" && (
            <span className="text-ink-4"> · {flaggedCount} lines</span>
          )}
        </p>
      </div>

      {phase === "done" && (
        <p className="border-t border-rule-soft px-5 py-3 text-[13px] text-ink-2">
          Ten orders, one brand, one day. The real pipeline ran 88,408 order
          lines across 31 brands — every line checked like this, every dispute
          filed inside the platform&apos;s window.
        </p>
      )}
    </div>
  );
}
