"use client";

import { useState } from "react";

/* Download card, one per brand asset. SVG downloads are plain anchors; PNG is
   rasterised in-browser off the SVG so we don't ship a raster for every size. */

function trigger(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function toPng(path: string, target: number, stem: string) {
  const svg = await (await fetch(path)).text();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("could not load svg"));
      img.src = url;
    });
    const w = img.naturalWidth || 100;
    const h = img.naturalHeight || 100;
    const k = target / Math.max(w, h);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * k);
    canvas.height = Math.round(h * k);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    trigger(canvas.toDataURL("image/png"), `${stem}-${target}.png`);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function Btn({
  onClick,
  href,
  download,
  children,
}: {
  onClick?: () => void;
  href?: string;
  download?: string;
  children: React.ReactNode;
}) {
  const cls =
    "border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] " +
    "text-ink-2 uppercase transition-colors hover:border-cobalt hover:text-cobalt";
  if (href) {
    return (
      <a href={href} download={download} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function AssetCard({
  file,
  note,
  onInk = false,
}: {
  file: string;
  note: string;
  onInk?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const path = `/brand/${file}`;
  const stem = file.replace(/\.(svg|png)$/, "");
  const isSvg = file.endsWith(".svg");

  async function copySource() {
    try {
      const svg = await (await fetch(path)).text();
      await navigator.clipboard.writeText(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col border border-line bg-surface">
      <div
        className={`flex h-36 items-center justify-center px-6 ${
          onInk ? "bg-ink" : "bg-ground"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={path}
          alt={note}
          className="max-h-24 w-auto max-w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-line p-4">
        <div>
          <p className="font-mono text-[12px] tracking-[-0.01em] text-ink">
            {file}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-ink-2">{note}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          <Btn href={path} download={file}>
            {isSvg ? "svg" : "png"}
          </Btn>
          {isSvg && (
            <>
              <Btn onClick={() => void toPng(path, 512, stem)}>png 512</Btn>
              <Btn onClick={() => void toPng(path, 1024, stem)}>png 1024</Btn>
              <Btn onClick={() => void copySource()}>
                {copied ? "copied" : "copy"}
              </Btn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
