import { ConvexHttpClient } from "convex/browser";

// Create Convex HTTP client for server-side usage
// This client is used for server components to fetch data without WebSocket connections
export function getConvexClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
  }

  return new ConvexHttpClient(convexUrl);
}
