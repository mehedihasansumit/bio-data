"use client";

import { BiodataFormData } from "@/types/biodata";

interface Props {
  data: BiodataFormData;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex py-[2px] text-[11px] leading-snug">
      <span className="w-[115px] shrink-0 text-gray-400 font-medium">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function TwoCol({ l1, v1, l2, v2 }: { l1: string; v1: string; l2: string; v2: string }) {
  if (!v1 && !v2) return null;
  return (
    <div className="flex py-[2px] text-[11px] leading-snug">
      <span className="w-[115px] shrink-0 text-gray-400 font-medium">{l1}</span>
      <span className="w-[125px] shrink-0 text-gray-800">{v1}</span>
      {v2 && (
        <>
          <span className="w-[100px] shrink-0 text-gray-400 font-medium">{l2}</span>
          <span className="text-gray-800">{v2}</span>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 first:mt-0">
      <h3 className="text-[10px] font-bold uppercase tracking-[.15em] text-violet-600 mb-1 pb-1 border-b border-violet-100">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

export default function ModernTemplate({ data }: Props) {
  const { personal, education, family, address, contact, lifestyle, partner } = data;
  const hasEdu = education.graduation || education.diploma;
  const hasCareer = education.designation || education.company;
  const hasFamily = family.fatherName || family.motherName;
  const hasLifestyle = lifestyle.hobbies || lifestyle.languages;
  const hasPartner = partner.ageRange || partner.religion;
  const hasContact = contact.phone || contact.email;

  return (
    <div className="bg-white p-5 max-w-[210mm] mx-auto print:p-3">
      <div className="border-2 border-violet-200 rounded-lg overflow-hidden min-h-[277mm] print:min-h-[calc(100vh-20mm)] flex flex-col">
        {/* Header */}
        <div className="text-center pt-5 pb-3 px-5">
          <div className="text-violet-400 text-[12px] leading-none mb-1">&#10043; &#10043; &#10043;</div>
          <h1 className="text-[18px] font-bold text-violet-700 tracking-[.15em] uppercase">Marriage Biodata</h1>
          <div className="w-36 mx-auto mt-1 border-t border-violet-300" />
          <div className="w-24 mx-auto mt-[2px] border-t border-violet-200" />
        </div>

        {/* Name + Photo row */}
        <div className="flex items-start gap-4 px-5 mb-2">
          {personal.photo && (
            <div className="w-[75px] h-[90px] rounded-lg overflow-hidden shrink-0 ring-2 ring-violet-200 shadow-md">
              <img src={personal.photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 pt-1">
            {personal.fullName && <h2 className="text-[15px] font-bold text-gray-900">{personal.fullName}</h2>}
            <div className="flex flex-wrap gap-2 mt-1.5">
              {personal.age && <span className="bg-violet-50 text-violet-700 text-[9px] px-2 py-[1px] rounded-full">{personal.age} Years</span>}
              {personal.height && <span className="bg-violet-50 text-violet-700 text-[9px] px-2 py-[1px] rounded-full">{personal.height.split(" (")[0]}</span>}
              {personal.religion && <span className="bg-violet-50 text-violet-700 text-[9px] px-2 py-[1px] rounded-full">{personal.religion}</span>}
              {personal.hometown && <span className="bg-violet-50 text-violet-700 text-[9px] px-2 py-[1px] rounded-full">{personal.hometown}</span>}
            </div>
          </div>
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

          {/* Footer ornament */}
          <div className="text-center mt-auto pt-4">
            <div className="text-violet-300 text-[10px]">&#10043; &#10043; &#10043;</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function fmtDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
