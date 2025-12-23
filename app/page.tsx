import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-cream)]/80 backdrop-blur-md border-b border-[var(--color-light-gray)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-semibold text-[var(--color-charcoal)]">
              Wishlist
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/delete-account"
              className="text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-soft-amber)] px-4 py-2 rounded-full text-sm text-[var(--color-charcoal)] mb-8">
            <span>✨</span>
            <span>The simple way to share what you want</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-charcoal)] mb-6 leading-tight tracking-tight">
            Wishlists made
            <br />
            <span className="text-[var(--color-accent)]">effortless</span>
          </h1>

          <p className="text-lg text-[var(--color-warm-gray)] max-w-xl mx-auto mb-10 leading-relaxed">
            Create beautiful wishlists, share them with friends and family, and
            never receive an unwanted gift again. It&apos;s that simple.
          </p>

          {/* Download Button - Google Play only */}
          <div className="flex justify-center mb-8">
            <a
              href="https://play.google.com/store/apps/details?id=com.anonymous.wishlistapp"
              className="group relative inline-flex items-center gap-3 bg-[var(--color-charcoal)] text-white px-6 py-4 rounded-xl hover:bg-[var(--color-charcoal)]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.085-.339-.207-.462-.366-.123-.159-.188-.352-.188-.559V2.739c0-.207.065-.4.188-.559.123-.159.281-.281.462-.366zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.627c.449.26.695.65.695 1.103 0 .454-.246.843-.695 1.103l-2.807 1.627-2.537-2.537 2.537-2.537v.614zm-4.406-4.405l10.937 6.333-2.302 2.302-8.635-8.635z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-white/70">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>
          </div>

          <p className="text-sm text-[var(--color-warm-gray)]">
            Free to download • No ads
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--color-charcoal)] mb-4">
            Everything you need
          </h2>
          <p className="text-center text-[var(--color-warm-gray)] mb-12 max-w-lg mx-auto">
            Simple tools to create, organize, and share your wishlists
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-[var(--color-soft-amber)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-[var(--color-charcoal)] mb-2">
                Create Lists
              </h3>
              <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                Add items with links, prices, and images. Organize by occasion
                or category.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-[var(--color-soft-amber)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="font-semibold text-[var(--color-charcoal)] mb-2">
                Share Easily
              </h3>
              <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                Send your wishlist to anyone via link. No account required to
                view.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-[var(--color-soft-amber)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="font-semibold text-[var(--color-charcoal)] mb-2">
                Reserve Gifts
              </h3>
              <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                Friends can mark items as reserved. No more duplicate presents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[var(--color-charcoal)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start wishing?
          </h2>
          <p className="text-white/70 mb-8">
            Download the app and create your first wishlist in minutes.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.anonymous.wishlistapp"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-charcoal)] font-semibold px-8 py-4 rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Download Free
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[var(--color-cream)] border-t border-[var(--color-light-gray)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <span className="font-semibold text-[var(--color-charcoal)]">
                Wishlist
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/legal/terms"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/legal/privacy"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/imprint"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                Imprint
              </Link>
              <Link
                href="/delete-account"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                Delete Account
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--color-light-gray)] text-center">
            <p className="text-sm text-[var(--color-warm-gray)]">
              © {new Date().getFullYear()} Wishlist App. Made with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
