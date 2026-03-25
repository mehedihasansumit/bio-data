import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "BiyerBiodata — বিয়ের বায়োডাটা | Marriage Biodata Maker BD & India",
    template: "%s | BiyerBiodata",
  },
  description:
    "Create your marriage biodata online free. বিয়ের বায়োডাটা তৈরি করুন। Best biodata maker for Bangladesh & India. Download PDF — BiodataBD, BiodataGhor, BiyeBiodata.",
  keywords: [
    "biyer biodata",
    "বিয়ের বায়োডাটা",
    "biye biodata",
    "বিয়ে বায়োডাটা",
    "biodata bd",
    "bangladesh biodata",
    "biodata ghor",
    "বায়োডাটা ঘর",
    "marriage biodata",
    "marriage biodata maker",
    "biodata for marriage",
    "biodata format",
    "biodata maker online free",
    "shadi biodata",
    "vivah biodata",
    "biodata for marriage pdf",
    "hindu marriage biodata",
    "muslim marriage biodata",
    "nikah biodata",
    "biodata india",
    "marriage cv bangladesh",
    "বায়োডাটা ফরম্যাট",
    "বায়োডাটা তৈরি",
  ],
  openGraph: {
    title: "BiyerBiodata — Marriage Biodata Maker | Bangladesh & India",
    description:
      "Create a beautiful marriage biodata in minutes. Free online biodata maker for Bangladeshi & Indian families. Download as PDF.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
