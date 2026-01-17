"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ConvexHttpClient } from "convex/browser";
import { getAffiliateUrl, getStoreName } from "../../../lib/affiliate";

// Types for wishlist data
interface WishlistOwner {
  name: string | null;
  picture: string | null;
}

interface SharedWishlist {
  _id: string;
  name: string;
  note?: string;
  image?: string;
  visibility: string;
  createdAt: number;
  owner: WishlistOwner | null;
}

interface SharedWish {
  _id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  note?: string;
  mustHave: boolean;
  link?: string;
  isReserved: boolean;
  createdAt: number;
}

export default function WishlistPreviewPage() {
  const params = useParams();
  const id = params.id as string;

  const [wishlist, setWishlist] = useState<SharedWishlist | null>(null);
  const [wishes, setWishes] = useState<SharedWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appScheme = `wishii://wishlist/${id}`;

  useEffect(() => {
    async function loadWishlistData() {
      try {
        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
        if (!convexUrl) {
          setError("Configuration error");
          setLoading(false);
          return;
        }

        const client = new ConvexHttpClient(convexUrl);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wishlistData = await (client as any).query(
          "publicQueries:getSharedWishlist",
          { wishlistId: id }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wishesData = await (client as any).query(
          "publicQueries:getSharedWishes",
          { wishlistId: id }
        );

        if (!wishlistData) {
          setError("Wishlist not found or is private");
        } else {
          setWishlist(wishlistData as SharedWishlist);
          setWishes((wishesData as SharedWish[]) || []);
        }
      } catch (err) {
        console.error("Failed to load wishlist:", err);
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    }

    loadWishlistData();
  }, [id]);

  // Calculate total value
  const totalValue = wishes.reduce(
    (sum, wish) => sum + wish.price * wish.quantity,
    0
  );

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Retro card style
  const retroCard =
    "bg-white border-2 border-black rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]";
  const retroCardHover =
    "hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200";
  const retroButton =
    "border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-bold";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F8] flex items-center justify-center">
        <div className={`${retroCard} p-8 text-center`}>
          <div className="w-12 h-12 border-4 border-black border-t-[#ED5050] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black font-bold text-lg">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !wishlist) {
    return (
      <div className="min-h-screen bg-[#FFF5F8] flex items-center justify-center p-4">
        <div className={`${retroCard} p-8 max-w-md w-full text-center`}>
          <div className="w-16 h-16 bg-[#FFD1E6] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-black mb-4">
            Wishlist Not Available
          </h1>
          <p className="text-gray-700 mb-6 font-medium">
            {error || "This wishlist is private or doesn't exist."}
          </p>
          <Link
            href="/"
            className={`${retroButton} inline-block bg-[#ED5050] text-white py-3 px-8`}
          >
            Go to Wishii
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F8]">
      {/* Dotted pattern background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Header Card */}
        <div
          className={`${retroCard} p-4 sm:p-8 mb-6 sm:mb-8 relative overflow-visible`}
        >
          {/* Corner decoration */}
          <div className="absolute -top-3 -right-3 bg-[#ED5050] text-white px-4 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold text-sm rotate-6">
            Wishlist
          </div>

          {/* Owner info */}
          <div className="flex items-center gap-4 mb-6">
            {wishlist.owner?.picture ? (
              <div className="w-14 h-14 rounded-full border-2 border-black overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src={wishlist.owner.picture}
                  alt={wishlist.owner.name || "User"}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full border-2 border-black bg-[#FFD1E6] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-2xl">
                👤
              </div>
            )}
            <div>
              <p className="text-[#ED5050] text-sm font-bold uppercase tracking-wide">
                Wishlist from
              </p>
              <p className="text-xl font-black text-black">
                {wishlist.owner?.name || "Anonymous"}
              </p>
            </div>
          </div>

          {/* Wishlist name */}
          <h1 className="text-2xl sm:text-4xl font-black text-black mb-3">
            {wishlist.name}
          </h1>

          {/* Wishlist note */}
          {wishlist.note && (
            <p className="text-gray-700 text-lg mb-4 italic font-medium border-l-4 border-[#FFD1E6] pl-4">
              {wishlist.note}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t-2 border-black border-dashed">
            <div className="bg-[#FFD1E6] rounded-2xl px-5 py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-black text-sm font-bold block">
                Total Value
              </span>
              <p className="text-2xl font-black text-black">
                {formatPrice(totalValue)}
              </p>
            </div>
            <div className="bg-[#FFD1E6] rounded-2xl px-5 py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-black text-sm font-bold block">Items</span>
              <p className="text-2xl font-black text-black">{wishes.length}</p>
            </div>
          </div>
        </div>

        {/* Wishes Grid */}
        {wishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {wishes.map((wish) => (
              <div
                key={wish._id}
                className={`${retroCard} ${retroCardHover} overflow-hidden ${
                  wish.isReserved ? "opacity-70" : ""
                }`}
              >
                {/* Image */}
                <div className="aspect-square relative bg-[#FFD1E6] border-b-2 border-black">
                  {wish.image ? (
                    <Image
                      src={wish.image}
                      alt={wish.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-[#999]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Reserved badge */}
                  {wish.isReserved && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-black px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      ✓ Reserved
                    </div>
                  )}

                  {/* Must have badge */}
                  {wish.mustHave && !wish.isReserved && (
                    <div className="absolute top-3 right-3 bg-[#ED5050] text-white text-xs font-black px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      ⭐ Must Have
                    </div>
                  )}

                  {/* Quantity badge */}
                  {wish.quantity > 1 && (
                    <div className="absolute bottom-3 left-3 bg-black text-white text-sm font-black px-3 py-1 rounded-full">
                      ×{wish.quantity}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-black text-black text-lg mb-1 line-clamp-2">
                    {wish.name}
                  </h3>

                  <p className="text-2xl font-black text-[#ED5050] mb-2">
                    {formatPrice(wish.price)}
                  </p>

                  {wish.note && (
                    <p className="text-gray-600 text-sm italic mb-3 line-clamp-2 font-medium">
                      &ldquo;{wish.note}&rdquo;
                    </p>
                  )}

                  {/* Shop button */}
                  {wish.link && (
                    <a
                      href={getAffiliateUrl(wish.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${retroButton} block w-full bg-[#FFD1E6] text-black text-center py-2.5 px-4 text-sm`}
                    >
                      Shop at {getStoreName(wish.link)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {wishes.length === 0 && (
          <div className={`${retroCard} p-8 text-center mb-8`}>
            <div className="w-16 h-16 bg-[#FFD1E6] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
              <svg
                className="w-8 h-8 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-bold">
              This wishlist is empty. Check back later!
            </p>
          </div>
        )}

        {/* Continue to App CTA */}
        <div
          className={`${retroCard} bg-[#FFD1E6] border-black p-6 sm:p-8 text-center mb-8`}
        >
          <h2 className="text-2xl sm:text-3xl font-black text-black mb-3">
            Open in Wishii App
          </h2>
          <p className="text-gray-700 mb-6 max-w-md mx-auto font-medium">
            Download the app to reserve gifts, create your own wishlists, and
            never miss a gifting moment!
          </p>

          <a
            href={appScheme}
            className="inline-block bg-white text-[#ED5050] text-lg py-4 px-10 rounded-full border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-black mb-6"
          >
            Continue to App
          </a>

          {/* App store buttons */}
          <div className="border-t-2 border-black border-dashed pt-6 mt-2">
            <p className="text-gray-600 text-sm mb-4 font-bold">
              Don&apos;t have the app yet?
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=xyz.wishii.app"
              className="inline-block bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden px-2"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={180}
                height={54}
                className="-my-1 mx-auto"
              />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link
            href="/"
            className="text-[#ED5050] hover:text-black font-bold transition-colors inline-flex items-center gap-2"
          >
            ← Learn more about Wishii
          </Link>
        </div>
      </div>
    </div>
  );
}
