import { ImageResponse } from "next/og";
import { ConvexHttpClient } from "convex/browser";
import {
  getExchangeRates,
  formatPriceForOwnerSync,
} from "../../../lib/currency";

export const runtime = "edge";

// OG Image dimensions
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Get all configured Convex URLs (for trying both environments)
function getConfiguredConvexUrls(): string[] {
  const urls: string[] = [];

  const prodUrl = process.env.NEXT_PUBLIC_CONVEX_URL_PROD;
  const devUrl = process.env.NEXT_PUBLIC_CONVEX_URL_DEV;

  // Add prod first (more likely to be the production wishlist being shared)
  if (prodUrl) urls.push(prodUrl);
  if (devUrl) urls.push(devUrl);

  return urls;
}

interface WishlistData {
  name: string;
  note?: string;
  owner?: {
    name: string;
    image?: string;
    country?: string;
  };
}

interface WishData {
  _id: string;
  name: string;
  price?: number;
  image?: string;
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let wishlist: WishlistData | null = null;
  let wishes: WishData[] = [];
  let exchangeRates: Record<string, number> = {};

  // Try all configured Convex environments
  const urls = getConfiguredConvexUrls();
  for (const url of urls) {
    try {
      const client = new ConvexHttpClient(url);

      // Fetch wishlist data
      const wishlistData = await client.query(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "publicQueries:getSharedWishlist" as any,
        {
          wishlistId: id,
        },
      );

      if (wishlistData) {
        wishlist = wishlistData;
        // Fetch wishes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wishes = await client.query("publicQueries:getSharedWishes" as any, {
          wishlistId: id,
        });

        // Fetch exchange rates for currency conversion
        exchangeRates = await getExchangeRates();
        break; // Found it, stop searching
      }
    } catch {
      // Continue to next environment
    }
  }

  // Take first 4 wishes for the preview
  const previewWishes = wishes.slice(0, 4);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF5F8",
        padding: 40,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Dotted pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.1,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#ED5050",
            borderRadius: 12,
            border: "3px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
            boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
          }}
        >
          <span style={{ color: "white", fontSize: 32, fontWeight: 900 }}>
            W
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 24,
              color: "#ED5050",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Wishlist from {wishlist?.owner?.name || "Someone"}
          </span>
          <span
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "black",
            }}
          >
            {wishlist?.name || "Wishlist"}
          </span>
        </div>
      </div>

      {/* Wishes grid */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: 20,
        }}
      >
        {previewWishes.map((wish, index) => (
          <div
            key={wish._id || index}
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 24,
              border: "3px solid black",
              boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image placeholder */}
            <div
              style={{
                height: 180,
                backgroundColor: "#FFD1E6",
                borderBottom: "3px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {wish.image ? (
                <img
                  src={wish.image}
                  alt={wish.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: 48 }}>🎁</span>
              )}
            </div>

            {/* Details */}
            <div
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "black",
                  marginBottom: 8,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {wish.name}
              </span>
              {wish.price && (
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#ED5050",
                  }}
                >
                  {formatPriceForOwnerSync(
                    wish.price ?? 0,
                    wishlist?.owner?.country,
                    exchangeRates,
                  )}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Show "more" card if there are more wishes */}
        {wishes.length > 4 && (
          <div
            style={{
              width: 200,
              backgroundColor: "#FFD1E6",
              borderRadius: 24,
              border: "3px solid black",
              boxShadow: "5px_5px_0px_0px_rgba(0,0,0,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 900, color: "black" }}>
              +{wishes.length - 4}
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "black" }}>
              more
            </span>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#ED5050",
            color: "white",
            padding: "16px 40px",
            borderRadius: 999,
            border: "3px solid black",
            boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
            fontSize: 24,
            fontWeight: 900,
          }}
        >
          Open in Wishii App →
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
