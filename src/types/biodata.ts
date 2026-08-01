/**
 * Whether the Candidate is a পাত্রী (bride) or a পাত্র (groom).
 *
 * "unspecified" is a real answer, not a missing one: it prints the neutral
 * "Marriage Biodata" heading, which is what someone who does not want the
 * distinction should get without having to opt out of anything.
 */
export type CandidateKind = "bride" | "groom" | "unspecified";

/**
 * The language a finished Biodata is printed in — never the language of the
 * builder around it. See docs/adr/0001. Deliberately not bilingual: a formal
 * document that labels all ~60 of its rows twice reads as an untranslated
 * template rather than a considered artifact.
 */
export type DocumentLanguage = "en" | "bn";

export const CANDIDATE_KINDS: CandidateKind[] = ["unspecified", "bride", "groom"];
export const DOCUMENT_LANGUAGES: DocumentLanguage[] = ["bn", "en"];

/**
 * Settings that describe the document rather than the person in it. Kept in its
 * own section so the import coercion in `biodataFile.ts` walks it like any
 * other section, and so a future "paper size" or "photo shape" has an obvious
 * home that is not `personal`.
 */
export interface BiodataMeta {
  candidateKind: CandidateKind;
  documentLanguage: DocumentLanguage;
}

export interface PersonalInfo {
  fullName: string;
  photo: string;
  birthPlace: string;
  dateOfBirth: string;
  /** Recorded for horoscope matching; commonly required in Hindu biodatas. */
  timeOfBirth: string;
  age: string;
  height: string;
  weight: string;
  bodyType: string;
  complexion: string;
  bloodGroup: string;
  /** Drives which religion-specific fields appear. See RELIGIONS below. */
  religion: string;
  motherTongue: string;
  maritalStatus: string;
  nationality: string;
  hometown: string;
  healthNotes: string;
}

/**
 * Religion-specific fields. Only the set matching `personal.religion` is ever
 * shown or printed — a Muslim biodata never displays gotra, and a Hindu one
 * never displays maslak.
 */
export interface ReligiousInfo {
  // Hindu
  caste: string;
  subCaste: string;
  gotra: string;
  rashi: string;
  nakshatra: string;
  manglik: string;
  // Muslim
  maslak: string;
  prayerRegularity: string;
  observance: string;
}

export interface EducationCareer {
  masters: string;
  mastersInstitution: string;
  mastersYear: string;
  mastersResult: string;
  graduation: string;
  graduationInstitution: string;
  graduationYear: string;
  graduationResult: string;
  diploma: string;
  diplomaInstitution: string;
  diplomaYear: string;
  diplomaResult: string;
  hsc: string;
  hscInstitution: string;
  hscYear: string;
  hscResult: string;
  school: string;
  schoolName: string;
  schoolYear: string;
  schoolResult: string;
  designation: string;
  company: string;
  employmentType: string;
  workLocation: string;
  monthlyIncome: string;
  annualIncome: string;
  experience: string;
  domain: string;
}

export interface Sibling {
  name: string;
  /** "Brother" | "Sister" */
  relation: string;
  /** "Elder" | "Younger" */
  order: string;
  maritalStatus: string;
  occupation: string;
  spouseOccupation: string;
  location: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherOccupation: string;
  fatherStatus: string;
  motherName: string;
  motherOccupation: string;
  motherStatus: string;
  brothersCount: string;
  sistersCount: string;
  siblings: Sibling[];
  /** Free-text summary, for people who prefer one line over itemised rows.
   *  Also the migration target for the v1 `siblings` string. */
  siblingsNote: string;
  familyType: string;
  familyValues: string;
  economicStatus: string;
  nativePlace: string;
  property: string;
  notableRelative: string;
}

export interface Address {
  presentAddress: string;
  permanentAddress: string;
}

export interface Contact {
  contactPerson: string;
  contactRelation: string;
  phone: string;
  alternatePhone: string;
  whatsapp: string;
  email: string;
}

export interface LifestyleInfo {
  hobbies: string;
  languages: string;
  sports: string;
  personality: string;
  diet: string;
  smoking: string;
  drinking: string;
}

export interface PartnerPreference {
  ageRange: string;
  heightRange: string;
  complexion: string;
  education: string;
  profession: string;
  working: string;
  religion: string;
  maritalStatus: string;
  familyType: string;
  diet: string;
  location: string;
  abroadAcceptable: string;
}

export interface BiodataFormData {
  meta: BiodataMeta;
  personal: PersonalInfo;
  religious: ReligiousInfo;
  education: EducationCareer;
  family: FamilyInfo;
  address: Address;
  contact: Contact;
  lifestyle: LifestyleInfo;
  partner: PartnerPreference;
}

export const RELIGIONS = [
  "Islam",
  "Hinduism",
  "Christianity",
  "Buddhism",
  "Other",
] as const;

export const emptySibling: Sibling = {
  name: "",
  relation: "Brother",
  order: "Younger",
  maritalStatus: "",
  occupation: "",
  spouseOccupation: "",
  location: "",
};

export const initialBiodata: BiodataFormData = {
  /* Bengali by default because the product is Bengali-first for Bangladesh.
     Files exported before this field existed migrate to "en" instead — see
     migrateV2 in biodataFile.ts — so an existing draft keeps the document its
     author last saw, and only new biodatas take the new default. */
  meta: {
    candidateKind: "unspecified",
    documentLanguage: "bn",
  },
  personal: {
    fullName: "",
    photo: "",
    birthPlace: "",
    dateOfBirth: "",
    timeOfBirth: "",
    age: "",
    height: "",
    weight: "",
    bodyType: "",
    complexion: "",
    bloodGroup: "",
    religion: "",
    motherTongue: "",
    maritalStatus: "",
    nationality: "",
    hometown: "",
    healthNotes: "",
  },
  religious: {
    caste: "",
    subCaste: "",
    gotra: "",
    rashi: "",
    nakshatra: "",
    manglik: "",
    maslak: "",
    prayerRegularity: "",
    observance: "",
  },
  education: {
    masters: "",
    mastersInstitution: "",
    mastersYear: "",
    mastersResult: "",
    graduation: "",
    graduationInstitution: "",
    graduationYear: "",
    graduationResult: "",
    diploma: "",
    diplomaInstitution: "",
    diplomaYear: "",
    diplomaResult: "",
    hsc: "",
    hscInstitution: "",
    hscYear: "",
    hscResult: "",
    school: "",
    schoolName: "",
    schoolYear: "",
    schoolResult: "",
    designation: "",
    company: "",
    employmentType: "",
    workLocation: "",
    monthlyIncome: "",
    annualIncome: "",
    experience: "",
    domain: "",
  },
  family: {
    fatherName: "",
    fatherOccupation: "",
    fatherStatus: "",
    motherName: "",
    motherOccupation: "",
    motherStatus: "",
    brothersCount: "",
    sistersCount: "",
    siblings: [],
    siblingsNote: "",
    familyType: "",
    familyValues: "",
    economicStatus: "",
    nativePlace: "",
    property: "",
    notableRelative: "",
  },
  address: {
    presentAddress: "",
    permanentAddress: "",
  },
  contact: {
    contactPerson: "",
    contactRelation: "",
    phone: "",
    alternatePhone: "",
    whatsapp: "",
    email: "",
  },
  lifestyle: {
    hobbies: "",
    languages: "",
    sports: "",
    personality: "",
    diet: "",
    smoking: "",
    drinking: "",
  },
  partner: {
    ageRange: "",
    heightRange: "",
    complexion: "",
    education: "",
    profession: "",
    working: "",
    religion: "",
    maritalStatus: "",
    familyType: "",
    diet: "",
    location: "",
    abroadAcceptable: "",
  },
};

/**
 * Illustrative example only — every value here is fictional.
 * Never put a real person's contact details in this object: it is rendered
 * verbatim into a printable document that users share with other families.
 */
export const sampleBiodata: BiodataFormData = {
  meta: {
    candidateKind: "groom",
    documentLanguage: "bn",
  },
  personal: {
    fullName: "Rafiul Karim (example)",
    photo: "",
    birthPlace: "Nabinagar, B.Baria, Bangladesh",
    dateOfBirth: "1997-03-11",
    timeOfBirth: "06:40",
    age: "29",
    height: "5 ft 8 in (173 cm)",
    weight: "66 kg",
    bodyType: "Average",
    complexion: "Brown",
    bloodGroup: "O+",
    religion: "Islam",
    motherTongue: "Bengali",
    maritalStatus: "Never Married",
    nationality: "Bangladeshi",
    hometown: "Dhaka, Bangladesh",
    healthNotes: "No known health issues",
  },
  religious: {
    caste: "",
    subCaste: "",
    gotra: "",
    rashi: "",
    nakshatra: "",
    manglik: "",
    maslak: "Sunni (Hanafi)",
    prayerRegularity: "Five times daily",
    observance: "Keeps a beard",
  },
  education: {
    masters: "M.Sc – Computer Science",
    mastersInstitution: "Example University of Bangladesh",
    mastersYear: "2022",
    mastersResult: "CGPA 3.71 / 4.00",
    graduation: "B.Sc – Computer Science & Engineering",
    graduationInstitution: "Example University of Bangladesh",
    graduationYear: "2020",
    graduationResult: "CGPA 3.65 / 4.00",
    diploma: "Marine Engineering",
    diplomaInstitution: "Example Technical Institute",
    diplomaYear: "2016",
    diplomaResult: "First Class",
    hsc: "HSC – Science",
    hscInstitution: "Example College, Dhaka",
    hscYear: "2014",
    hscResult: "GPA 5.00",
    school: "SSC – Science",
    schoolName: "Example High School & College",
    schoolYear: "2012",
    schoolResult: "GPA 5.00",
    designation: "Software Engineer",
    company: "Example Technologies Ltd.",
    employmentType: "Private Job",
    workLocation: "Dhaka, Bangladesh",
    monthlyIncome: "৳1,00,000+",
    annualIncome: "৳12+ LPA",
    experience: "4+ years",
    domain: "Team Lead - Software Development",
  },
  family: {
    fatherName: "Abdul Karim",
    fatherOccupation: "Retired Government Service Holder",
    fatherStatus: "Living",
    motherName: "Shirin Akhter",
    motherOccupation: "Homemaker",
    motherStatus: "Living",
    brothersCount: "1",
    sistersCount: "2",
    siblings: [
      {
        name: "Tanvir Karim",
        relation: "Brother",
        order: "Elder",
        maritalStatus: "Married",
        occupation: "Banker",
        spouseOccupation: "Schoolteacher",
        location: "Chattogram",
      },
      {
        name: "Nusrat Karim",
        relation: "Sister",
        order: "Younger",
        maritalStatus: "Unmarried",
        occupation: "Undergraduate Student",
        spouseOccupation: "",
        location: "Dhaka",
      },
    ],
    siblingsNote: "",
    familyType: "Nuclear, Upper Middle Class",
    familyValues: "Traditional & Religious",
    economicStatus: "Solvent",
    nativePlace: "Chowria, Nabinagar, B.Baria, Bangladesh",
    property: "Family owns a house in Dhaka and ancestral property in B.Baria",
    notableRelative: "",
  },
  address: {
    presentAddress: "House 00, Road 00, Example Area, Dhaka – 1219, Bangladesh",
    permanentAddress: "Chowria, Nabinagar, B.Baria, Bangladesh",
  },
  contact: {
    contactPerson: "Shirin Akhter",
    contactRelation: "Mother",
    phone: "+880 1XXXXXXXXX",
    alternatePhone: "",
    whatsapp: "+880 1XXXXXXXXX",
    email: "name@example.com",
  },
  lifestyle: {
    hobbies: "Gaming, Traveling",
    languages: "Bengali, English, Hindi",
    sports: "Badminton, Cricket, Football",
    personality: "Honest, Responsible, Humble",
    diet: "Non-vegetarian (halal)",
    smoking: "No",
    drinking: "No",
  },
  partner: {
    ageRange: "20 – 27 years",
    heightRange: "5'2\" – 5'5\"",
    complexion: "Any",
    education: "Any",
    profession: "Any",
    working: "Not mandatory",
    religion: "Islam",
    maritalStatus: "Never Married",
    familyType: "Any",
    diet: "Any",
    location: "Cumilla - B.Baria preferred but open to other locations",
    abroadAcceptable: "Yes",
  },
};
