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
  title: "বায়োডাটা বিল্ডার — তথ্য পূরণ করে PDF ডাউনলোড করুন",
  description:
    "তথ্য পূরণ করুন, সঙ্গে সঙ্গে প্রিভিউ দেখুন। চারটি ডিজাইন, বাংলা ও ইংরেজি দুই ভাষা, ছাপার উপযোগী এক পাতার A4 PDF — সম্পূর্ণ বিনামূল্যে।",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "বায়োডাটা বিল্ডার | BiyerBiodata",
    description:
      "তথ্য পূরণ করুন, প্রিভিউ দেখুন, এক পাতার PDF ডাউনলোড করুন। চারটি ডিজাইন, দুই ভাষা, বিনামূল্যে।",
    url: "/builder",
    type: "website",
    locale: "bn_BD",
  },
};

export default function BuilderPage() {
  return <BuilderLoader />;
}
