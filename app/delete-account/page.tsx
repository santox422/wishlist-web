"use client";

import Link from "next/link";
import { useState } from "react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Your deletion request has been submitted. We'll process it within 30 days."
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to submit request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-cream)]/80 backdrop-blur-md border-b border-[var(--color-light-gray)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-semibold text-[var(--color-charcoal)]">
              Wishlist
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[var(--color-soft-amber)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🗑️</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Delete Account
            </h1>
            <p className="text-[var(--color-warm-gray)] leading-relaxed">
              Submit a request to delete your account and all associated data.
              This action is permanent and cannot be undone.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--color-light-gray)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--color-charcoal)] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your account email"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-light-gray)] bg-[var(--color-cream)] text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Message */}
              {status !== "idle" && (
                <div
                  className={`p-4 rounded-xl text-sm ${
                    status === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--color-charcoal)] text-white font-semibold rounded-xl hover:bg-[var(--color-charcoal)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Request Account Deletion"}
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-[var(--color-light-gray)]">
              <h3 className="font-semibold text-[var(--color-charcoal)] mb-3">
                What happens next?
              </h3>
              <ul className="space-y-2 text-sm text-[var(--color-warm-gray)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  We&apos;ll verify your request within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  Your data will be permanently deleted within 30 days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  You&apos;ll receive a confirmation email once complete
                </li>
              </ul>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--color-light-gray)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[var(--color-warm-gray)]">
            Need help?{" "}
            <a
              href="mailto:wishii.help@gmail.com"
              className="text-[var(--color-charcoal)] hover:text-[var(--color-accent)] transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
