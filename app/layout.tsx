import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wishlist App - Create & Share Wishlists",
  description:
    "Create and share wishlists with friends and family. Never give or receive an unwanted gift again!",
  keywords: [
    "wishlist",
    "gifts",
    "sharing",
    "birthday",
    "christmas",
    "presents",
  ],
  openGraph: {
    title: "Wishlist App",
    description: "Create and share wishlists with friends and family",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
