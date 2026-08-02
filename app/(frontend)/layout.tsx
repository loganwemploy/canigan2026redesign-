import type { Metadata } from "next";
import { Cormorant_Garamond, PT_Sans } from "next/font/google";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${cormorant.variable} ${ptSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
