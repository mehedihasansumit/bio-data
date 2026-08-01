import { BiodataFormData, Sibling } from "@/types/biodata";
import { religionKind } from "@/lib/religion";
import { isSiblingEmpty } from "@/lib/utils";

/**
 * Shared document logic: which sections render, and how compound values read.
 *
 * Shared deliberately: templates own their layout (see the Four Voices Rule in
 * DESIGN.md), but they must not disagree about whether a field exists or how a
 * sibling is worded. When these lived separately in each template, switching
 * template silently added or dropped sections — a Content Parity violation.
 */
export function documentSections(data: BiodataFormData) {
  const { personal, religious, education, family, address, contact, lifestyle, partner } = data;
  const kind = religionKind(personal.religion);

  const hasHindu =
    kind === "hindu" &&
    Boolean(
      religious.caste ||
        religious.subCaste ||
        religious.gotra ||
        religious.rashi ||
        religious.nakshatra ||
        religious.manglik,
    );

  const hasMuslim =
    kind === "muslim" &&
    Boolean(religious.maslak || religious.prayerRegularity || religious.observance);

  return {
    religionKind: kind,
    hasReligious: hasHindu || hasMuslim,
    hasEdu: Boolean(
      education.masters ||
        education.graduation ||
        education.diploma ||
        education.hsc ||
        education.school ||
        education.schoolName,
    ),
    hasCareer: Boolean(
      education.designation ||
        education.company ||
        education.employmentType ||
        education.workLocation ||
        education.monthlyIncome ||
        education.annualIncome ||
        education.experience ||
        education.domain,
    ),
    hasFamily: Boolean(
      family.fatherName ||
        family.motherName ||
        family.siblingsNote ||
        family.brothersCount ||
        family.sistersCount ||
        family.nativePlace ||
        family.property ||
        family.economicStatus ||
        family.notableRelative ||
        family.siblings.some((s) => !isSiblingEmpty(s)),
    ),
    // Address is its own section. It used to be nested inside the contact
    // gate, so filling only the Address tab printed no address at all.
    hasAddress: Boolean(address.presentAddress || address.permanentAddress),
    hasLifestyle: Boolean(
      lifestyle.hobbies ||
        lifestyle.languages ||
        lifestyle.sports ||
        lifestyle.personality ||
        lifestyle.diet ||
        lifestyle.smoking ||
        lifestyle.drinking,
    ),
    hasPartner: Boolean(
      partner.ageRange ||
        partner.heightRange ||
        partner.complexion ||
        partner.education ||
        partner.profession ||
        partner.working ||
        partner.religion ||
        partner.maritalStatus ||
        partner.familyType ||
        partner.diet ||
        partner.location ||
        partner.abroadAcceptable,
    ),
    hasContact: Boolean(
      contact.contactPerson || contact.phone || contact.alternatePhone || contact.whatsapp || contact.email,
    ),
  };
}

/** Siblings that carry something worth printing. */
export function printableSiblings(data: BiodataFormData): Sibling[] {
  return data.family.siblings.filter((s) => !isSiblingEmpty(s));
}

/**
 * One sibling as a single printed line:
 *   "Tanvir Karim — Elder Brother, Married, Banker (spouse: Schoolteacher), Chattogram"
 *
 * One line per person rather than a six-field block: it keeps the clerical
 * register, holds the fixed-column grid, and costs one line instead of six.
 */
export function formatSibling(s: Sibling): string {
  const descriptor = [s.order, s.relation].filter(Boolean).join(" ");
  const occupation = s.occupation
    ? s.spouseOccupation
      ? `${s.occupation} (spouse: ${s.spouseOccupation})`
      : s.occupation
    : s.spouseOccupation
      ? `spouse: ${s.spouseOccupation}`
      : "";

  const tail = [descriptor, s.maritalStatus, occupation, s.location].filter(Boolean).join(", ");
  if (!s.name) return tail;
  return tail ? `${s.name} — ${tail}` : s.name;
}

/** "1 Brother, 2 Sisters" from the count fields, when they are filled. */
export function formatSiblingCounts(data: BiodataFormData): string {
  const { brothersCount, sistersCount } = data.family;
  const parts: string[] = [];
  if (brothersCount) parts.push(`${brothersCount} Brother${brothersCount === "1" ? "" : "s"}`);
  if (sistersCount) parts.push(`${sistersCount} Sister${sistersCount === "1" ? "" : "s"}`);
  return parts.join(", ");
}

/**
 * One education level as a single printed line:
 *   "B.Sc – CSE, Example University (2020) — CGPA 3.65 / 4.00"
 * Returns "" when the level was left blank, so the row self-suppresses.
 */
export function formatEducationLine(
  degree: string,
  institution: string,
  year: string,
  result: string,
): string {
  if (!degree && !institution) return "";
  let line = [degree, institution].filter(Boolean).join(", ");
  if (year) line += ` (${year})`;
  if (result) line += ` — ${result}`;
  return line;
}

/** "Abdul Karim" or "Late Abdul Karim", with occupation appended when present. */
export function formatParent(name: string, status: string, occupation: string): string {
  if (!name) return "";
  const prefixed = status === "Late" ? `Late ${name}` : name;
  return occupation ? `${prefixed} – ${occupation}` : prefixed;
}
