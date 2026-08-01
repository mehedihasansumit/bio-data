import { BiodataFormData } from "@/types/biodata";
import {
  formatEducationLine,
  formatParent,
  formatSibling,
  formatSiblingCounts,
  printableSiblings,
} from "@/lib/documentGuards";
import { religionKind } from "@/lib/religion";

/**
 * What every document says, independent of how any template says it.
 *
 * Templates own their layout (the Four Voices Rule), but they must not
 * disagree about which fields exist — that is the Content Parity Rule, and
 * hand-copying ~60 rows into four files is how it gets broken. Each template
 * renders this list in its own visual language; none of them decides its
 * contents.
 */
export type DocRow =
  | { kind: "single"; label: string; value: string }
  | { kind: "pair"; l1: string; v1: string; l2: string; v2: string };

export interface DocSection {
  /** Stable key for React lists. */
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
  const kind = religionKind(personal.religion);
  const siblings = printableSiblings(data);

  const religiousRows: DocRow[] =
    kind === "hindu"
      ? [
          pair("Caste", religious.caste, "Sub-caste", religious.subCaste),
          pair("Gotra", religious.gotra, "Manglik", religious.manglik),
          pair("Rashi", religious.rashi, "Nakshatra", religious.nakshatra),
        ]
      : kind === "muslim"
        ? [
            pair("Maslak / Sect", religious.maslak, "Prayer", religious.prayerRegularity),
            single("Observance", religious.observance),
          ]
        : [];

  const siblingRows: DocRow[] = siblings.map((sib, i) =>
    single(i === 0 ? "Brothers / Sisters" : "", formatSibling(sib)),
  );

  return prune([
    {
      id: "personal",
      title: "Personal Information",
      rows: [
        single("Full Name", personal.fullName),
        single("Birth Place", personal.birthPlace),
        pair(
          "Date of Birth",
          personal.dateOfBirth
            ? `${formatDate(personal.dateOfBirth)}${personal.age ? ` (${personal.age} yrs)` : ""}`
            : "",
          "Time",
          personal.timeOfBirth,
        ),
        pair("Height", personal.height, "Weight", personal.weight),
        pair("Body Type", personal.bodyType, "Complexion", personal.complexion),
        pair("Blood Group", personal.bloodGroup, "Religion", personal.religion),
        pair("Mother Tongue", personal.motherTongue, "Marital Status", personal.maritalStatus),
        pair("Nationality", personal.nationality, "Hometown", personal.hometown),
        single("Health", personal.healthNotes),
      ],
    },
    {
      id: "religious",
      title: kind === "hindu" ? "Community & Horoscope" : "Religious Details",
      rows: religiousRows,
    },
    {
      id: "education",
      title: "Education",
      rows: [
        single(
          "Master's",
          formatEducationLine(education.masters, education.mastersInstitution, education.mastersYear, education.mastersResult),
        ),
        single(
          "Graduation",
          formatEducationLine(education.graduation, education.graduationInstitution, education.graduationYear, education.graduationResult),
        ),
        single(
          "Diploma",
          formatEducationLine(education.diploma, education.diplomaInstitution, education.diplomaYear, education.diplomaResult),
        ),
        single("HSC", formatEducationLine(education.hsc, education.hscInstitution, education.hscYear, education.hscResult)),
        single("SSC / School", formatEducationLine(education.school, education.schoolName, education.schoolYear, education.schoolResult)),
      ],
    },
    {
      id: "career",
      title: "Career & Profession",
      rows: [
        pair("Designation", education.designation, "Company", education.company),
        pair("Employment", education.employmentType, "Work Location", education.workLocation),
        pair("Monthly Income", education.monthlyIncome, "Annual Income", education.annualIncome),
        pair("Experience", education.experience, "Domain", education.domain),
      ],
    },
    {
      id: "family",
      title: "Family Details",
      rows: [
        single("Father", formatParent(family.fatherName, family.fatherStatus, family.fatherOccupation)),
        single("Mother", formatParent(family.motherName, family.motherStatus, family.motherOccupation)),
        single("Siblings", formatSiblingCounts(data)),
        ...siblingRows,
        single(siblings.length ? "" : "Brothers / Sisters", family.siblingsNote),
        pair("Family Type", family.familyType, "Values", family.familyValues),
        pair("Economic Status", family.economicStatus, "Notable Relative", family.notableRelative),
        single("Native Place", family.nativePlace),
        single("Property", family.property),
      ],
    },
    {
      id: "address",
      title: "Address",
      rows: [
        single("Present Address", address.presentAddress),
        single("Permanent Address", address.permanentAddress),
      ],
    },
    {
      id: "lifestyle",
      title: "Lifestyle & Interests",
      rows: [
        pair("Hobbies", lifestyle.hobbies, "Languages", lifestyle.languages),
        pair("Sports", lifestyle.sports, "Personality", lifestyle.personality),
        pair("Diet", lifestyle.diet, "Smoking", lifestyle.smoking),
        single("Drinking", lifestyle.drinking),
      ],
    },
    {
      id: "partner",
      title: "Partner Preference",
      rows: [
        pair("Age", partner.ageRange, "Height", partner.heightRange),
        pair("Complexion", partner.complexion, "Education", partner.education),
        pair("Profession", partner.profession, "Working", partner.working),
        pair("Religion", partner.religion, "Marital Status", partner.maritalStatus),
        pair("Family Type", partner.familyType, "Diet", partner.diet),
        pair("Location", partner.location, "Abroad", partner.abroadAcceptable),
      ],
    },
    {
      id: "contact",
      title: "Contact Details",
      rows: [
        single(
          "Contact Person",
          contact.contactPerson
            ? contact.contactRelation
              ? `${contact.contactPerson} (${contact.contactRelation})`
              : contact.contactPerson
            : "",
        ),
        pair("Phone", contact.phone, "Alternate", contact.alternatePhone),
        pair("WhatsApp", contact.whatsapp, "Email", contact.email),
      ],
    },
  ]);
}

/** Facts shown beside the name at the head of every template. */
export function headlineFacts(data: BiodataFormData): string[] {
  const { personal } = data;
  return [
    personal.age && `${personal.age} Years`,
    personal.height && personal.height.split(" (")[0],
    personal.religion,
    personal.maritalStatus,
    personal.hometown,
  ].filter((v): v is string => Boolean(v));
}

export function formatDate(d: string): string {
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
