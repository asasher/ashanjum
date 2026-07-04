"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState, type ReactNode } from "react";

import { env } from "~/env";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() =>
    env.NEXT_PUBLIC_CONVEX_URL
      ? new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)
      : null,
  );

  if (!client) return <>{children}</>;
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
