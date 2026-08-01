import { BiodataFormData, Sibling } from "@/types/biodata";

/** True when a sibling row carries nothing worth printing. */
export function isSiblingEmpty(s: Sibling): boolean {
  return [s.name, s.maritalStatus, s.occupation, s.spouseOccupation, s.location].every(
    (v) => !v || v.trim() === "",
  );
}

/**
 * True when the user has not entered anything worth previewing or printing.
 *
 * `meta` is excluded deliberately. Unlike every other section it is never
 * blank — Candidate Kind and Document Language always hold a value — so
 * counting it would make an untouched biodata look filled in, which would
 * suppress the empty state and start demanding confirmation before clearing a
 * form with nothing in it. Choosing a language is not entering data.
 */
export function isBiodataEmpty(data: BiodataFormData): boolean {
  return Object.entries(data)
    .filter(([name]) => name !== "meta")
    .every(([, section]) =>
      Object.values(section as unknown as Record<string, unknown>).every((value) => {
        if (typeof value === "string") return value.trim() === "";
        // `family.siblings` is the one array in the model; relation and order
        // always carry defaults, so emptiness is decided by the other fields.
        if (Array.isArray(value)) return value.every((s) => isSiblingEmpty(s as Sibling));
        return true;
      }),
    );
}

export function calculateAge(dateOfBirth: string): string {
  if (!dateOfBirth) return "";
  const today = new Date();
  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return "";
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age > 0 ? age.toString() : "";
}
