"use client";

import { BiodataFormData } from "@/types/biodata";

interface Props {
  data: BiodataFormData;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex py-[2px] text-[11px] leading-snug">
      <span className="w-[115px] shrink-0 font-semibold text-[#1e3a5f]">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

function TwoCol({ l1, v1, l2, v2 }: { l1: string; v1: string; l2: string; v2: string }) {
  if (!v1 && !v2) return null;
  return (
    <div className="flex py-[2px] text-[11px] leading-snug">
      <span className="w-[115px] shrink-0 font-semibold text-[#1e3a5f]">{l1}</span>
      <span className="w-[125px] shrink-0 text-gray-700">{v1}</span>
      {v2 && (
        <>
          <span className="w-[100px] shrink-0 font-semibold text-[#1e3a5f]">{l2}</span>
          <span className="text-gray-700">{v2}</span>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-[2px] w-3 bg-[#d4a853]" />
        <h3 className="text-[10px] font-bold uppercase tracking-[.12em] text-[#1e3a5f]">{title}</h3>
        <div className="h-[2px] flex-1 bg-[#d4a853]/40" />
      </div>
      <div className="pl-1">{children}</div>
    </div>
  );
}

export default function ElegantTemplate({ data }: Props) {
  const { personal, education, family, address, contact, lifestyle, partner } = data;
  const hasEdu = education.graduation || education.diploma;
  const hasCareer = education.designation || education.company;
  const hasFamily = family.fatherName || family.motherName;
  const hasLifestyle = lifestyle.hobbies || lifestyle.languages;
  const hasPartner = partner.ageRange || partner.religion;
  const hasContact = contact.phone || contact.email;

  return (
    <div className="bg-white p-5 max-w-[210mm] mx-auto print:p-3">
      <div className="border border-[#1e3a5f] p-0 relative min-h-[277mm] print:min-h-[calc(100vh-20mm)] flex flex-col">
        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#d4a853]" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#d4a853]" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#d4a853]" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#d4a853]" />

        {/* Header band */}
        <div className="bg-[#1e3a5f] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[9px] uppercase tracking-[.2em] text-[#d4a853] mb-0.5">Marriage Biodata</p>
            {personal.fullName && <h1 className="text-[17px] font-bold tracking-wide">{personal.fullName}</h1>}
            <p className="text-[10px] text-blue-200 mt-0.5">
              {[education.designation, education.company, personal.hometown].filter(Boolean).join(" • ")}
            </p>
          </div>
          {personal.photo && (
            <div className="w-[75px] h-[95px] rounded-md overflow-hidden shrink-0 ml-4 ring-2 ring-[#d4a853]/50 shadow-lg">
              <img src={personal.photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-5 py-3 flex-1">
          <Section title="Personal Information">
            <Row label="Full Name" value={personal.fullName} />
            <Row label="Birth Place" value={personal.birthPlace} />
            <Row label="Date of Birth" value={personal.dateOfBirth ? `${fmtDate(personal.dateOfBirth)}${personal.age ? ` (${personal.age} yrs)` : ""}` : ""} />
            <TwoCol l1="Height" v1={personal.height} l2="Weight" v2={personal.weight} />
            <TwoCol l1="Complexion" v1={personal.complexion} l2="Blood Group" v2={personal.bloodGroup} />
            <TwoCol l1="Religion" v1={personal.religion} l2="Mother Tongue" v2={personal.motherTongue} />
            <TwoCol l1="Marital Status" v1={personal.maritalStatus} l2="Nationality" v2={personal.nationality} />
          </Section>

          {hasEdu && (
            <Section title="Education">
              {education.graduation && <Row label="Graduation" value={`${education.graduation}${education.graduationInstitution ? `, ${education.graduationInstitution}` : ""}`} />}
              {education.diploma && <Row label="Diploma" value={`${education.diploma}${education.diplomaInstitution ? `, ${education.diplomaInstitution}` : ""}`} />}
              {education.schoolName && <Row label="School" value={education.schoolName} />}
            </Section>
          )}

          {hasCareer && (
            <Section title="Career & Profession">
              <TwoCol l1="Designation" v1={education.designation} l2="Company" v2={education.company} />
              <TwoCol l1="Work Location" v1={education.workLocation} l2="Income" v2={education.annualIncome} />
              <TwoCol l1="Experience" v1={education.experience} l2="Domain" v2={education.domain} />
            </Section>
          )}

          {hasFamily && (
            <Section title="Family Details">
              <Row label="Father" value={`${family.fatherName}${family.fatherOccupation ? ` – ${family.fatherOccupation}` : ""}`} />
              <Row label="Mother" value={`${family.motherName}${family.motherOccupation ? ` – ${family.motherOccupation}` : ""}`} />
              <Row label="Siblings" value={family.siblings} />
              <TwoCol l1="Family Type" v1={family.familyType} l2="Values" v2={family.familyValues} />
              <Row label="Native Place" value={family.nativePlace} />
              <Row label="Property" value={family.property} />
            </Section>
          )}

          {hasLifestyle && (
            <Section title="Lifestyle & Interests">
              <TwoCol l1="Hobbies" v1={lifestyle.hobbies} l2="Languages" v2={lifestyle.languages} />
              <TwoCol l1="Sports" v1={lifestyle.sports} l2="Personality" v2={lifestyle.personality} />
            </Section>
          )}

          {hasPartner && (
            <Section title="Partner Preference">
              <TwoCol l1="Age" v1={partner.ageRange} l2="Height" v2={partner.heightRange} />
              <TwoCol l1="Education" v1={partner.education} l2="Working" v2={partner.working} />
              <TwoCol l1="Religion" v1={partner.religion} l2="Location" v2={partner.location} />
            </Section>
          )}

          {hasContact && (
            <Section title="Contact Details">
              <Row label="Contact Person" value={contact.contactPerson} />
              <TwoCol l1="Phone" v1={contact.phone} l2="Email" v2={contact.email} />
              <Row label="Address" value={address.presentAddress} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function fmtDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
