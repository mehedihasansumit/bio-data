export interface PersonalInfo {
  fullName: string;
  photo: string;
  birthPlace: string;
  dateOfBirth: string;
  age: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  religion: string;
  motherTongue: string;
  maritalStatus: string;
  nationality: string;
  hometown: string;
}

export interface EducationCareer {
  graduation: string;
  graduationInstitution: string;
  diploma: string;
  diplomaInstitution: string;
  school: string;
  schoolName: string;
  designation: string;
  company: string;
  workLocation: string;
  annualIncome: string;
  experience: string;
  domain: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyValues: string;
  nativePlace: string;
  property: string;
}

export interface Address {
  presentAddress: string;
  permanentAddress: string;
}

export interface Contact {
  contactPerson: string;
  phone: string;
  email: string;
}

export interface LifestyleInfo {
  hobbies: string;
  languages: string;
  sports: string;
  personality: string;
}

export interface PartnerPreference {
  ageRange: string;
  heightRange: string;
  education: string;
  working: string;
  religion: string;
  location: string;
}

export interface BiodataFormData {
  personal: PersonalInfo;
  education: EducationCareer;
  family: FamilyInfo;
  address: Address;
  contact: Contact;
  lifestyle: LifestyleInfo;
  partner: PartnerPreference;
}

export const initialBiodata: BiodataFormData = {
  personal: {
    fullName: "",
    photo: "",
    birthPlace: "",
    dateOfBirth: "",
    age: "",
    height: "",
    weight: "",
    complexion: "",
    bloodGroup: "",
    religion: "",
    motherTongue: "",
    maritalStatus: "",
    nationality: "",
    hometown: "",
  },
  education: {
    graduation: "",
    graduationInstitution: "",
    diploma: "",
    diplomaInstitution: "",
    school: "",
    schoolName: "",
    designation: "",
    company: "",
    workLocation: "",
    annualIncome: "",
    experience: "",
    domain: "",
  },
  family: {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    familyType: "",
    familyValues: "",
    nativePlace: "",
    property: "",
  },
  address: {
    presentAddress: "",
    permanentAddress: "",
  },
  contact: {
    contactPerson: "",
    phone: "",
    email: "",
  },
  lifestyle: {
    hobbies: "",
    languages: "",
    sports: "",
    personality: "",
  },
  partner: {
    ageRange: "",
    heightRange: "",
    education: "",
    working: "",
    religion: "",
    location: "",
  },
};

export const sampleBiodata: BiodataFormData = {
  personal: {
    fullName: "Mehedi Hasan",
    photo: "",
    birthPlace: "Nabinagar, B.Baria, Bangladesh",
    dateOfBirth: "1997-03-11",
    age: "29",
    height: "5 ft 8 in (173 cm)",
    weight: "66 kg",
    complexion: "Brown",
    bloodGroup: "O+",
    religion: "Islam",
    motherTongue: "Bengali",
    maritalStatus: "Never Married",
    nationality: "Bangladeshi",
    hometown: "Dhaka, Bangladesh",
  },
  education: {
    graduation: "B.Sc – Computer Science & Engineering",
    graduationInstitution: "Green University of Bangladesh",
    diploma: "Marine Engineering",
    diplomaInstitution: "Shyamoli Ideal Technical Institute",
    school: "SSC",
    schoolName: "Kadamtala Purbo Bashabo High School & College",
    designation: "Software Engineer",
    company: "V2 Technologies LTD",
    workLocation: "Dhaka, Bangladesh",
    annualIncome: "৳12+ LPA",
    experience: "4+ years",
    domain: "Team Lead - Software Development",
  },
  family: {
    fatherName: "Late Kamal Uddin",
    fatherOccupation: "Government Service Holder, Bangladesh Police",
    motherName: "Renuara Begum",
    motherOccupation: "Homemaker",
    siblings: "2 Younger Sisters – Students (Undergraduate & Graduate)",
    familyType: "Nuclear, Upper Middle Class",
    familyValues: "Traditional & Religious",
    nativePlace: "Chowria, Nabinagar, B.Baria, Bangladesh",
    property: "Family owns a house in Dhaka and ancestral house & property in B.Baria",
  },
  address: {
    presentAddress: "Trimohoni Bazar, Trimohoni, Khilgaon, Dhaka – 1219, Bangladesh",
    permanentAddress: "Chowria, Nabinagar, B.Baria, Bangladesh",
  },
  contact: {
    contactPerson: "Renuara Begum (Mother)",
    phone: "+880 1814292958",
    email: "mehedihasansumit@gmail.com",
  },
  lifestyle: {
    hobbies: "Gaming, Traveling",
    languages: "Bengali, English, Hindi",
    sports: "Badminton, Cricket, Football",
    personality: "Honest, Responsible, Humble",
  },
  partner: {
    ageRange: "20 – 27 years",
    heightRange: "5'2\" – 5'5\"",
    education: "Any",
    working: "Not mandatory",
    religion: "Islam",
    location: "Cumilla - B.Baria preferred but open to other locations",
  },
};
