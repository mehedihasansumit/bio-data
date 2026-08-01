/**
 * The canonical origin for this site.
 *
 * Deliberately a hardcoded constant rather than a Vercel environment variable.
 * Preview deployments each get their own hostname, and if canonicals followed
 * the deploy they would advertise every branch as its own indexable copy of the
 * site. Pinning production here means a preview's canonical points at
 * production, which is exactly what we want a crawler to believe.
 */
export const SITE_URL = "https://bio-data-drab.vercel.app";

export const SITE_NAME = "BiyerBiodata";

/**
 * The share card, named explicitly by every route that sets `openGraph`.
 *
 * Next merges metadata *shallowly*, so a segment that defines `openGraph` at
 * all replaces the parent's whole object — including the `images` that the
 * `opengraph-image.png` file convention injects at the root. Both `/builder`
 * and the four guides define it, which left five of six routes shipping
 * `twitter:card="summary_large_image"` with no image behind it: the pages
 * arrived at from search and forwarded on WhatsApp were the ones with no card.
 *
 * Relative on purpose — `metadataBase` in the root layout resolves it, so it
 * stays correct on preview deployments. Spelled out as an object rather than a
 * bare URL so the alt text and dimensions travel with it.
 *
 * A plain file in `public/`, deliberately not the `opengraph-image` file
 * convention. The convention injects its own entry that wins over the root
 * layout's `images`, so the root ended up with the convention's alt-less image
 * while every child route used this one — the same card described two
 * different ways depending on the URL. One asset, one constant, six identical
 * routes. The trade is the convention's content-hashed URL: this path is
 * stable, so if the card is ever redrawn, rename the file to break scraper
 * caches (Facebook and WhatsApp key their previews on the URL).
 */
export const OG_IMAGE = {
  url: "/og-card.png",
  width: 1200,
  height: 630,
  alt: "বিয়ের বায়োডাটা তৈরি করুন — BiyerBiodata",
} as const;
