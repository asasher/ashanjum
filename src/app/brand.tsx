/* Brand marks, outlined from Geist Mono Medium — paths, not text, so nothing
   depends on a font loading. The letter takes currentColor; the star stays
   cobalt. Standalone files and rasters live in /public/brand.

   MarkAStar is the primary mark: "a*" — Anjum means stars, and A* is the
   pathfinding search, which is the job. MarkADot is the earlier alternate. */

const ASTAR_LETTER =
  "M30.3 68.25Q27.11 68.25 24.56 67.1Q22 65.95 20.5 63.85Q19 61.74 19 58.93Q19 54.59 21.65 52.19Q24.3 49.8 29.66 48.71L40.65 46.42Q40.65 38.5 33.75 38.5Q30.56 38.5 28.77 39.97Q26.98 41.43 26.34 44.05L19.57 43.61Q20.53 38.75 24.24 35.75Q27.94 32.75 33.75 32.75Q40.26 32.75 43.68 36.45Q47.09 40.16 47.09 46.67V60.08Q47.09 61.23 47.57 61.71Q48.05 62.19 49.07 62.19H50.99V67.49Q50.61 67.55 49.74 67.61Q48.88 67.68 48.05 67.68Q42.31 67.68 41.16 62.76L41.09 62.63Q39.82 65.12 36.91 66.69Q34.01 68.25 30.3 68.25ZM31.26 62.95Q35.92 62.95 38.28 60.56Q40.65 58.16 40.65 54.14V51.52L31.2 53.44Q28.13 54.08 26.92 55.26Q25.7 56.44 25.7 58.42Q25.7 60.59 27.17 61.77Q28.64 62.95 31.26 62.95Z";

const ASTAR_STAR =
  "M60.7 59.2 56.48 56.39 62.61 48.03H52.91V42.92H62.61L56.48 34.56L60.7 31.75L66.95 40.75L73.27 31.75L77.42 34.56L71.29 42.92H81V48.03H71.29L77.42 56.39L73.27 59.2L66.95 50.2Z";

const ADOT_LETTER =
  "M35.24 73.93Q30.93 73.93 27.49 72.38Q24.05 70.83 22.02 67.99Q20 65.15 20 61.36Q20 55.51 23.57 52.28Q27.14 49.05 34.38 47.59L49.18 44.49Q49.18 33.82 39.89 33.82Q35.58 33.82 33.17 35.8Q30.76 37.78 29.9 41.31L20.77 40.7Q22.07 34.16 27.06 30.11Q32.05 26.07 39.89 26.07Q48.67 26.07 53.27 31.06Q57.88 36.05 57.88 44.84V62.91Q57.88 64.46 58.52 65.11Q59.17 65.75 60.55 65.75H63.13V72.9Q62.61 72.98 61.45 73.07Q60.29 73.16 59.17 73.16Q51.42 73.16 49.87 66.53L49.78 66.36Q48.06 69.71 44.15 71.82Q40.23 73.93 35.24 73.93ZM36.53 66.79Q42.81 66.79 46 63.56Q49.18 60.33 49.18 54.91V51.38L36.44 53.96Q32.31 54.82 30.67 56.41Q29.04 58.01 29.04 60.67Q29.04 63.6 31.02 65.19Q33 66.79 36.53 66.79Z";

const ADOT_DOT = "M68.29 72.9V61.54H80V72.9Z";

type MarkProps = { size?: number; className?: string };

function Mark({
  letter,
  accent,
  size = 22,
  className,
}: MarkProps & { letter: string; accent: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path d={letter} fill="currentColor" />
      <path d={accent} className="fill-cobalt" />
    </svg>
  );
}

export function MarkAStar(props: MarkProps) {
  return <Mark letter={ASTAR_LETTER} accent={ASTAR_STAR} {...props} />;
}

export function MarkADot(props: MarkProps) {
  return <Mark letter={ADOT_LETTER} accent={ADOT_DOT} {...props} />;
}
