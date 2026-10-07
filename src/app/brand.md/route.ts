import { brandMarkdown } from "../brand/spec";

/* /brand.md: the brand page as plain markdown, for handing to an agent. */

export const dynamic = "force-static";

export function GET() {
  return new Response(brandMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
