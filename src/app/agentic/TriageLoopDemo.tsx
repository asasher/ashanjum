"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import styles from "./agentic.module.css";

/**
 * The page's toy demo: the triage loop clearing an entire pretend backlog.
 * Starts once when scrolled into view (motion allowed only), mechanical
 * cadence, replay after it settles. Server-rendered at the completed
 * end-state so no-JS and reduced-motion readers get the finished diagram.
 *
 * Stage map (one tick = 800ms), ~19s total:
 *  1 dupe found → 2 dupe folds → 3 #41 groomed → 4 #42 groomed →
 *  5 #44 blocked → 6 #41 dispatched → 7-8 #41 plan/implement →
 *  9 #42 dispatched (threads overlap) → 10 #41 verify · #42 plan →
 *  11 #41 review → 12 PR 87 opens → 13 checks → 14 PR 87 merged, #41
 *  closed · #42 implement → 15 #44 unblocked (decision made) →
 *  16 #42 verified+reviewed → 17 PR 88 opens · #44 dispatched →
 *  18 checks · #44 working → 19 PR 88 merged, #42 closed →
 *  20 #44 verified+reviewed → 21 PR 89 opens → 22 checks →
 *  23 PR 89 merged, #44 closed → 24 backlog clear, settle.
 */

const FINAL_STAGE = 24;
const TICK_MS = 800;

const THREADS = [
  {
    num: "#41",
    title: "Fix intermittent login redirect loop",
    dispatchAt: 6,
    doneAt: 14,
    log: [
      { at: 6, text: "reading the playbooks…" },
      { at: 7, text: "plan → approved" },
      { at: 8, text: "implement · 3 files, tests first" },
      { at: 10, text: "verify · 4/4 acceptance criteria pass" },
      { at: 11, text: "adversarial-review · LGTM after 2 rounds" },
    ],
  },
  {
    num: "#42",
    title: "Export orders to CSV",
    dispatchAt: 9,
    doneAt: 19,
    log: [
      { at: 9, text: "reading the playbooks…" },
      { at: 10, text: "plan → approved" },
      { at: 14, text: "implement · 2 files, tests first" },
      { at: 16, text: "verify ✓ · adversarial-review ✓" },
    ],
  },
  {
    num: "#44",
    title: "Upgrade CI runner",
    dispatchAt: 17,
    doneAt: 23,
    log: [
      { at: 17, text: "reading the playbooks…" },
      { at: 18, text: "plan → implement · config only" },
      { at: 20, text: "verify ✓ · adversarial-review ✓" },
    ],
  },
];

const PRS = [
  {
    num: "#87",
    branch: "fix/login-redirect-loop",
    diff: ["+142", "−38"],
    openAt: 12,
    checksAt: 13,
    mergeAt: 14,
  },
  {
    num: "#88",
    branch: "feat/orders-csv-export",
    diff: ["+96", "−4"],
    openAt: 17,
    checksAt: 18,
    mergeAt: 19,
  },
  {
    num: "#89",
    branch: "chore/ci-runner-upgrade",
    diff: ["+31", "−22"],
    openAt: 21,
    checksAt: 22,
    mergeAt: 23,
  },
];

const CHECKS = ["build", "tests", "lint"];

function phaseOf(stage: number): number {
  if (stage >= FINAL_STAGE) return 4; // settled — all phases past
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
  const [armRatio, setArmRatio] = useState(0);
  // Reserve the tallest height the board ever reaches so it never collapses
  // between ticks — cards mount/unmount and logs append every 800ms, and
  // without this the whole board (and everything below it) jumps each frame.
  const [reservedH, setReservedH] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  // Server (and reduced-motion) render the completed diagram; with JS and
  // motion allowed, the untouched board shows the messy backlog instead.
  const motionOK = useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const stage = mode === "static" ? (motionOK ? 0 : FINAL_STAGE) : rawStage;

  const run = useCallback(() => {
    if (!motionOK) {
      setStage(FINAL_STAGE);
      setMode("done");
      return;
    }
    setStage(0);
    setMode("running");
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setStage((s) => {
        if (s + 1 >= FINAL_STAGE) {
          if (timer.current) clearInterval(timer.current);
          setMode("done");
        }
        return s + 1;
      });
    }, TICK_MS);
  }, [motionOK]);

  // Arm as the board enters the viewport; start once when it is fully
  // visible — or ~60% visible when the board is taller than the viewport
  // realistically allows. Dense thresholds drive the arming bar's fill.
  useEffect(() => {
    if (!motionOK) return;
    const board = boardRef.current;
    if (!board) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;
        setArmRatio(ratio);
        if (startedRef.current) return;
        const viewportH = entry.rootBounds?.height ?? window.innerHeight;
        const tallBoard = entry.boundingClientRect.height > viewportH * 0.8;
        if (ratio >= (tallBoard ? 0.6 : 0.95)) {
          startedRef.current = true;
          run();
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) },
    );
    observer.observe(board);
    return () => observer.disconnect();
  }, [motionOK, run]);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  // Grow the reserved height to match the board's natural content height at
  // each stage; minHeight (a floor) lets a taller stage push it up but keeps
  // shorter stages from shrinking it back, so it only ever settles at the peak.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const h = board.offsetHeight;
    setReservedH((prev) => (h > prev ? h : prev));
  }, [rawStage, mode, motionOK]);

  // A width change (e.g. crossing the single-column breakpoint) invalidates the
  // reserved peak — drop it so the next render re-measures at the new layout.
  useEffect(() => {
    const onResize = () => setReservedH(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const phase = phaseOf(stage);
  const dupeFound = stage >= 1;
  const dupeClosed = stage >= 2;
  const groomed41 = stage >= 3;
  const groomed42 = stage >= 4;
  const blocked44 = stage >= 5 && stage < 15;
  const unblocked44 = stage >= 15;
  const dispatched41 = stage >= 6;
  const dispatched42 = stage >= 9;
  const dispatched44 = stage >= 17;
  const closed41 = stage >= 14;
  const closed42 = stage >= 19;
  const closed44 = stage >= 23;
  const allClear = stage >= FINAL_STAGE;

  return (
    <div className={styles.demo}>
      <div className={styles.demoHead}>
        <span className={styles.demoFig}>Fig. 01 — the loop, running</span>
        <span className={styles.demoNote}>
          A toy repo. The real loop runs on three production systems.
        </span>
      </div>

      {motionOK && (
        <div
          className={`${styles.armRow} ${mode === "done" ? styles.armDone : ""}`}
          aria-hidden="true"
        >
          <span className={styles.armLabel}>
            {mode === "static"
              ? "the loop — arming…"
              : mode === "running"
                ? "the loop — running…"
                : "the loop — complete"}
          </span>
          <span className={styles.armTrack}>
            <span
              className={styles.armFill}
              style={{
                width: `${mode === "static" ? Math.round(armRatio * 100) : 100}%`,
              }}
            />
          </span>
        </div>
      )}

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

      <div
        className={styles.board}
        ref={boardRef}
        style={reservedH ? { minHeight: reservedH } : undefined}
      >
        {/* ---- backlog lane ---- */}
        <div className={styles.lane}>
          <p className={styles.laneTitle}>
            Backlog
            {allClear && (
              <span className={styles.closedTick}> · clear — 0 open</span>
            )}
          </p>

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
              {closed41 && <span className={styles.closedTick}> ✓ closed</span>}
            </p>
            {groomed41 && !closed41 && (
              <ul className={styles.crit}>
                <li>repro documented</li>
                <li>acceptance criteria · 4</li>
              </ul>
            )}
            <p className={styles.chipRow}>
              {groomed41 && <span className={styles.chip}>bug</span>}
              {groomed41 && !closed41 && (
                <span className={styles.chipReady}>ready-for-agent</span>
              )}
              {dupeClosed && (
                <span className={styles.chipQuiet}>#43 folded in</span>
              )}
              {dispatched41 && !closed41 && (
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
              {closed42 && <span className={styles.closedTick}> ✓ closed</span>}
            </p>
            {groomed42 && !closed42 && (
              <ul className={styles.crit}>
                <li>scoped: one endpoint, one button</li>
              </ul>
            )}
            <p className={styles.chipRow}>
              {groomed42 && <span className={styles.chip}>enhancement</span>}
              {groomed42 && !dispatched42 && (
                <span className={styles.chipReady}>ready-for-agent</span>
              )}
              {dispatched42 && !closed42 && (
                <span className={styles.chipQuiet}>→ thread</span>
              )}
            </p>
          </div>

          <div
            className={`${styles.issue} ${dispatched44 ? styles.issueGhost : ""}`}
          >
            <p className={styles.issueTitle}>
              <span className={styles.issueNum}>#44</span>
              Upgrade CI runner
              {closed44 && <span className={styles.closedTick}> ✓ closed</span>}
            </p>
            <p className={styles.chipRow}>
              {blocked44 && (
                <span className={styles.chipBlocked}>
                  blocked · needs a decision
                </span>
              )}
              {unblocked44 && !closed44 && (
                <span className={styles.chipReady}>
                  decision made · unblocked
                </span>
              )}
              {dispatched44 && !closed44 && (
                <span className={styles.chipQuiet}>→ thread</span>
              )}
            </p>
          </div>
        </div>

        {/* ---- agent thread lane ---- */}
        <div className={styles.lane}>
          <p className={styles.laneTitle}>Agent threads</p>
          {stage < THREADS[0]!.dispatchAt && (
            <div className={styles.laneEmpty}>waiting for a ready issue</div>
          )}
          {THREADS.map((t) => {
            if (stage < t.dispatchAt) return null;
            const done = stage >= t.doneAt;
            return (
              <div
                key={t.num}
                className={`${styles.thread} ${done ? styles.issueGhost : ""}`}
              >
                <p className={styles.issueTitle}>
                  <span className={styles.issueNum}>{t.num}</span>
                  {t.title}
                  {done && (
                    <span className={styles.closedTick}> ✓ shipped</span>
                  )}
                </p>
                {!done && (
                  <div className={styles.threadLog}>
                    {t.log.map(
                      (line) =>
                        stage >= line.at && (
                          <p key={line.text} className={styles.logLine}>
                            {line.text}
                          </p>
                        ),
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ---- pull requests lane ---- */}
        <div className={styles.lane}>
          <p className={styles.laneTitle}>Pull requests</p>
          {stage < PRS[0]!.openAt && (
            <div className={styles.laneEmpty}>nothing to review yet</div>
          )}
          {PRS.map((pr) => {
            if (stage < pr.openAt) return null;
            const checksDone = stage >= pr.checksAt;
            const merged = stage >= pr.mergeAt;
            return (
              <div
                key={pr.num}
                className={`${styles.pr} ${merged ? styles.prMerged : ""}`}
              >
                <p className={styles.issueTitle}>
                  <span className={styles.issueNum}>{pr.num}</span>
                  <span className={styles.branch}>{pr.branch}</span>
                </p>
                <p className={styles.diffstat}>
                  <span className={styles.plus}>{pr.diff[0]}</span>{" "}
                  <span className={styles.minus}>{pr.diff[1]}</span> · evidence
                  attached
                </p>
                <p className={styles.chipRow}>
                  {CHECKS.map((c, i) => (
                    <span
                      key={c}
                      className={checksDone ? styles.checkDone : styles.check}
                      style={
                        checksDone
                          ? { transitionDelay: `${i * 150}ms` }
                          : undefined
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
            );
          })}
        </div>
      </div>

      <div className={styles.demoFoot}>
        {mode === "running" && (
          <span className={styles.demoStatus}>running…</span>
        )}
        {mode === "done" && motionOK && (
          <button type="button" className={styles.demoBtnQuiet} onClick={run}>
            replay ↺
          </button>
        )}
        {allClear && (
          <span className={styles.demoStatus}>
            Backlog in. Backlog done. Three reviewed PRs, zero open issues —
            humans groomed, humans merged.
          </span>
        )}
      </div>
    </div>
  );
}
