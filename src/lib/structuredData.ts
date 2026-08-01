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
  inLanguage: "en",
  description:
    "A free browser-based tool for composing a marriage biodata and downloading it as a print-ready A4 PDF.",
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

/** Renders a schema object into the exact string a `<script>` tag expects. */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
