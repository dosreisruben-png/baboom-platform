import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baboom SA | Industrial & Hardware Supplies South Africa",
    template: "%s | Baboom SA",
  },
  description:
    "South Africa's premier industrial and hardware supplier. 19,000+ products including power tools, hand tools, safety equipment, electrical, plumbing, and fasteners. B2B bulk pricing available.",
  keywords: [
    "hardware store South Africa",
    "industrial supplies SA",
    "power tools Johannesburg",
    "B2B hardware",
    "bulk tools South Africa",
  ],
  openGraph: {
    siteName: "Baboom SA",
    type: "website",
    locale: "en_ZA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
