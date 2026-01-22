import { ConvexHttpClient } from "convex/browser";

// Get Convex client for a specific environment
export function getConvexClient(env: "dev" | "prod") {
  const convexUrl =
    env === "prod"
      ? process.env.NEXT_PUBLIC_CONVEX_URL_PROD
      : process.env.NEXT_PUBLIC_CONVEX_URL_DEV;

  if (!convexUrl) {
    throw new Error(
      `NEXT_PUBLIC_CONVEX_URL_${env.toUpperCase()} environment variable is not set`,
    );
  }

  return new ConvexHttpClient(convexUrl);
}

// Get all configured Convex URLs (for trying both environments)
export function getConfiguredConvexUrls(): {
  env: "dev" | "prod";
  url: string;
}[] {
  const urls: { env: "dev" | "prod"; url: string }[] = [];

  const devUrl = process.env.NEXT_PUBLIC_CONVEX_URL_DEV;
  const prodUrl = process.env.NEXT_PUBLIC_CONVEX_URL_PROD;

  // Add prod first (more likely to be the production wishlist being shared)
  if (prodUrl) {
    urls.push({ env: "prod", url: prodUrl });
  }
  if (devUrl) {
    urls.push({ env: "dev", url: devUrl });
  }

  return urls;
}

// Try to fetch a wishlist from all configured environments
// Returns the first successful result
export async function fetchWishlistFromAnyEnv(wishlistId: string) {
  const urls = getConfiguredConvexUrls();

  if (urls.length === 0) {
    throw new Error(
      "No Convex URLs configured. Set NEXT_PUBLIC_CONVEX_URL_DEV and/or NEXT_PUBLIC_CONVEX_URL_PROD",
    );
  }

  for (const { env, url } of urls) {
    try {
      const client = new ConvexHttpClient(url);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wishlistData = await (client as any).query(
        "publicQueries:getSharedWishlist",
        { wishlistId },
      );

      if (wishlistData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wishesData = await (client as any).query(
          "publicQueries:getSharedWishes",
          { wishlistId },
        );

        return {
          wishlist: wishlistData,
          wishes: wishesData || [],
          env,
        };
      }
    } catch {
      // Continue to next environment if this one fails
      console.log(`Wishlist not found in ${env} environment, trying next...`);
    }
  }

  // Not found in any environment
  return null;
}
