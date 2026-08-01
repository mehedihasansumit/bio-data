/**
 * Which religion-specific field set applies.
 *
 * A Muslim biodata must never show gotra or rashi, and a Hindu one must never
 * show maslak. Rendering both would be clutter in one direction and slightly
 * offensive in the other, so every consumer keys off this single helper.
 */
export type ReligionKind = "muslim" | "hindu" | "none";

export function religionKind(religion: string): ReligionKind {
  const r = religion.trim().toLowerCase();
  if (!r) return "none";
  if (r.startsWith("islam") || r === "muslim") return "muslim";
  if (r.startsWith("hindu")) return "hindu";
  return "none";
}
