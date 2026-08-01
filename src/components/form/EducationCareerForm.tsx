"use client";

import { EducationCareer } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: EducationCareer;
  onChange: (data: EducationCareer) => void;
}

const EMPLOYMENT_TYPES = [
  "Government Job",
  "Private Job",
  "Business",
  "Self-employed",
  "Freelance",
  "Student",
  "Not working",
];

/** The four rungs of the Bangladeshi / Indian education ladder, in print order. */
const LEVELS = [
  { key: "masters", label: "Master's", placeholder: "e.g., M.Sc – Computer Science" },
  { key: "graduation", label: "Graduation", placeholder: "e.g., B.Sc – Computer Science" },
  { key: "diploma", label: "Diploma", placeholder: "e.g., Marine Engineering" },
  { key: "hsc", label: "HSC / Intermediate", placeholder: "e.g., HSC – Science" },
] as const;

export default function EducationCareerForm({ data, onChange }: Props) {
  const update = (field: keyof EducationCareer, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <>
      <FormSection title="Education">
        {LEVELS.map(({ key, label, placeholder }) => {
          const institutionKey = `${key}Institution` as keyof EducationCareer;
          const yearKey = `${key}Year` as keyof EducationCareer;
          const resultKey = `${key}Result` as keyof EducationCareer;
          return (
            <div key={key} className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={label}>
                {(id) => <input id={id} type="text" value={data[key]} onChange={(e) => update(key, e.target.value)} className={fieldInputClass} placeholder={placeholder} />}
              </Field>
              <Field label={`Institution (${label})`}>
                {(id) => <input id={id} type="text" value={data[institutionKey] as string} onChange={(e) => update(institutionKey, e.target.value)} className={fieldInputClass} placeholder="Institution name" />}
              </Field>
              <Field label={`Passing Year (${label})`}>
                {(id) => <input id={id} type="text" value={data[yearKey] as string} onChange={(e) => update(yearKey, e.target.value)} className={fieldInputClass} placeholder="e.g., 2020" inputMode="numeric" />}
              </Field>
              <Field label={`Result (${label})`}>
                {(id) => <input id={id} type="text" value={data[resultKey] as string} onChange={(e) => update(resultKey, e.target.value)} className={fieldInputClass} placeholder="e.g., CGPA 3.65 / 4.00" />}
              </Field>
            </div>
          );
        })}

        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="SSC / School Level">
            {(id) => <input id={id} type="text" value={data.school} onChange={(e) => update("school", e.target.value)} className={fieldInputClass} placeholder="e.g., SSC – Science" />}
          </Field>
          <Field label="School / College Name">
            {(id) => <input id={id} type="text" value={data.schoolName} onChange={(e) => update("schoolName", e.target.value)} className={fieldInputClass} placeholder="School name" />}
          </Field>
          <Field label="Passing Year (SSC)">
            {(id) => <input id={id} type="text" value={data.schoolYear} onChange={(e) => update("schoolYear", e.target.value)} className={fieldInputClass} placeholder="e.g., 2012" inputMode="numeric" />}
          </Field>
          <Field label="Result (SSC)">
            {(id) => <input id={id} type="text" value={data.schoolResult} onChange={(e) => update("schoolResult", e.target.value)} className={fieldInputClass} placeholder="e.g., GPA 5.00" />}
          </Field>
        </div>
      </FormSection>

      <FormSection title="Career & Profession">
        <Field label="Designation">
          {(id) => <input id={id} type="text" value={data.designation} onChange={(e) => update("designation", e.target.value)} className={fieldInputClass} placeholder="e.g., Software Engineer" autoComplete="organization-title" />}
        </Field>
        <Field label="Company / Organization">
          {(id) => <input id={id} type="text" value={data.company} onChange={(e) => update("company", e.target.value)} className={fieldInputClass} placeholder="Company name" autoComplete="organization" />}
        </Field>
        <Field label="Employment Type">
          {(id) => (
            <select id={id} value={data.employmentType} onChange={(e) => update("employmentType", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
        </Field>
        <Field label="Work Location">
          {(id) => <input id={id} type="text" value={data.workLocation} onChange={(e) => update("workLocation", e.target.value)} className={fieldInputClass} placeholder="e.g., Dhaka, Bangladesh" />}
        </Field>
        <Field label="Monthly Income">
          {(id) => <input id={id} type="text" value={data.monthlyIncome} onChange={(e) => update("monthlyIncome", e.target.value)} className={fieldInputClass} placeholder="e.g., ৳1,00,000+" />}
        </Field>
        <Field label="Annual Income">
          {(id) => <input id={id} type="text" value={data.annualIncome} onChange={(e) => update("annualIncome", e.target.value)} className={fieldInputClass} placeholder="e.g., ৳12+ LPA" />}
        </Field>
        <Field label="Experience">
          {(id) => <input id={id} type="text" value={data.experience} onChange={(e) => update("experience", e.target.value)} className={fieldInputClass} placeholder="e.g., 4+ years" />}
        </Field>
        <Field label="Domain / Role">
          {(id) => <input id={id} type="text" value={data.domain} onChange={(e) => update("domain", e.target.value)} className={fieldInputClass} placeholder="e.g., Team Lead - Software Development" />}
        </Field>
      </FormSection>
    </>
  );
}
