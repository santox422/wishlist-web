import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Retro style constants
  const retroCard =
    "bg-white border-2 border-black rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]";
  const retroButton =
    "border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-bold";

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

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF5F8]/90 backdrop-blur-md border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ED5050] rounded-lg border-2 border-black flex items-center justify-center">
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className="font-black text-black text-lg">Wishii</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/delete-account"
              className="text-sm text-gray-600 hover:text-black font-bold transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 bg-[#FFD1E6] px-4 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-sm text-black font-bold mb-8`}
          >
            <span>The simple way to share what you want</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
            Wishlists made
            <br />
            <span className="text-[#ED5050]">effortless</span>
          </h1>

          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Create beautiful wishlists, share them with friends and family, and
            never receive an unwanted gift again.
          </p>

          {/* Download Button - Google Play only */}
          <div className="flex justify-center mb-8">
            <a
              href="https://play.google.com/store/apps/details?id=xyz.wishii.app"
              className={`${retroButton} bg-[#ED5050] text-white px-8 py-4 flex items-center gap-3`}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.085-.339-.207-.462-.366-.123-.159-.188-.352-.188-.559V2.739c0-.207.065-.4.188-.559.123-.159.281-.281.462-.366zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.627c.449.26.695.65.695 1.103 0 .454-.246.843-.695 1.103l-2.807 1.627-2.537-2.537 2.537-2.537v.614zm-4.406-4.405l10.937 6.333-2.302 2.302-8.635-8.635z" />
              </svg>
              <span className="font-black">Get it on Google Play</span>
            </a>
          </div>

          <p className="text-sm text-gray-600 font-bold">
            Free to download · No ads
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-black mb-4">
            Everything you need
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-lg mx-auto font-medium">
            Simple tools to create, organize, and share your wishlists
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className={`${retroCard} p-6 text-center`}>
              <div className="w-14 h-14 bg-[#FFD1E6] rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <svg
                  className="w-7 h-7 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="font-black text-black mb-2">Create Lists</h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Add items with links, prices, and images. Organize by occasion
                or category.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`${retroCard} p-6 text-center`}>
              <div className="w-14 h-14 bg-[#FFD1E6] rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <svg
                  className="w-7 h-7 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>
              <h3 className="font-black text-black mb-2">Share Easily</h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Send your wishlist to anyone via link. No account required to
                view.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`${retroCard} p-6 text-center`}>
              <div className="w-14 h-14 bg-[#FFD1E6] rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <svg
                  className="w-7 h-7 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-black text-black mb-2">Reserve Gifts</h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Friends can mark items as reserved. No more duplicate presents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className={`${retroCard} bg-[#FFD1E6] p-8 sm:p-12 text-center`}>
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">
              Ready to start wishing?
            </h2>
            <p className="text-gray-700 mb-8 font-medium">
              Download the app and create your first wishlist in minutes.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=xyz.wishii.app"
              className="inline-block bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden px-3"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={200}
                height={59}
                className="-my-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 border-t-2 border-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#ED5050] rounded-lg border-2 border-black flex items-center justify-center">
                <span className="text-white font-black text-xs">W</span>
              </div>
              <span className="font-black text-black">Wishii</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/legal/terms"
                className="text-gray-600 hover:text-black font-bold transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/legal/privacy"
                className="text-gray-600 hover:text-black font-bold transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/imprint"
                className="text-gray-600 hover:text-black font-bold transition-colors"
              >
                Imprint
              </Link>
              <Link
                href="/delete-account"
                className="text-gray-600 hover:text-black font-bold transition-colors"
              >
                Delete Account
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-black border-dashed text-center">
            <p className="text-sm text-gray-600 font-bold">
              © {new Date().getFullYear()} Wishii. Made with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
