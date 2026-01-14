import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

// Using Inter as fallback since Satoshi/Cabinet need to be self-hosted
// For production, you'd want to add Satoshi from fontshare.com
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-cabinet",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RevShare | Your Sales Team, Zero Retainer",
  description:
    "We handle your entire sales process—outreach, meeting prep, follow-ups—and only take 15-30% of lifetime client revenue. Zero retainer. Zero risk.",
  keywords: [
    "revenue share",
    "lead generation",
    "cold email",
    "sales team",
    "B2B leads",
    "fractional sales",
    "no retainer",
  ],
  openGraph: {
    title: "RevShare | Your Sales Team, Zero Retainer",
    description:
      "We handle your entire sales process and only take 15-30% of lifetime client revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
