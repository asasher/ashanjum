import { type Metadata } from "next";
import { Lab } from "./lab";

export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
};

/* ?r=1–4 round, ?v=1… variant, ?copy=revised|current, ?paper=eink, ?trail=fades, ?mode=dark */
export default async function LabPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  return (
    <Lab
      initial={{
        round: q.r === "1" ? 1 : q.r === "2" ? 2 : q.r === "3" ? 3 : 4,
        i: Math.max(0, Number(q.v ?? 1) - 1) || 0,
        // round 4 starts on the revised copy
        revised: q.copy ? q.copy === "revised" : !q.r || q.r === "4",
        paper: q.paper === "eink",
        fades: q.trail === "fades",
        mode: q.mode === "dark" ? "dark" : "light",
      }}
    />
  );
}
