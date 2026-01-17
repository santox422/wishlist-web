"use client";

import Link from "next/link";
import { useState } from "react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Retro style constants
  const retroCard =
    "bg-white border-2 border-black rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]";
  const retroButton =
    "border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-bold";

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
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ED5050] rounded-lg border-2 border-black flex items-center justify-center">
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className="font-black text-black text-lg">Wishii</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#FFD1E6] rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-black mb-4">
              Delete Account
            </h1>
            <p className="text-gray-700 leading-relaxed font-medium">
              Submit a request to delete your account and all associated data.
              This action is permanent and cannot be undone.
            </p>
          </div>

          {/* Form */}
          <div className={`${retroCard} p-6 sm:p-8`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-black text-black mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your account email"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ED5050] focus:border-[#ED5050] transition-all font-medium"
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Message */}
              {status !== "idle" && (
                <div
                  className={`p-4 rounded-xl text-sm font-bold border-2 border-black ${
                    status === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${retroButton} w-full py-4 bg-[#ED5050] text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? "Submitting..." : "Request Account Deletion"}
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 pt-6 border-t-2 border-black border-dashed">
              <h3 className="font-black text-black mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#ED5050] font-bold">•</span>
                  We&apos;ll verify your request within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED5050] font-bold">•</span>
                  Your data will be permanently deleted within 30 days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ED5050] font-bold">•</span>
                  You&apos;ll receive a confirmation email once complete
                </li>
              </ul>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-[#ED5050] hover:text-black font-bold transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 border-t-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-700 font-bold">
            Need help?{" "}
            <a
              href="mailto:wishii.help@gmail.com"
              className="text-[#ED5050] hover:text-black transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
