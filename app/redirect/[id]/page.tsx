"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RedirectPage() {
  const params = useParams();
  const id = params.id as string;
  const [countdown, setCountdown] = useState(3);
  const [redirectFailed, setRedirectFailed] = useState(false);

  const appScheme = `wishii://wishlist/${id}`;

  useEffect(() => {
    // Try to open the app
    const tryOpenApp = () => {
      window.location.href = appScheme;
    };

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRedirectFailed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Try to open app immediately
    tryOpenApp();

    return () => clearInterval(timer);
  }, [appScheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-6 animate-pulse">🎁</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Opening Wishlist...
        </h1>

        {!redirectFailed ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-purple-600">
                {countdown}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              If the app doesn&apos;t open automatically, tap the button below.
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              The app didn&apos;t open. You may need to install Wishii first.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={appScheme}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Try Again
              </a>
            </div>
          </>
        )}

        {/* Download buttons */}
        <div className="border-t pt-6 mt-6">
          <p className="text-sm text-gray-500 mb-4">Don&apos;t have the app?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://apps.apple.com/app/YOUR_APP_ID"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
                alt="Download on App Store"
                width={120}
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
                height={48}
                className="-my-1 mx-auto"
              />
            </a>
          </div>
        </div>

        {/* Link to homepage */}
        <Link
          href="/"
          className="inline-block mt-6 text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Wishii
        </Link>
      </div>
    </div>
  );
}
