import { BiodataFormData } from "@/types/biodata";

/** True when the user has not entered anything worth previewing or printing. */
export function isBiodataEmpty(data: BiodataFormData): boolean {
  return Object.values(data).every((section) =>
    Object.values(section as Record<string, string>).every(
      (value) => typeof value !== "string" || value.trim() === "",
    ),
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
