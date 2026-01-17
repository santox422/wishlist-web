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

        // Use function references directly instead of importing generated API
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎁</div>
          <p className="text-amber-800 font-medium">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !wishlist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-amber-200">
          <div className="text-6xl mb-6">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Wishlist Not Available
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "This wishlist is private or doesn't exist."}
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Wishii
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-amber-200 relative overflow-hidden">
          {/* Decorative ribbon */}
          <div className="absolute -top-2 -right-2 w-24 h-24">
            <div className="absolute transform rotate-45 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center shadow-md">
              ✨ Wishlist
            </div>
          </div>

          {/* Owner info */}
          <div className="flex items-center gap-4 mb-6">
            {wishlist.owner?.picture && (
              <Image
                src={wishlist.owner.picture}
                alt={wishlist.owner.name || "User"}
                width={56}
                height={56}
                className="rounded-full border-2 border-amber-200"
              />
            )}
            <div>
              <p className="text-amber-600 text-sm font-medium">
                Wishlist from
              </p>
              <p className="text-xl font-bold text-gray-900">
                {wishlist.owner?.name || "Anonymous"}
              </p>
            </div>
          </div>

          {/* Wishlist name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 flex items-center gap-3">
            <span className="text-4xl">🎁</span>
            {wishlist.name}
          </h1>

          {/* Wishlist note */}
          {wishlist.note && (
            <p className="text-gray-600 text-lg mb-4 italic">
              &ldquo;{wishlist.note}&rdquo;
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-amber-200">
            <div className="bg-amber-50 rounded-xl px-4 py-2">
              <span className="text-amber-600 text-sm">Total Value</span>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(totalValue)}
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl px-4 py-2">
              <span className="text-amber-600 text-sm">Items</span>
              <p className="text-2xl font-bold text-gray-900">
                {wishes.length}
              </p>
            </div>
          </div>
        </div>

        {/* Wishes Grid */}
        {wishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {wishes.map((wish) => (
              <div
                key={wish._id}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-amber-200 transition-all hover:shadow-xl hover:-translate-y-1 ${
                  wish.isReserved ? "opacity-60" : ""
                }`}
              >
                {/* Image */}
                <div className="aspect-square relative bg-gradient-to-br from-amber-100 to-orange-100">
                  {wish.image ? (
                    <Image
                      src={wish.image}
                      alt={wish.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                      🎁
                    </div>
                  )}

                  {/* Reserved badge */}
                  {wish.isReserved && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      ✓ Reserved
                    </div>
                  )}

                  {/* Must have badge */}
                  {wish.mustHave && !wish.isReserved && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      ⭐ Must Have
                    </div>
                  )}

                  {/* Quantity badge */}
                  {wish.quantity > 1 && (
                    <div className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ×{wish.quantity}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                    {wish.name}
                  </h3>

                  <p className="text-2xl font-bold text-purple-600 mb-2">
                    {formatPrice(wish.price)}
                  </p>

                  {wish.note && (
                    <p className="text-gray-500 text-sm italic mb-3 line-clamp-2">
                      &ldquo;{wish.note}&rdquo;
                    </p>
                  )}

                  {/* Shop button */}
                  {wish.link && (
                    <a
                      href={getAffiliateUrl(wish.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      🛒 Shop at {getStoreName(wish.link)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {wishes.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center mb-8 border border-amber-200">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600">
              This wishlist is empty. Check back later!
            </p>
          </div>
        )}

        {/* Continue to App CTA */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-6 sm:p-8 text-center text-white mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            🎉 Open in Wishii App
          </h2>
          <p className="text-purple-100 mb-6 max-w-md mx-auto">
            Download the app to reserve gifts, create your own wishlists, and
            never miss a gifting moment!
          </p>

          <a
            href={appScheme}
            className="inline-block bg-white text-purple-600 text-lg py-4 px-8 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all mb-6"
          >
            🎁 Continue to App
          </a>

          {/* App store buttons */}
          <div className="border-t border-purple-400 pt-6 mt-2">
            <p className="text-purple-200 text-sm mb-4">
              Don&apos;t have the app yet?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://apps.apple.com/app/wishii-wishlist-gift-app/id6745197846"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
                  alt="Download on App Store"
                  width={135}
                  height={40}
                  className="mx-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=xyz.wishii.app"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  width={155}
                  height={45}
                  className="-my-1 mx-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link
            href="/"
            className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            ← Learn more about Wishii
          </Link>
        </div>
      </div>
    </div>
  );
}
