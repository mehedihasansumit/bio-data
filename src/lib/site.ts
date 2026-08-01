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
