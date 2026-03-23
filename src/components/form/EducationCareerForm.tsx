"use client";

import { EducationCareer } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";

interface Props {
  data: EducationCareer;
  onChange: (data: EducationCareer) => void;
}

export default function EducationCareerForm({ data, onChange }: Props) {
  const update = (field: keyof EducationCareer, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  return (
    <>
      <FormSection title="Education">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Graduation</label>
          <input type="text" value={data.graduation} onChange={(e) => update("graduation", e.target.value)} className={inputClass} placeholder="e.g., B.Sc – Computer Science" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution (Graduation)</label>
          <input type="text" value={data.graduationInstitution} onChange={(e) => update("graduationInstitution", e.target.value)} className={inputClass} placeholder="University name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diploma</label>
          <input type="text" value={data.diploma} onChange={(e) => update("diploma", e.target.value)} className={inputClass} placeholder="e.g., Marine Engineering" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution (Diploma)</label>
          <input type="text" value={data.diplomaInstitution} onChange={(e) => update("diplomaInstitution", e.target.value)} className={inputClass} placeholder="Institute name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School Level</label>
          <input type="text" value={data.school} onChange={(e) => update("school", e.target.value)} className={inputClass} placeholder="e.g., SSC / HSC" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School / College Name</label>
          <input type="text" value={data.schoolName} onChange={(e) => update("schoolName", e.target.value)} className={inputClass} placeholder="School name" />
        </div>
      </FormSection>

      <FormSection title="Career & Profession">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <input type="text" value={data.designation} onChange={(e) => update("designation", e.target.value)} className={inputClass} placeholder="e.g., Software Engineer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organization</label>
          <input type="text" value={data.company} onChange={(e) => update("company", e.target.value)} className={inputClass} placeholder="Company name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
          <input type="text" value={data.workLocation} onChange={(e) => update("workLocation", e.target.value)} className={inputClass} placeholder="e.g., Dhaka, Bangladesh" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
          <input type="text" value={data.annualIncome} onChange={(e) => update("annualIncome", e.target.value)} className={inputClass} placeholder="e.g., ৳12+ LPA" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <input type="text" value={data.experience} onChange={(e) => update("experience", e.target.value)} className={inputClass} placeholder="e.g., 4+ years" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Domain / Role</label>
          <input type="text" value={data.domain} onChange={(e) => update("domain", e.target.value)} className={inputClass} placeholder="e.g., Team Lead - Software Development" />
        </div>
      </FormSection>
    </>
  );
}
