import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/landing/PageShell";
import BiodataPreview from "@/components/preview/BiodataPreview";
import { findLandingPage, LANDING_PAGES } from "@/lib/landingPages";
import { OG_IMAGE } from "@/lib/site";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/structuredData";

/** Anything not in this list 404s rather than rendering an empty guide. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ guide: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  const page = findLandingPage(guide);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.slug}`,
      type: "article",
      locale: "bn_BD",
      // Repeated because `openGraph` here replaces the root's outright. These
      // are the pages people actually forward, so losing the card here was
      // losing it where it counted.
      images: [OG_IMAGE],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  const page = findLandingPage(guide);
  if (!page) notFound();

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqSchema(page.slug, page.faq)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema(page.slug, page.h1)),
        }}
      />

      {/* The measure and gutters come off in print. The sample sheet inside is
          exactly 190mm — the full width of the page box — so the article's
          24px padding pushed it past the right edge and sliced the photo off.
          The builder's main element already does this; the guides never did. */}
      <article className="max-w-3xl mx-auto px-6 py-10 print:max-w-none print:px-0">
        <nav aria-label="ব্রেডক্রাম্ব" className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            হোম
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-gray-700">{page.h1}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
          {page.h1}
        </h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">{page.lede}</p>

        <div className="mt-7">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center min-h-12 px-7 text-base font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-200"
          >
            নিজের বায়োডাটা বানান — বিনামূল্যে
          </Link>
        </div>

        {page.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 flex flex-col gap-2">
                {section.list.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-emerald-600 shrink-0" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* The worked example. Server-rendered rather than behind the builder's
            client-only boundary, so a crawler sees a complete biodata here. */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">নমুনা</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">{page.sampleCaption}</p>
          {/* headingLevel 3: this sample sits inside the "নমুনা" section, whose
              own h2 is right above it. */}
          <div className="sheet-fit mt-4 overflow-x-auto rounded-lg bg-white shadow-lg">
            <BiodataPreview data={page.sample} template="classic" headingLevel={3} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">সাধারণ প্রশ্ন</h2>
          <dl className="mt-4 flex flex-col gap-5">
            {page.faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-gray-900">{item.q}</dt>
                <dd className="mt-1 text-gray-700 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-lg bg-emerald-50 p-7 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            এখনই আপনার বায়োডাটা তৈরি করুন
          </h2>
          <p className="mt-2 text-gray-700">
            তথ্য পূরণ করুন, চারটি ডিজাইন থেকে বেছে নিন, A4 PDF ডাউনলোড করুন।
            কোনো অ্যাকাউন্ট লাগে না।
          </p>
          <Link
            href="/builder"
            className="mt-5 inline-flex items-center justify-center min-h-12 px-7 text-base font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            শুরু করুন
          </Link>
        </section>
      </article>
    </PageShell>
  );
}
