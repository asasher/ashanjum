"use client";

import { useState } from "react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="border border-white/20 px-3 py-2 font-mono text-[10px] tracking-[0.15em] text-white uppercase transition-colors hover:border-cobalt-bright hover:text-cobalt-bright"
    >
      {copied ? "copied" : label}
    </button>
  );
}
