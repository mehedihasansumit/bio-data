import { BiodataFormData, DocumentLanguage } from "@/types/biodata";
import {
  formatEducationLine,
  formatParent,
  formatSibling,
  formatSiblingCounts,
  printableSiblings,
} from "@/lib/documentGuards";
import { religionKind } from "@/lib/religion";
import { dateLocale, docString, DocStringKey } from "@/lib/documentStrings";

/**
 * What every document says, independent of how any template says it.
 *
 * Templates own their layout (the Four Voices Rule), but they must not
 * disagree about which fields exist — that is the Content Parity Rule, and
 * hand-copying ~60 rows into four files is how it gets broken. Each template
 * renders this list in its own visual language; none of them decides its
 * contents.
 *
 * This is also the single seam for Document Language: every label and section
 * title in a finished biodata is resolved here, so a template never sees a
 * language and never needs to know one exists.
 */
export type DocRow =
  | { kind: "single"; label: string; value: string }
  | { kind: "pair"; l1: string; v1: string; l2: string; v2: string };

export interface DocSection {
  /** Stable key for React lists. Never translated — this is an id, not a word. */
  id: string;
  title: string;
  rows: DocRow[];
}

const single = (label: string, value: string): DocRow => ({ kind: "single", label, value });
const pair = (l1: string, v1: string, l2: string, v2: string): DocRow => ({
  kind: "pair",
  l1,
  v1,
  l2,
  v2,
});

/**
 * Reduce a row to what actually has content.
 *
 * A label is never printed without its value. A paired row with only one side
 * filled collapses to a single row carrying the filled half — otherwise the
 * empty half leaves a dangling label ("Height" with nothing after it, then
 * "Weight  66 kg"), which reads as missing data rather than an omitted field.
 */
function collapse(row: DocRow): DocRow[] {
  if (row.kind === "single") return row.value ? [row] : [];
  const hasLeft = Boolean(row.v1);
  const hasRight = Boolean(row.v2);
  if (hasLeft && hasRight) return [row];
  if (hasLeft) return [single(row.l1, row.v1)];
  if (hasRight) return [single(row.l2, row.v2)];
  return [];
}

/** Drop what has no value, then drop sections left with no rows. */
function prune(sections: DocSection[]): DocSection[] {
  return sections
    .map((section) => ({ ...section, rows: section.rows.flatMap(collapse) }))
    .filter((section) => section.rows.length > 0);
}

export function documentContent(data: BiodataFormData): DocSection[] {
  const { personal, religious, education, family, address, contact, lifestyle, partner } = data;
  const lang = data.meta.documentLanguage;
  const t = (key: DocStringKey) => docString(key, lang);
  const kind = religionKind(personal.religion);
  const siblings = printableSiblings(data);

  const religiousRows: DocRow[] =
    kind === "hindu"
      ? [
          pair(t("religious.caste"), religious.caste, t("religious.subCaste"), religious.subCaste),
          pair(t("religious.gotra"), religious.gotra, t("religious.manglik"), religious.manglik),
          pair(t("religious.rashi"), religious.rashi, t("religious.nakshatra"), religious.nakshatra),
        ]
      : kind === "muslim"
        ? [
            pair(t("religious.maslak"), religious.maslak, t("religious.prayer"), religious.prayerRegularity),
            single(t("religious.observance"), religious.observance),
          ]
        : [];

  const siblingRows: DocRow[] = siblings.map((sib, i) =>
    single(i === 0 ? t("family.siblingList") : "", formatSibling(sib)),
  );

  return prune([
    {
      id: "personal",
      title: t("section.personal"),
      rows: [
        single(t("personal.fullName"), personal.fullName),
        single(t("personal.birthPlace"), personal.birthPlace),
        pair(
          t("personal.dateOfBirth"),
          personal.dateOfBirth
            ? `${formatDate(personal.dateOfBirth, lang)}${
                personal.age ? ` (${personal.age} ${t("personal.years")})` : ""
              }`
            : "",
          t("personal.timeOfBirth"),
          personal.timeOfBirth,
        ),
        pair(t("personal.height"), personal.height, t("personal.weight"), personal.weight),
        pair(t("personal.bodyType"), personal.bodyType, t("personal.complexion"), personal.complexion),
        pair(t("personal.bloodGroup"), personal.bloodGroup, t("personal.religion"), personal.religion),
        pair(t("personal.motherTongue"), personal.motherTongue, t("personal.maritalStatus"), personal.maritalStatus),
        pair(t("personal.nationality"), personal.nationality, t("personal.hometown"), personal.hometown),
        single(t("personal.health"), personal.healthNotes),
      ],
    },
    {
      id: "religious",
      title: kind === "hindu" ? t("section.horoscope") : t("section.religious"),
      rows: religiousRows,
    },
    {
      id: "education",
      title: t("section.education"),
      rows: [
        single(
          t("education.masters"),
          formatEducationLine(education.masters, education.mastersInstitution, education.mastersYear, education.mastersResult),
        ),
        single(
          t("education.graduation"),
          formatEducationLine(education.graduation, education.graduationInstitution, education.graduationYear, education.graduationResult),
        ),
        single(
          t("education.diploma"),
          formatEducationLine(education.diploma, education.diplomaInstitution, education.diplomaYear, education.diplomaResult),
        ),
        single(
          t("education.hsc"),
          formatEducationLine(education.hsc, education.hscInstitution, education.hscYear, education.hscResult),
        ),
        single(
          t("education.school"),
          formatEducationLine(education.school, education.schoolName, education.schoolYear, education.schoolResult),
        ),
      ],
    },
    {
      id: "career",
      title: t("section.career"),
      rows: [
        pair(t("career.designation"), education.designation, t("career.company"), education.company),
        pair(t("career.employment"), education.employmentType, t("career.workLocation"), education.workLocation),
        pair(t("career.monthlyIncome"), education.monthlyIncome, t("career.annualIncome"), education.annualIncome),
        pair(t("career.experience"), education.experience, t("career.domain"), education.domain),
      ],
    },
    {
      id: "family",
      title: t("section.family"),
      rows: [
        single(t("family.father"), formatParent(family.fatherName, family.fatherStatus, family.fatherOccupation)),
        single(t("family.mother"), formatParent(family.motherName, family.motherStatus, family.motherOccupation)),
        single(t("family.siblingCount"), formatSiblingCounts(data)),
        ...siblingRows,
        single(siblings.length ? "" : t("family.siblingList"), family.siblingsNote),
        pair(t("family.type"), family.familyType, t("family.values"), family.familyValues),
        pair(t("family.economicStatus"), family.economicStatus, t("family.notableRelative"), family.notableRelative),
        single(t("family.nativePlace"), family.nativePlace),
        single(t("family.property"), family.property),
      ],
    },
    {
      id: "address",
      title: t("section.address"),
      rows: [
        single(t("address.present"), address.presentAddress),
        single(t("address.permanent"), address.permanentAddress),
      ],
    },
    {
      id: "lifestyle",
      title: t("section.lifestyle"),
      rows: [
        pair(t("lifestyle.hobbies"), lifestyle.hobbies, t("lifestyle.languages"), lifestyle.languages),
        pair(t("lifestyle.sports"), lifestyle.sports, t("lifestyle.personality"), lifestyle.personality),
        pair(t("lifestyle.diet"), lifestyle.diet, t("lifestyle.smoking"), lifestyle.smoking),
        single(t("lifestyle.drinking"), lifestyle.drinking),
      ],
    },
    {
      id: "partner",
      title: t("section.partner"),
      rows: [
        pair(t("partner.age"), partner.ageRange, t("partner.height"), partner.heightRange),
        pair(t("partner.complexion"), partner.complexion, t("partner.education"), partner.education),
        pair(t("partner.profession"), partner.profession, t("partner.working"), partner.working),
        pair(t("partner.religion"), partner.religion, t("partner.maritalStatus"), partner.maritalStatus),
        pair(t("partner.familyType"), partner.familyType, t("partner.diet"), partner.diet),
        pair(t("partner.location"), partner.location, t("partner.abroad"), partner.abroadAcceptable),
      ],
    },
    {
      id: "contact",
      title: t("section.contact"),
      rows: [
        single(
          t("contact.person"),
          contact.contactPerson
            ? contact.contactRelation
              ? `${contact.contactPerson} (${contact.contactRelation})`
              : contact.contactPerson
            : "",
        ),
        pair(t("contact.phone"), contact.phone, t("contact.alternate"), contact.alternatePhone),
        pair(t("contact.whatsapp"), contact.whatsapp, t("contact.email"), contact.email),
      ],
    },
  ]);
}

/** Facts shown beside the name at the head of every template. */
export function headlineFacts(data: BiodataFormData): string[] {
  const { personal } = data;
  const lang = data.meta.documentLanguage;
  return [
    personal.age && `${personal.age} ${docString("personal.yearsLong", lang)}`,
    personal.height && personal.height.split(" (")[0],
    personal.religion,
    personal.maritalStatus,
    personal.hometown,
  ].filter((v): v is string => Boolean(v));
}

export function formatDate(d: string, lang: DocumentLanguage = "en"): string {
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString(dateLocale(lang), { day: "numeric", month: "long", year: "numeric" });
}
