import { SITE_NAME, SITE_URL } from "./site";

/**
 * JSON-LD describing the tool itself.
 *
 * This will not produce a rich result. Google's software-app treatment requires
 * an `aggregateRating`, and inventing review counts to earn a star rating is
 * exactly the kind of structured-data spam that draws a manual action. What it
 * does buy is entity understanding: search engines and LLM crawlers can tell
 * what this site *is* — a free browser-based tool — rather than inferring it
 * from marketing copy.
 */
export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/#webapp`,
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  /* The site's own pages are Bengali; the tool itself produces a document in
     either language, which is what `availableLanguage` records. */
  inLanguage: "bn",
  availableLanguage: ["bn", "en"],
  description:
    "বিনামূল্যে বিয়ের বায়োডাটা তৈরি ও PDF ডাউনলোড করার অনলাইন টুল। A free browser-based tool for composing a marriage biodata and downloading it as a print-ready A4 PDF.",
  featureList: [
    "Live preview while typing",
    "Four document templates",
    "Religion-aware fields",
    "Print-ready A4 output",
    "Export and re-import a saved biodata",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BDT",
  },
  creator: {
    "@type": "Person",
    name: "Mehedi Hasan",
    url: "https://www.linkedin.com/in/mehedi-hasan-103621210",
  },
} as const;

/**
 * FAQ markup for a guide page.
 *
 * Worth being clear about what this does and does not buy: since Google's 2023
 * change, FAQPage no longer produces a visible rich result for anyone outside
 * government and health. There will be no accordion in the SERP. It is included
 * because it states, unambiguously, which text on the page is a question and
 * which is its answer — which is what an LLM crawler reads.
 */
export function faqSchema(slug: string, faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${slug}#faq`,
    inLanguage: "bn",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(slug: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}/${slug}`,
      },
    ],
  };
}

/** Renders a schema object into the exact string a `<script>` tag expects. */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
