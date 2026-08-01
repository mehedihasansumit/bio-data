import { BiodataFormData } from "@/types/biodata";

/**
 * Which sections a document should render, given the data.
 *
 * Shared deliberately: templates own their layout (see the Four Voices Rule in
 * DESIGN.md), but they must not disagree about whether a field exists. When
 * these predicates lived separately in each template, switching template
 * silently added or dropped sections — the Content Parity Rule violation.
 */
export function documentSections(data: BiodataFormData) {
  const { education, family, address, contact, lifestyle, partner } = data;

  return {
    hasEdu: Boolean(
      education.graduation ||
        education.diploma ||
        education.school ||
        education.schoolName,
    ),
    hasCareer: Boolean(
      education.designation ||
        education.company ||
        education.workLocation ||
        education.annualIncome ||
        education.experience ||
        education.domain,
    ),
    hasFamily: Boolean(
      family.fatherName ||
        family.motherName ||
        family.siblings ||
        family.nativePlace ||
        family.property,
    ),
    // Address is its own section. It used to be nested inside the contact
    // gate, so filling only the Address tab printed no address at all.
    hasAddress: Boolean(address.presentAddress || address.permanentAddress),
    hasLifestyle: Boolean(
      lifestyle.hobbies ||
        lifestyle.languages ||
        lifestyle.sports ||
        lifestyle.personality,
    ),
    hasPartner: Boolean(
      partner.ageRange ||
        partner.heightRange ||
        partner.education ||
        partner.working ||
        partner.religion ||
        partner.location,
    ),
    hasContact: Boolean(contact.contactPerson || contact.phone || contact.email),
  };
}
