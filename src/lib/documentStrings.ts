import { CandidateKind, DocumentLanguage } from "@/types/biodata";

/**
 * Every word the document says in its own voice, in both Document Languages.
 *
 * The governing rule: **the app translates its own words, never the user's
 * data.** A label is ours, so it translates. A value the user typed — "5 ft 8
 * in", "৳1,00,000+", "+880 1XXXXXXXXX", a company name — is theirs, and prints
 * exactly as entered. Transliterating entered digits into Bengali numerals
 * would corrupt heights, phone numbers, and currency for the sake of looking
 * consistent, so we don't.
 *
 * Keys are semantic rather than English-derived, so that changing the English
 * wording of a label is not a schema change.
 */
type Translations = Record<DocumentLanguage, string>;

const DOC_STRINGS = {
  // Section titles
  "section.personal": { en: "Personal Information", bn: "ব্যক্তিগত তথ্য" },
  "section.religious": { en: "Religious Details", bn: "ধর্মীয় তথ্য" },
  "section.horoscope": { en: "Community & Horoscope", bn: "সম্প্রদায় ও রাশিফল" },
  "section.education": { en: "Education", bn: "শিক্ষাগত যোগ্যতা" },
  "section.career": { en: "Career & Profession", bn: "কর্মজীবন ও পেশা" },
  "section.family": { en: "Family Details", bn: "পারিবারিক তথ্য" },
  "section.address": { en: "Address", bn: "ঠিকানা" },
  "section.lifestyle": { en: "Lifestyle & Interests", bn: "জীবনযাত্রা ও শখ" },
  "section.partner": { en: "Partner Preference", bn: "জীবনসঙ্গীর পছন্দ" },
  "section.contact": { en: "Contact Details", bn: "যোগাযোগ" },

  // Personal
  "personal.fullName": { en: "Full Name", bn: "পূর্ণ নাম" },
  "personal.birthPlace": { en: "Birth Place", bn: "জন্মস্থান" },
  "personal.dateOfBirth": { en: "Date of Birth", bn: "জন্ম তারিখ" },
  "personal.timeOfBirth": { en: "Time", bn: "জন্ম সময়" },
  "personal.height": { en: "Height", bn: "উচ্চতা" },
  "personal.weight": { en: "Weight", bn: "ওজন" },
  "personal.bodyType": { en: "Body Type", bn: "দেহের গঠন" },
  "personal.complexion": { en: "Complexion", bn: "গায়ের রং" },
  "personal.bloodGroup": { en: "Blood Group", bn: "রক্তের গ্রুপ" },
  "personal.religion": { en: "Religion", bn: "ধর্ম" },
  "personal.motherTongue": { en: "Mother Tongue", bn: "মাতৃভাষা" },
  "personal.maritalStatus": { en: "Marital Status", bn: "বৈবাহিক অবস্থা" },
  "personal.nationality": { en: "Nationality", bn: "জাতীয়তা" },
  "personal.hometown": { en: "Hometown", bn: "নিজ এলাকা" },
  "personal.health": { en: "Health", bn: "স্বাস্থ্য" },
  /** Unit word for the age shown in parentheses beside the date of birth. */
  "personal.years": { en: "yrs", bn: "বছর" },
  /** Unit word for the age in the headline facts, where there is room to spell it. */
  "personal.yearsLong": { en: "Years", bn: "বছর" },

  // Religious — Hindu
  "religious.caste": { en: "Caste", bn: "বর্ণ" },
  "religious.subCaste": { en: "Sub-caste", bn: "উপবর্ণ" },
  "religious.gotra": { en: "Gotra", bn: "গোত্র" },
  "religious.manglik": { en: "Manglik", bn: "মাঙ্গলিক" },
  "religious.rashi": { en: "Rashi", bn: "রাশি" },
  "religious.nakshatra": { en: "Nakshatra", bn: "নক্ষত্র" },

  // Religious — Muslim
  "religious.maslak": { en: "Maslak / Sect", bn: "মাসলাক / মাযহাব" },
  "religious.prayer": { en: "Prayer", bn: "নামাজ" },
  "religious.observance": { en: "Observance", bn: "ধর্মীয় অনুশীলন" },

  // Education
  "education.masters": { en: "Master's", bn: "স্নাতকোত্তর" },
  "education.graduation": { en: "Graduation", bn: "স্নাতক" },
  "education.diploma": { en: "Diploma", bn: "ডিপ্লোমা" },
  "education.hsc": { en: "HSC", bn: "এইচ.এস.সি" },
  "education.school": { en: "SSC / School", bn: "এস.এস.সি" },

  // Career
  "career.designation": { en: "Designation", bn: "পদবি" },
  "career.company": { en: "Company", bn: "প্রতিষ্ঠান" },
  "career.employment": { en: "Employment", bn: "চাকরির ধরন" },
  "career.workLocation": { en: "Work Location", bn: "কর্মস্থল" },
  "career.monthlyIncome": { en: "Monthly Income", bn: "মাসিক আয়" },
  "career.annualIncome": { en: "Annual Income", bn: "বার্ষিক আয়" },
  "career.experience": { en: "Experience", bn: "অভিজ্ঞতা" },
  "career.domain": { en: "Domain", bn: "কাজের ক্ষেত্র" },

  // Family
  "family.father": { en: "Father", bn: "পিতা" },
  "family.mother": { en: "Mother", bn: "মাতা" },
  "family.siblingCount": { en: "Siblings", bn: "ভাই-বোন" },
  "family.siblingList": { en: "Brothers / Sisters", bn: "ভাই-বোনের বিবরণ" },
  "family.type": { en: "Family Type", bn: "পারিবারিক ধরন" },
  "family.values": { en: "Values", bn: "পারিবারিক মূল্যবোধ" },
  "family.economicStatus": { en: "Economic Status", bn: "আর্থিক অবস্থা" },
  "family.notableRelative": { en: "Notable Relative", bn: "উল্লেখযোগ্য আত্মীয়" },
  "family.nativePlace": { en: "Native Place", bn: "স্থায়ী নিবাস" },
  "family.property": { en: "Property", bn: "সম্পত্তি" },

  // Address
  "address.present": { en: "Present Address", bn: "বর্তমান ঠিকানা" },
  "address.permanent": { en: "Permanent Address", bn: "স্থায়ী ঠিকানা" },

  // Lifestyle
  "lifestyle.hobbies": { en: "Hobbies", bn: "শখ" },
  "lifestyle.languages": { en: "Languages", bn: "ভাষা" },
  "lifestyle.sports": { en: "Sports", bn: "খেলাধুলা" },
  "lifestyle.personality": { en: "Personality", bn: "ব্যক্তিত্ব" },
  "lifestyle.diet": { en: "Diet", bn: "খাদ্যাভ্যাস" },
  "lifestyle.smoking": { en: "Smoking", bn: "ধূমপান" },
  "lifestyle.drinking": { en: "Drinking", bn: "মদ্যপান" },

  // Partner preference
  "partner.age": { en: "Age", bn: "বয়স" },
  "partner.height": { en: "Height", bn: "উচ্চতা" },
  "partner.complexion": { en: "Complexion", bn: "গায়ের রং" },
  "partner.education": { en: "Education", bn: "শিক্ষাগত যোগ্যতা" },
  "partner.profession": { en: "Profession", bn: "পেশা" },
  "partner.working": { en: "Working", bn: "চাকরিরত" },
  "partner.religion": { en: "Religion", bn: "ধর্ম" },
  "partner.maritalStatus": { en: "Marital Status", bn: "বৈবাহিক অবস্থা" },
  "partner.familyType": { en: "Family Type", bn: "পারিবারিক ধরন" },
  "partner.diet": { en: "Diet", bn: "খাদ্যাভ্যাস" },
  "partner.location": { en: "Location", bn: "এলাকা" },
  "partner.abroad": { en: "Abroad", bn: "বিদেশে অবস্থান" },

  // Contact
  "contact.person": { en: "Contact Person", bn: "যোগাযোগের ব্যক্তি" },
  "contact.phone": { en: "Phone", bn: "ফোন" },
  "contact.alternate": { en: "Alternate", bn: "বিকল্প ফোন" },
  "contact.whatsapp": { en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" },
  "contact.email": { en: "Email", bn: "ইমেইল" },

  // Document titles, keyed by Candidate Kind
  "title.unspecified": { en: "Marriage Biodata", bn: "বিয়ের বায়োডাটা" },
  "title.bride": { en: "Bride's Biodata", bn: "পাত্রীর বায়োডাটা" },
  "title.groom": { en: "Groom's Biodata", bn: "পাত্রের বায়োডাটা" },
} as const satisfies Record<string, Translations>;

export type DocStringKey = keyof typeof DOC_STRINGS;

export function docString(key: DocStringKey, lang: DocumentLanguage): string {
  return DOC_STRINGS[key][lang];
}

/**
 * The heading at the top of every template. This is the whole visible payoff of
 * Candidate Kind: a document that announces itself as a পাত্রীর বায়োডাটা rather
 * than the generic "Marriage Biodata" every other tool prints.
 */
export function documentTitle(kind: CandidateKind, lang: DocumentLanguage): string {
  return docString(`title.${kind}`, lang);
}

/**
 * Locale for dates the app formats itself.
 *
 * Bengali gets Bengali month names but **Latin numerals** — note the
 * `-u-nu-latn`. Plain "bn-BD" yields Bengali digits, and the date is then the
 * only Bengali-numeral text in the entire document: every other number on the
 * page came from the user, who typed "29", "66 kg", "৳1,00,000+" and a phone
 * number in Latin. The two collide inside a single cell, three characters
 * apart — "১১ মার্চ, ১৯৯৭ (29 বছর)" — which reads as a rendering fault rather
 * than a choice.
 *
 * The words rule and the numerals rule differ because words only ever come
 * from one side. Numerals come from both, and sit adjacent.
 */
export function dateLocale(lang: DocumentLanguage): string {
  return lang === "bn" ? "bn-BD-u-nu-latn" : "en-GB";
}
