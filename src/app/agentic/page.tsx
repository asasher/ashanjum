import { type Metadata } from "next";
import Link from "next/link";

import styles from "./agentic.module.css";
import { AgenticContact } from "./AgenticContact";
import { DubaiTime } from "./DubaiTime";
import { TriageLoopDemo } from "./TriageLoopDemo";

export const metadata: Metadata = {
  title: "Your external CTO in the age of AI",
  description:
    "I help teams ship with agentic development. The workflow is free and public on GitHub. I set it up inside your business and stay on call while your team runs it.",
};

const SKILL_URL = "https://github.com/asasher/asher-skills";
const TRIAGE_URL =
  "https://github.com/asasher/asher-skills/tree/main/skills/triage";

const LOOP = [
  {
    num: "01",
    name: "Groom the backlog",
    body: "We classify every issue by work-type, resolve duplicates and dependencies, and label what is genuinely ready for an agent. Humans decide; nothing is ready by default.",
    cmd: "triage groom",
  },
  {
    num: "02",
    name: "Make issues agent-ready",
    body: "Scope, acceptance criteria, and your repo's own playbooks — conventions, environment, review rules — written down where agents can follow them.",
    cmd: "triage setup",
  },
  {
    num: "03",
    name: "Agents do the work",
    body: "Ready issues dispatch into isolated threads: plan, implement, verify against acceptance criteria, then an adversarial reviewer-fixer loop until it holds up.",
    cmd: "triage run",
  },
  {
    num: "04",
    name: "Humans review & merge",
    body: "Every thread ends as a pull request with evidence attached — what was built, how it was verified. Your team stays the judge of what ships.",
    cmd: "gh pr review",
  },
];

const GAPS = [
  {
    strong: "Your conventions.",
    rest: " Naming, structure, idioms — agents that ignore them produce PRs nobody wants to merge.",
  },
  {
    strong: "Your CI and environments.",
    rest: " How the app runs, seeds, and verifies locally decides whether agent PRs arrive green or wasted.",
  },
  {
    strong: "Your review culture.",
    rest: " What your senior engineers actually block on becomes the adversarial reviewer's playbook.",
  },
  {
    strong: "Your issue hygiene.",
    rest: " The loop is only as good as the backlog feeding it. Grooming is a discipline, not a one-off.",
  },
];

const FAQ = [
  {
    q: "Which stacks and repos does this work with?",
    a: "Anything on GitHub with a test story — the workflow is stack-agnostic. The setup phase writes playbooks for your specific repos: how to run the app, seed data, verify changes, and what reviewers block on. Monorepos and multi-repo setups both work.",
  },
  {
    q: "What does my team need before setup?",
    a: "A GitHub backlog (messy is fine — grooming it is step one), at least one engineer who owns review, and Claude-class agent access. If you have none of the last, the setup week includes getting it provisioned.",
  },
  {
    q: "Why is the skill free?",
    a: "Because the skill was never the hard part. It encodes the workflow; it cannot know your codebase, your conventions, or your people. I would rather you read the source and arrive convinced than pay for a black box. The setup and the judgment are what I charge for.",
  },
];

export default function AgenticPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.headerRow}>
            <Link href="/agentic" className={styles.wordmark}>
              a.<span> / agentic</span>
            </Link>
            <nav className={styles.headerLinks}>
              <a
                className={styles.quietLink}
                href={TRIAGE_URL}
                target="_blank"
                rel="noreferrer"
              >
                the skill ↗
              </a>
              <a className={styles.quietLink} href="#book">
                book 30 min
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <p className={styles.eyebrow}>
              Ash Anjum — external CTO · Dubai · for teams building software
            </p>
            <h1 className={styles.heroTitle}>
              Your external CTO in the age of AI.
            </h1>
            <p className={styles.heroSub}>
              I help software teams ship with agentic development — backlog in,
              reviewed pull requests out. <strong>The workflow is free and
              public.</strong> What I sell: setting it up inside your business,
              and staying on call while your team runs it.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.cta} href="#book">
                [ Book 30 minutes — bring your backlog ]
              </a>
              <a
                className={styles.ghLink}
                href={TRIAGE_URL}
                target="_blank"
                rel="noreferrer"
              >
                read the skill on GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>The workflow — free</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Backlog in. Reviewed pull requests out.
            </h2>
            <p className={styles.lede}>
              This is <a href={TRIAGE_URL}>triage</a> — the workflow I run
              daily on my own production systems. It is public, documented, and
              yours to take. No email wall.
            </p>
            <div className={styles.loop}>
              {LOOP.map((s) => (
                <div className={styles.step} key={s.num}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <h3 className={styles.stepName}>{s.name}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                  <span className={`${styles.stepCmd} ${styles.mono}`}>
                    {s.cmd}
                  </span>
                </div>
              ))}
            </div>
            <TriageLoopDemo />
            <div className={styles.cmdStrip}>
              11 subcommands, each with its own contract: <b>groom</b> ·{" "}
              <b>setup</b> · <b>run</b> · <b>diagnose</b> · <b>plan</b> ·{" "}
              <b>prototype</b> · <b>implement</b> · <b>refactor</b> ·{" "}
              <b>verify</b> · <b>evidence</b> · <b>adversarial-review</b>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>The honest part</span>
            </div>
            <h2 className={styles.sectionTitle}>
              The skill is free. The setup is where it succeeds or dies.
            </h2>
            <div className={styles.gapGrid}>
              <div className={styles.gapCol}>
                <h3>What the free skill cannot know:</h3>
                <ul className={styles.gapList}>
                  {GAPS.map((g) => (
                    <li key={g.strong}>
                      <strong>{g.strong}</strong>
                      {g.rest}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.gapCol}>
                <h3>What I do about it:</h3>
                <p className={styles.lede}>
                  I install the workflow in your repos, with your team, on your
                  stack. The setup phase writes your playbooks — how your app
                  runs, how changes get verified, what your reviewers actually
                  block on — so agents produce work your engineers respect. Then
                  your team runs the loop, and I stay on call for the judgment
                  calls: what to automate next, where agents should not be
                  trusted yet, how to keep quality from drifting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Working with me</span>
            </div>
            <h2 className={styles.sectionTitle}>Two ways in.</h2>
            <div className={styles.offers}>
              <div className={styles.offer}>
                <span className={styles.offerTag}>Fixed scope</span>
                <h3 className={styles.offerName}>Setup</h3>
                {/* PENDING ASHER REDLINE: setup price */}
                <p className={styles.offerPrice}>
                  from AED 20,000 <span>· fixed price · 1–2 weeks</span>
                </p>
                <ul className={styles.offerList}>
                  <li>Backlog groomed with your leads — work-typed, deduplicated, readiness-labelled</li>
                  <li>Playbooks written for your repos: environment, conventions, verification, review</li>
                  <li>Agent workflow wired end-to-end and run on real issues, together</li>
                  <li>Your team onboarded — they run the loop, not me</li>
                </ul>
              </div>
              <div className={styles.offer}>
                <span className={styles.offerTag}>Ongoing</span>
                <h3 className={styles.offerName}>On call</h3>
                {/* PENDING ASHER REDLINE: retainer price */}
                <p className={styles.offerPrice}>
                  from AED 6,000/mo{" "}
                  <span>· 3-month minimum · quarterly in advance</span>
                </p>
                <ul className={styles.offerList}>
                  <li>Async access for the judgment calls between releases</li>
                  <li>Weekly call: what shipped, what drifted, what to automate next</li>
                  <li>Playbooks and workflow kept current as your stack moves</li>
                  <li>First refusal on my time when something is on fire</li>
                </ul>
              </div>
            </div>
            <p className={styles.terms}>
              <strong>Terms, upfront:</strong> paid in advance — half on
              signature. Fixed scope, no hourly billing, and everything I write
              in your repos is yours. If that doesn&apos;t fit, we&apos;re not a
              fit.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Why me</span>
            </div>
            <p className={styles.proof}>
              I&apos;m not selling a methodology I read about.{" "}
              <strong>
                This loop runs today on three production systems I build and
                operate
              </strong>{" "}
              — an ETL platform for automotive spare-parts distribution, a
              project-lifecycle management system for IMS onboardings, and a
              legal case-management system for law firms. Three codebases,
              three domains, one workflow. The one on this page is the one I
              use, published as-is.{" "}
              <a href={SKILL_URL} target="_blank" rel="noreferrer">
                Read the source
              </a>{" "}
              — it&apos;s the most honest CV I have.
            </p>
            <p className={styles.sig}>— Ash Anjum</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Questions I get</span>
            </div>
            <div className={styles.faq}>
              {FAQ.map((f) => (
                <div className={styles.faqItem} key={f.q}>
                  <h3 className={styles.faqQ}>{f.q}</h3>
                  <p className={styles.faqA}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="book">
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Next step</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Thirty minutes. Bring your backlog.
            </h2>
            <p className={styles.lede}>
              We look at your actual issues and I tell you honestly whether this
              workflow fits your team — including if it doesn&apos;t.
            </p>
            <AgenticContact />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerRow}>
            <span>
              <DubaiTime />
            </span>
            <Link href="/">ashanjum.com — AI systems for business owners</Link>
            <a href={SKILL_URL} target="_blank" rel="noreferrer">
              github.com/asasher/asher-skills
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
