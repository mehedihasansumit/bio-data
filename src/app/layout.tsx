import type { Metadata } from "next";
import { Geist, Hind_Siliguri } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Bengali companion face for Geist, closing the coverage gap DESIGN.md records
 * under "Open gap — Bengali coverage". Geist has no Bengali glyphs, so without
 * this every Bengali character — including anything a user types into a form —
 * falls through to an arbitrary OS font with unreliable যুক্তাক্ষর rendering.
 *
 * Only the `bengali` subset is requested: Latin never reaches this face because
 * Geist sits ahead of it in the stack, so Hind Siliguri's Latin glyphs would be
 * pure weight. Preloaded (the default) now that the site's own copy is Bengali
 * — this face renders the largest contentful paint on every page, so deferring
 * it to first-glyph discovery would cost exactly the metric it feeds.
 */
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "বিয়ের বায়োডাটা তৈরি করুন — বিনামূল্যে | BiyerBiodata",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "বিয়ের বায়োডাটা অনলাইনে তৈরি করুন, সম্পূর্ণ বিনামূল্যে। তথ্য পূরণ করুন, ডিজাইন বেছে নিন, এক পাতার A4 PDF ডাউনলোড করুন। বাংলা ও ইংরেজি — দুই ভাষাতেই।",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "বিয়ের বায়োডাটা তৈরি করুন — বিনামূল্যে | BiyerBiodata",
    description:
      "তথ্য পূরণ করুন, সঙ্গে সঙ্গে প্রিভিউ দেখুন, ছাপার উপযোগী এক পাতার বায়োডাটা ডাউনলোড করুন। বাংলা ও ইংরেজি দুই ভাষাতেই।",
    url: "/",
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বিয়ের বায়োডাটা তৈরি করুন — বিনামূল্যে",
    description:
      "অনলাইনে বিয়ের বায়োডাটা তৈরি করে PDF ডাউনলোড করুন। বিনামূল্যে, অ্যাকাউন্ট ছাড়াই।",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${hindSiliguri.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
