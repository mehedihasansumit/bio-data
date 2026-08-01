"use client";

import { LifestyleInfo, PartnerPreference } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  lifestyle: LifestyleInfo;
  partner: PartnerPreference;
  onLifestyleChange: (data: LifestyleInfo) => void;
  onPartnerChange: (data: PartnerPreference) => void;
}

export default function AdditionalInfoForm({ lifestyle, partner, onLifestyleChange, onPartnerChange }: Props) {
  const updateLifestyle = (field: keyof LifestyleInfo, value: string) => {
    onLifestyleChange({ ...lifestyle, [field]: value });
  };

  const updatePartner = (field: keyof PartnerPreference, value: string) => {
    onPartnerChange({ ...partner, [field]: value });
  };

  return (
    <>
      <FormSection title="Lifestyle & Interests">
        <Field label="Hobbies">
          {(id) => (
            <input id={id} type="text" value={lifestyle.hobbies} onChange={(e) => updateLifestyle("hobbies", e.target.value)} className={fieldInputClass} placeholder="e.g., Gaming, Traveling" />
          )}
        </Field>
        <Field label="Languages">
          {(id) => (
            <input id={id} type="text" value={lifestyle.languages} onChange={(e) => updateLifestyle("languages", e.target.value)} className={fieldInputClass} placeholder="e.g., Bengali, English, Hindi" />
          )}
        </Field>
        <Field label="Sports">
          {(id) => (
            <input id={id} type="text" value={lifestyle.sports} onChange={(e) => updateLifestyle("sports", e.target.value)} className={fieldInputClass} placeholder="e.g., Cricket, Football" />
          )}
        </Field>
        <Field label="Personality">
          {(id) => (
            <input id={id} type="text" value={lifestyle.personality} onChange={(e) => updateLifestyle("personality", e.target.value)} className={fieldInputClass} placeholder="e.g., Honest, Responsible" />
          )}
        </Field>
      </FormSection>

      <FormSection title="Partner Preference">
        <Field label="Age Range">
          {(id) => (
            <input id={id} type="text" value={partner.ageRange} onChange={(e) => updatePartner("ageRange", e.target.value)} className={fieldInputClass} placeholder="e.g., 20 – 27 years" />
          )}
        </Field>
        <Field label="Height Range">
          {(id) => (
            <input id={id} type="text" value={partner.heightRange} onChange={(e) => updatePartner("heightRange", e.target.value)} className={fieldInputClass} placeholder={`e.g., 5'2" – 5'5"`} />
          )}
        </Field>
        <Field label="Education">
          {(id) => (
            <input id={id} type="text" value={partner.education} onChange={(e) => updatePartner("education", e.target.value)} className={fieldInputClass} placeholder="e.g., Any / Graduate" />
          )}
        </Field>
        <Field label="Working">
          {(id) => (
            <input id={id} type="text" value={partner.working} onChange={(e) => updatePartner("working", e.target.value)} className={fieldInputClass} placeholder="e.g., Not mandatory" />
          )}
        </Field>
        <Field label="Religion">
          {(id) => (
            <input id={id} type="text" value={partner.religion} onChange={(e) => updatePartner("religion", e.target.value)} className={fieldInputClass} placeholder="e.g., Islam" />
          )}
        </Field>
        <Field label="Preferred Location">
          {(id) => (
            <input id={id} type="text" value={partner.location} onChange={(e) => updatePartner("location", e.target.value)} className={fieldInputClass} placeholder="e.g., Cumilla - B.Baria preferred" />
          )}
        </Field>
      </FormSection>
    </>
  );
}
