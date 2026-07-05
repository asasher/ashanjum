"use client";

import { useState } from "react";
import styles from "./agentic.module.css";

/**
 * Self-contained lead capture for the agentic lane.
 * Deliberately NOT wired to Convex yet — the orchestrator unifies lead
 * capture across lanes later. Until then this composes a mailto draft,
 * which keeps the page fully sendable with zero backend dependencies.
 */
export function AgenticContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");

  const subject = encodeURIComponent(
    `Agentic setup — ${name || "your backlog"}`,
  );
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nRepos / team / where the backlog hurts:\n${context}\n`,
  );

  return (
    <form
      className={styles.form}
      action={`mailto:as.asher.anjum@gmail.com?subject=${subject}&body=${body}`}
      method="post"
      encType="text/plain"
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ag-name">
          Name
        </label>
        <input
          id="ag-name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ag-email">
          Email
        </label>
        <input
          id="ag-email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="ag-context">
          Repos, team size, where the backlog hurts
        </label>
        <input
          id="ag-context"
          className={styles.input}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. 3 repos, 5 engineers, 200 open issues"
        />
      </div>
      <div>
        <button className={styles.cta} type="submit">
          [ Book 30 minutes — bring your backlog ]
        </button>
        <p className={styles.formNote}>
          Opens as an email to me. I reply within one working day.
        </p>
      </div>
    </form>
  );
}
