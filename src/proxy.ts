import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Host routing: the lanes are canonical on subdomains —
   ai.ashanjum.com/* → /ai/*, agentic.ashanjum.com/* → /agentic/*.
   Paths that already carry the lane prefix pass through, so /ai and
   /agentic stay reachable on any host. Asset and API paths never reach
   the proxy (see matcher). */

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;
  if (host.startsWith("ai.") && !pathname.startsWith("/ai")) {
    return NextResponse.rewrite(
      new URL(pathname === "/" ? "/ai" : `/ai${pathname}`, request.url),
    );
  }
  if (host.startsWith("agentic.") && !pathname.startsWith("/agentic")) {
    return NextResponse.rewrite(
      new URL(
        pathname === "/" ? "/agentic" : `/agentic${pathname}`,
        request.url,
      ),
    );
  }
  return NextResponse.next();
}

export const config = {
  /* Everything except API routes, Next internals, and file requests
     (anything with an extension — images, fonts, favicon, …). */
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
