"use client";

import { BiodataFormData } from "@/types/biodata";

interface Props {
  data: BiodataFormData;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex py-[3px] text-[11px] leading-tight">
      <span className="w-[120px] shrink-0 font-semibold text-emerald-900">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

function TwoCol({ l1, v1, l2, v2 }: { l1: string; v1: string; l2: string; v2: string }) {
  if (!v1 && !v2) return null;
  return (
    <div className="flex py-[3px] text-[11px] leading-tight">
      <span className="w-[120px] shrink-0 font-semibold text-emerald-900">{l1}</span>
      <span className="w-[130px] shrink-0 text-gray-700">{v1}</span>
      {v2 && (
        <>
          <span className="w-[110px] shrink-0 font-semibold text-emerald-900">{l2}</span>
          <span className="text-gray-700">{v2}</span>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-[3px] rounded-sm">
        {title}
      </div>
      <div className="px-1 pt-1">{children}</div>
    </div>
  );
}

export default function ClassicTemplate({ data }: Props) {
  const { personal, education, family, address, contact, lifestyle, partner } = data;
  const hasEdu = education.graduation || education.diploma || education.school;
  const hasCareer = education.designation || education.company;
  const hasFamily = family.fatherName || family.motherName;
  const hasLifestyle = lifestyle.hobbies || lifestyle.languages;
  const hasPartner = partner.ageRange || partner.religion;
  const hasContact = contact.phone || contact.email;

  return (
    <div className="bg-white p-5 max-w-[210mm] mx-auto print:p-3">
      <div className="border-[3px] border-double border-emerald-800 p-4 min-h-[277mm] print:min-h-[calc(100vh-20mm)] flex flex-col">
        {/* Ornamental header */}
        <div className="text-center mb-3">
          <div className="text-emerald-600 text-[12px] leading-none mb-1">&#10053; &#10053; &#10053;</div>
          <h1 className="text-[18px] font-bold text-emerald-900 tracking-[.15em] uppercase">Marriage Biodata</h1>
          <div className="w-36 mx-auto mt-1 border-t border-emerald-400" />
          <div className="w-24 mx-auto mt-[2px] border-t border-emerald-400/40" />
        </div>

        {/* Name + Photo row */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pt-1">
            {personal.fullName && <h2 className="text-[15px] font-bold text-gray-900">{personal.fullName}</h2>}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px] text-emerald-800">
              {personal.age && <span>{personal.age} Years</span>}
              {personal.height && <span>{personal.height.split(" (")[0]}</span>}
              {personal.religion && <span>{personal.religion}</span>}
              {personal.hometown && <span>{personal.hometown}</span>}
            </div>
          </div>
          {personal.photo && (
            <div className="w-[80px] h-[100px] rounded-md overflow-hidden shrink-0 ml-3 shadow-md ring-1 ring-emerald-800/20">
              <img src={personal.photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

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
          <div className="text-emerald-600/40 text-[10px]">&#10053; &#10053; &#10053;</div>
        </div>
      </div>
    </div>
  );
}

function fmtDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
