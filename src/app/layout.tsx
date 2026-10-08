import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { landingIdentity } from "@/lib/landingContent";
import "./globals.css";
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
  display: "swap",
});
const identity = landingIdentity(process.env);
export const metadata: Metadata = {
  metadataBase: new URL(identity.domain),
  title: {
    default: "AI Backtest Lab | AI Trading Backtesting & Strategy Analysis",
    template: "%s | AI Backtest Lab",
  },
  description:
    "Backtest crypto strategies, measure performance and risk, and explore our planned Claude-powered research analysis. Built for evidence-driven traders.",
  alternates: { canonical: "/" },
  robots: { index: identity.release, follow: identity.release },
  openGraph: {
    type: "website",
    url: identity.domain,
    siteName: identity.brand,
    title: "Backtest with Data. Understand Your Strategy with AI.",
    description:
      "Quantitative research, inspectable evidence and planned Claude-powered analysis.",
    images: [
      {
        url: "/media/og.png",
        width: 1200,
        height: 630,
        alt: "AI Backtest Lab — Backtest with Data. Understand with AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Backtest Lab",
    description:
      "Quantitative backtesting with Claude-assisted interpretation on the roadmap.",
    images: ["/media/og.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
