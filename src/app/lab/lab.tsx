"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { COPY } from "~/app/copy";
import { PREVIOUS, ROUND2, ROUND3, ROUND4 } from "./round2";
import { VARIANTS, type Mode } from "./variants";

function Toggle({ on, a, b, onClick }: { on: boolean; a: string; b: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="border-l border-(--fg) px-4 py-2.5">
      <span className={on ? "opacity-50" : "underline underline-offset-4"}>{a}</span>
      {" / "}
      <span className={on ? "underline underline-offset-4" : "opacity-50"}>{b}</span>
    </button>
  );
}

/* The lab shell. Rounds 2 and 3 layer procedural pieces over the live
   homepage (3 puts the path in the page background); round 1 holds the
   full monochrome directions. Keys: 1–5 pick a variant, R cycles rounds,
   C flips copy and T the trail (rounds 2–3), D flips mode (round 1).
   Mode changes do an e-ink refresh: black, white, then the new frame. */
export type Round = 1 | 2 | 3 | 4;
type LabState = { round: Round; i: number; revised: boolean; mode: Mode; fades: boolean; paper: boolean };

const SITE = { 2: ROUND2, 3: ROUND3, 4: ROUND4 } as const;
const next = (r: Round): Round => (r === 1 ? 4 : ((r - 1) as Round));

export function Lab({ initial }: { initial: LabState }) {
  const [round, setRound] = useState<Round>(initial.round);
  const [fades, setFades] = useState(initial.fades);
  const [paper, setPaper] = useState(initial.paper);
  const [i, setI] = useState(initial.i);
  const [mode, setMode] = useState<Mode>(initial.mode);
  const [revised, setRevised] = useState(initial.revised);
  const [flash, setFlash] = useState<0 | 1 | 2>(0);

  const toggleMode = useCallback(() => {
    setFlash(1);
    setTimeout(() => {
      setFlash(2);
      setMode((m) => (m === "light" ? "dark" : "light"));
    }, 90);
    setTimeout(() => setFlash(0), 190);
  }, []);

  const views = round === 1 ? null : SITE[round];
  const count = views ? views.length : VARIANTS.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      const key = e.key.toLowerCase();
      if (n >= 1 && n <= count) setI(n - 1);
      else if (key === "r") {
        setRound(next);
        setI(0);
      } else if (key === "c") setRevised((r) => !r);
      else if (key === "t") setFades((f) => !f);
      else if (key === "p") setPaper((x) => !x);
      else if (key === "d" && (round === 1 || round === 4)) toggleMode();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, round, toggleMode]);

  // keep the URL in step so any view can be linked to
  useEffect(() => {
    const q = new URLSearchParams({ r: String(round), v: String(i + 1) });
    if (round !== 1 && revised !== (round === 4)) q.set("copy", revised ? "revised" : "current");
    if (round === 4 && paper) q.set("paper", "eink");
    if (round === 3 && fades) q.set("trail", "fades");
    if ((round === 1 || round === 4) && mode === "dark") q.set("mode", "dark");
    window.history.replaceState(null, "", `?${q}`);
  }, [round, i, revised, mode, fades, paper]);

  const r1 = VARIANTS[Math.min(i, VARIANTS.length - 1)]!;
  const site = views ? views[Math.min(i, views.length - 1)]! : null;
  const c =
    round === 1
      ? r1.palettes[mode]
      : round === 4 && mode === "dark"
        ? { bg: "#0F1215", fg: "#E8EAED", mid: "#767E8A", line: "#E8EAED" }
        : { bg: "#F5F6F7", fg: "#14171C", mid: "#8F97A1", line: "#14171C" };
  const vars = { "--bg": c.bg, "--fg": c.fg, "--mid": c.mid, "--line": c.line } as CSSProperties;
  const names = (views ?? VARIANTS).map((v) => v.name);

  return (
    <div
      style={vars}
      data-theme={round === 4 ? mode : undefined}
      className="min-h-screen bg-(--bg) text-(--fg)"
    >
      <nav className="sticky top-0 z-30 border-b border-(--fg) bg-(--bg) font-mono text-[11px] tracking-[0.12em] text-(--fg) uppercase">
        <div className="flex flex-wrap items-stretch">
          <button
            onClick={() => {
              setRound(next(round));
              setI(0);
            }}
            className="border-r border-(--fg) px-4 py-2.5 hover:underline"
          >
            Lab · round {round}
          </button>
          {names.map((name, j) => (
            <button
              key={name}
              onClick={() => setI(j)}
              className={`border-r border-(--fg) px-4 py-2.5 ${j === i ? "bg-(--fg) text-(--bg)" : "hover:underline"}`}
            >
              0{j + 1} {name}
            </button>
          ))}
          <div className="ml-auto flex">
            {round === 4 && <Toggle on={paper} a="Cool ground" b="E-ink paper" onClick={() => setPaper((x) => !x)} />}
            {round === 4 && <Toggle on={mode === "dark"} a="Light" b="Dark" onClick={toggleMode} />}
            {round === 3 && (
              <Toggle on={fades} a="Trail stays" b="Fades" onClick={() => setFades((f) => !f)} />
            )}
            {round !== 1 ? (
              <Toggle on={revised} a="Previous copy" b="Live copy" onClick={() => setRevised((r) => !r)} />
            ) : (
              <Toggle on={mode === "dark"} a="Light" b="Dark" onClick={toggleMode} />
            )}
          </div>
        </div>
        <p className="border-t border-(--fg) px-4 py-1.5 text-[10px] tracking-[0.04em] normal-case">
          {site ? site.blurb : r1.blurb}{" "}
          <span className="opacity-60">
            Keys: 1–{count} switch, R round,{" "}
            {round === 1 ? "D mode" : round === 4 ? "D mode, P paper, C copy" : round === 3 ? "C copy, T trail" : "C copy"}.
          </span>
        </p>
      </nav>
      {site ? (
        <site.View key={site.id} copy={revised ? COPY : PREVIOUS} fades={fades} mode={mode} paper={paper} />
      ) : (
        <r1.View key={r1.id} c={c} mode={mode} />
      )}
      {flash !== 0 && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50"
          style={{ background: flash === 1 ? "#000" : "#fff" }}
        />
      )}
    </div>
  );
}
