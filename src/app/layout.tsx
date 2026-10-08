import { Geist, Geist_Mono } from "next/font/google";
import { landingIdentity } from "@/lib/landingContent";
import "./globals.css";
import { homeSeo, pageMetadata } from "@/lib/seo";
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
const identity = landingIdentity();
export const metadata = pageMetadata(identity, homeSeo);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
