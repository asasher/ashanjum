"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import styles from "./agentic.module.css";

/**
 * The page's toy demo: one pass of the triage loop on a pretend repo.
 * User-triggered, mechanical cadence, nothing autoplays. Server-rendered
 * at the completed end-state so no-JS and reduced-motion readers get the
 * finished diagram; with JS and motion allowed it resets to the messy
 * backlog and waits for the button.
 *
 * Stage map (one tick = 800ms):
 *  1 dupe found → 2 dupe closed → 3 #41 groomed → 4 #42 groomed →
 *  5 #44 blocked → 6 #41 dispatched → 7 plan → 8 implement → 9 verify →
 *  10 adversarial review → 11 PR opens → 12 checks + evidence →
 *  13 merged, issue closed → 14 #42 dispatched (loop implied), settle.
 */

const FINAL_STAGE = 14;
const TICK_MS = 800;

const LOG_41 = [
  { at: 7, text: "plan → approved" },
  { at: 8, text: "implement · 3 files, tests first" },
  { at: 9, text: "verify · 4/4 acceptance criteria pass" },
  { at: 10, text: "adversarial-review · LGTM after 2 rounds" },
];

const CHECKS = ["build", "tests", "lint"];

function phaseOf(stage: number): number {
  if (stage >= 13) return 3; // merge
  if (stage >= 11) return 2; // review
  if (stage >= 6) return 1; // run
  if (stage >= 1) return 0; // groom
  return -1;
}

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function TriageLoopDemo() {
  const [rawStage, setStage] = useState(0);
  const [mode, setMode] = useState<"static" | "running" | "done">("static");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Server (and reduced-motion) render the completed diagram; with JS and
  // motion allowed, the untouched board shows the messy backlog instead.
  const motionOK = useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const stage = mode === "static" ? (motionOK ? 0 : FINAL_STAGE) : rawStage;

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  function run() {
    if (!motionOK) {
      setStage(FINAL_STAGE);
      setMode("done");
      return;
    }
    setStage(0);
    setMode("running");
    timer.current = setInterval(() => {
      setStage((s) => {
        if (s + 1 >= FINAL_STAGE) {
          if (timer.current) clearInterval(timer.current);
          setMode("done");
        }
        return s + 1;
      });
    }, TICK_MS);
  }

  const phase = phaseOf(stage);
  const dupeFound = stage >= 1;
  const dupeClosed = stage >= 2;
  const groomed41 = stage >= 3;
  const groomed42 = stage >= 4;
  const blocked44 = stage >= 5;
  const dispatched41 = stage >= 6;
  const prOpen = stage >= 11;
  const checksDone = stage >= 12;
  const merged = stage >= 13;
  const dispatched42 = stage >= 14;

  return (
    <div className={styles.demo}>
      <div className={styles.demoHead}>
        <span className={styles.demoFig}>Fig. 01 — the loop, running</span>
        <span className={styles.demoNote}>
          A toy repo. The real loop runs on three production systems.
        </span>
      </div>

      <div className={styles.phaseStrip} aria-hidden="true">
        {["groom", "run", "review", "merge"].map((p, i) => (
          <span
            key={p}
            className={`${styles.phaseItem} ${
              phase === i ? styles.phaseActive : ""
            } ${phase > i ? styles.phasePast : ""}`}
          >
            {p}
          </span>
        ))}
      </div>

      <div className={styles.board}>
        {/* ---- backlog lane ---- */}
        <div className={styles.lane}>
          <p className={styles.laneTitle}>Backlog</p>

          <div
            className={`${styles.issue} ${dispatched41 ? styles.issueGhost : ""}`}
          >
            <p className={styles.issueTitle}>
              <span className={styles.issueNum}>#41</span>
              {groomed41 ? (
                "Fix intermittent login redirect loop"
              ) : (
                <em>Login sometimes broken?</em>
              )}
              {merged && <span className={styles.closedTick}> ✓ closed</span>}
            </p>
            {groomed41 && !merged && (
              <ul className={styles.crit}>
                <li>repro documented</li>
                <li>acceptance criteria · 4</li>
              </ul>
            )}
            <p className={styles.chipRow}>
              {groomed41 && <span className={styles.chip}>bug</span>}
              {groomed41 && !merged && (
                <span className={styles.chipReady}>ready-for-agent</span>
              )}
              {dupeClosed && (
                <span className={styles.chipQuiet}>#43 folded in</span>
              )}
              {dispatched41 && !merged && (
                <span className={styles.chipQuiet}>→ thread</span>
              )}
            </p>
          </div>

          {!dupeClosed && (
            <div className={styles.issue}>
              <p className={styles.issueTitle}>
                <span className={styles.issueNum}>#43</span>
                <em>login broken on safari??</em>
              </p>
              {dupeFound && (
                <p className={styles.chipRow}>
                  <span className={styles.chipDupe}>duplicate of #41</span>
                </p>
              )}
            </div>
          )}

          <div
            className={`${styles.issue} ${dispatched42 ? styles.issueGhost : ""}`}
          >
            <p className={styles.issueTitle}>
              <span className={styles.issueNum}>#42</span>
              Export orders to CSV
            </p>
            {groomed42 && (
              <ul className={styles.crit}>
                <li>scoped: one endpoint, one button</li>
              </ul>
            )}
            <p className={styles.chipRow}>
              {groomed42 && (
                <span className={styles.chip}>enhancement</span>
              )}
              {groomed42 && !dispatched42 && (
                <span className={styles.chipReady}>ready-for-agent</span>
              )}
              {dispatched42 && (
                <span className={styles.chipQuiet}>→ thread</span>
              )}
            </p>
          </div>

          <div className={styles.issue}>
            <p className={styles.issueTitle}>
              <span className={styles.issueNum}>#44</span>
              Upgrade CI runner
            </p>
            {blocked44 && (
              <p className={styles.chipRow}>
                <span className={styles.chipBlocked}>
                  blocked · needs a decision
                </span>
              </p>
            )}
          </div>
        </div>

        {/* ---- agent thread lane ---- */}
        <div className={styles.lane}>
          <p className={styles.laneTitle}>Agent thread</p>
          {dispatched41 ? (
            <div className={styles.thread}>
              <p className={styles.issueTitle}>
                <span className={styles.issueNum}>#41</span>
                Fix intermittent login redirect loop
              </p>
              <div className={styles.threadLog}>
                {LOG_41.map(
                  (line) =>
                    stage >= line.at && (
                      <p key={line.text} className={styles.logLine}>
                        {line.text}
                      </p>
                    ),
                )}
                {stage >= 6 && stage < 7 && (
                  <p className={styles.logLine}>reading the playbooks…</p>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.laneEmpty}>
              waiting for a ready issue
            </div>
          )}
          {dispatched42 && (
            <div className={styles.thread}>
              <p className={styles.issueTitle}>
                <span className={styles.issueNum}>#42</span>
                Export orders to CSV
              </p>
              <div className={styles.threadLog}>
                <p className={styles.logLine}>plan …</p>
              </div>
            </div>
          )}
        </div>

        {/* ---- pull requests lane ---- */}
        <div className={styles.lane}>
          <p className={styles.laneTitle}>Pull requests</p>
          {prOpen ? (
            <div className={`${styles.pr} ${merged ? styles.prMerged : ""}`}>
              <p className={styles.issueTitle}>
                <span className={styles.issueNum}>#87</span>
                <span className={styles.branch}>
                  fix/login-redirect-loop
                </span>
              </p>
              <p className={styles.diffstat}>
                <span className={styles.plus}>+142</span>{" "}
                <span className={styles.minus}>−38</span> · evidence attached
              </p>
              <p className={styles.chipRow}>
                {CHECKS.map((c, i) => (
                  <span
                    key={c}
                    className={
                      checksDone || stage >= 12 - (CHECKS.length - 1 - i)
                        ? styles.checkDone
                        : styles.check
                    }
                  >
                    {c} {checksDone ? "✓" : "·"}
                  </span>
                ))}
              </p>
              {merged && (
                <p className={styles.chipRow}>
                  <span className={styles.chipMerged}>
                    approved by your reviewer · merged
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div className={styles.laneEmpty}>
              nothing to review yet
            </div>
          )}
        </div>
      </div>

      <div className={styles.demoFoot}>
        {mode === "static" && motionOK ? (
          <button type="button" className={styles.demoBtn} onClick={run}>
            [ Run the loop → ]
          </button>
        ) : mode === "running" ? (
          <span className={styles.demoStatus}>running…</span>
        ) : (
          <button type="button" className={styles.demoBtnQuiet} onClick={run}>
            replay ↺
          </button>
        )}
        {stage >= FINAL_STAGE && (
          <span className={styles.demoStatus}>
            One issue in, one reviewed PR out — and the next thread already
            picked up. Humans groomed, humans merged.
          </span>
        )}
      </div>
    </div>
  );
}
