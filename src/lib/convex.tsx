"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProvider as ConvexProviderBase } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

export const convex = new ConvexReactClient(convexUrl);

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProviderBase client={convex}>{children}</ConvexProviderBase>;
}
