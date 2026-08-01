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
 * pure weight. `preload` is off because the site's own copy is still English —
 * the browser fetches this lazily, on the first Bengali glyph. Once Bengali
 * content lands, preload should be turned back on, because the face will then
 * be rendering the largest contentful paint.
 */
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "BiyerBiodata — বিয়ের বায়োডাটা | Marriage Biodata Maker BD & India",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Create a complete marriage biodata online, free. Fill in your details, choose a template, and download a print-ready A4 PDF to share with prospective families.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BiyerBiodata — Marriage Biodata Maker | Bangladesh & India",
    description:
      "Create a beautiful marriage biodata in minutes. Free online biodata maker for Bangladeshi & Indian families. Download as PDF.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BiyerBiodata — Marriage Biodata Maker",
    description:
      "Create a beautiful marriage biodata in minutes. Free, and yours to download as a PDF.",
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
      lang="en"
      className={`${geistSans.variable} ${hindSiliguri.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
