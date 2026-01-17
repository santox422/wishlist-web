"use client";

import Link from "next/link";
import { useState } from "react";
import { privacyContent } from "@/lib/legal-content";

export default function PrivacyPage() {
  const [lang, setLang] = useState<"en" | "de">("en");

  // Retro style constants
  const retroCard =
    "bg-white border-2 border-black rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]";

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

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#ED5050] hover:text-black transition-colors font-bold"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-black transition-all ${
                lang === "en"
                  ? "bg-[#ED5050] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#FFD1E6]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("de")}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-black transition-all ${
                lang === "de"
                  ? "bg-[#ED5050] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#FFD1E6]"
              }`}
            >
              Deutsch
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`${retroCard} p-6 sm:p-10`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#FFD1E6] rounded-xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black">
              {lang === "en" ? "Privacy Policy" : "Datenschutzerklärung"}
            </h1>
          </div>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
              {privacyContent[lang]}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm font-bold">
          <Link
            href="/legal/terms"
            className="text-gray-700 hover:text-[#ED5050] transition-colors"
          >
            Terms & Conditions
          </Link>
          <span className="mx-3 text-gray-400">|</span>
          <Link
            href="/legal/imprint"
            className="text-gray-700 hover:text-[#ED5050] transition-colors"
          >
            Imprint
          </Link>
        </div>
      </div>
    </div>
  );
}
