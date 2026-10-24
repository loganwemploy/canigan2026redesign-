import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";
import { EmberAmbient } from "@/components/site/ambient";

/* Emberleaf's type pairing: Fraunces for display, Inter for everything else. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Canigan Health Options — Personal Wellness With Candy",
  description:
    "Explore practical nutrition, healthy-aging, strength, Member savings, and product-sales guidance with Candy of Canigan Health Options.",
  openGraph: {
    title: "Canigan Health Options",
    description:
      "Practical wellness guidance, thoughtful product options, and real follow-through with Candy.",
    type: "website",
  },
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <EmberAmbient />
        {children}
      </body>
    </html>
  );
}
