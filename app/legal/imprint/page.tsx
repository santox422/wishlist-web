"use client";

import Link from "next/link";
import { useState } from "react";
import { imprintContent } from "@/lib/legal-content";

export default function ImprintPage() {
  const [lang, setLang] = useState<"en" | "de">("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-white hover:text-purple-200 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                lang === "en"
                  ? "bg-white text-purple-700"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("de")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                lang === "de"
                  ? "bg-white text-purple-700"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Deutsch
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">ℹ️</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {lang === "en" ? "Imprint" : "Impressum"}
            </h1>
          </div>
          <div className="prose prose-purple max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              {imprintContent[lang]}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-purple-200 text-sm">
          <Link
            href="/legal/terms"
            className="hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
          <span className="mx-3 text-purple-400">|</span>
          <Link
            href="/legal/privacy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
