import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * `lastModified` is deliberately omitted. The honest value is "when this page's
 * content last changed", which we don't track; the easy value is `new Date()`,
 * which would claim every page changed on every deploy. Google discounts lastmod
 * it finds untrustworthy, so a missing date is worth more than a false one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/builder`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
