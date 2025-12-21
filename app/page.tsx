import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-7xl sm:text-8xl mb-6 animate-bounce">🎁</div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            Wishlist App
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-md mx-auto leading-relaxed">
            Create and share wishlists with friends and family. Never give or
            receive an unwanted gift again!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-3xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-white font-semibold mb-2">Create Lists</h3>
            <p className="text-purple-200 text-sm">
              Add wishes with links, prices, and images
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-white font-semibold mb-2">
              Share with Friends
            </h3>
            <p className="text-purple-200 text-sm">
              Invite friends to view your wishlists
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🎉</div>
            <h3 className="text-white font-semibold mb-2">Reserve Gifts</h3>
            <p className="text-purple-200 text-sm">
              No more duplicate presents!
            </p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-12">
          <a
            href="https://apps.apple.com/app/YOUR_APP_ID"
            className="transition-transform hover:scale-105"
          >
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
              alt="Download on App Store"
              className="h-14"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.anonymous.wishlistapp"
            className="transition-transform hover:scale-105"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              className="h-[68px] -my-2"
            />
          </a>
        </div>

        {/* Footer with Legal Links */}
        <footer className="text-center text-purple-300 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link
              href="/legal/terms"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <span className="text-purple-400">|</span>
            <Link
              href="/legal/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-purple-400">|</span>
            <Link
              href="/legal/imprint"
              className="hover:text-white transition-colors"
            >
              Imprint
            </Link>
          </div>
          <p className="text-purple-400">
            © {new Date().getFullYear()} Wishlist App. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
