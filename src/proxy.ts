import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Host routing: the lanes are canonical on subdomains —
   ai.ashanjum.com → /ai, agentic.ashanjum.com → /agentic.
   Only the root path is matched, so every other path (including the
   lanes' own /ai and /agentic on any host) passes through untouched. */

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("ai.")) {
    return NextResponse.rewrite(new URL("/ai", request.url));
  }
  if (host.startsWith("agentic.")) {
    return NextResponse.rewrite(new URL("/agentic", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
