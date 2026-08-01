import type { Metadata } from "next";
import BuilderLoader from "@/components/builder/BuilderLoader";

/**
 * A Server Component, and it has to stay one: `metadata` cannot be exported
 * from a Client Component, so while this file carried `"use client"` the route
 * silently inherited the root layout's title and description — shipping `/` and
 * `/builder` as two URLs with identical metadata. The client-only builder now
 * lives one level down, in `BuilderLoader`.
 */
export const metadata: Metadata = {
  title: "Biodata Builder",
  description:
    "Fill in your details and watch your marriage biodata build itself. Choose from four templates, preview live, and download a print-ready A4 PDF.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "Biodata Builder | BiyerBiodata",
    description:
      "Fill in your details and watch your marriage biodata build itself. Four templates, live preview, print-ready PDF.",
    url: "/builder",
    type: "website",
  },
};

export default function BuilderPage() {
  return <BuilderLoader />;
}
