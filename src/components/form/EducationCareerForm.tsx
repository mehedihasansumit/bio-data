"use client";

import { EducationCareer } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: EducationCareer;
  onChange: (data: EducationCareer) => void;
}

export default function EducationCareerForm({ data, onChange }: Props) {
  const update = (field: keyof EducationCareer, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <>
      <FormSection title="Education">
        <Field label="Graduation">
          {(id) => (
            <input id={id} type="text" value={data.graduation} onChange={(e) => update("graduation", e.target.value)} className={fieldInputClass} placeholder="e.g., B.Sc – Computer Science" />
          )}
        </Field>
        <Field label="Institution (Graduation)">
          {(id) => (
            <input id={id} type="text" value={data.graduationInstitution} onChange={(e) => update("graduationInstitution", e.target.value)} className={fieldInputClass} placeholder="University name" />
          )}
        </Field>

        <Field label="Diploma">
          {(id) => (
            <input id={id} type="text" value={data.diploma} onChange={(e) => update("diploma", e.target.value)} className={fieldInputClass} placeholder="e.g., Marine Engineering" />
          )}
        </Field>
        <Field label="Institution (Diploma)">
          {(id) => (
            <input id={id} type="text" value={data.diplomaInstitution} onChange={(e) => update("diplomaInstitution", e.target.value)} className={fieldInputClass} placeholder="Institute name" />
          )}
        </Field>

        <Field label="School Level">
          {(id) => (
            <input id={id} type="text" value={data.school} onChange={(e) => update("school", e.target.value)} className={fieldInputClass} placeholder="e.g., SSC / HSC" />
          )}
        </Field>
        <Field label="School / College Name">
          {(id) => (
            <input id={id} type="text" value={data.schoolName} onChange={(e) => update("schoolName", e.target.value)} className={fieldInputClass} placeholder="School name" />
          )}
        </Field>
      </FormSection>

      <FormSection title="Career & Profession">
        <Field label="Designation">
          {(id) => (
            <input id={id} type="text" value={data.designation} onChange={(e) => update("designation", e.target.value)} className={fieldInputClass} placeholder="e.g., Software Engineer" autoComplete="organization-title" />
          )}
        </Field>
        <Field label="Company / Organization">
          {(id) => (
            <input id={id} type="text" value={data.company} onChange={(e) => update("company", e.target.value)} className={fieldInputClass} placeholder="Company name" autoComplete="organization" />
          )}
        </Field>
        <Field label="Work Location">
          {(id) => (
            <input id={id} type="text" value={data.workLocation} onChange={(e) => update("workLocation", e.target.value)} className={fieldInputClass} placeholder="e.g., Dhaka, Bangladesh" />
          )}
        </Field>
        <Field label="Annual Income">
          {(id) => (
            <input id={id} type="text" value={data.annualIncome} onChange={(e) => update("annualIncome", e.target.value)} className={fieldInputClass} placeholder="e.g., ৳12+ LPA" />
          )}
        </Field>
        <Field label="Experience">
          {(id) => (
            <input id={id} type="text" value={data.experience} onChange={(e) => update("experience", e.target.value)} className={fieldInputClass} placeholder="e.g., 4+ years" />
          )}
        </Field>
        <Field label="Domain / Role">
          {(id) => (
            <input id={id} type="text" value={data.domain} onChange={(e) => update("domain", e.target.value)} className={fieldInputClass} placeholder="e.g., Team Lead - Software Development" />
          )}
        </Field>
      </FormSection>
    </>
  );
}
