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

const DIETS = ["Vegetarian", "Non-vegetarian", "Eggetarian", "Vegan", "Non-vegetarian (halal)"];
const YES_NO = ["No", "Occasionally", "Yes"];
const PARTNER_DIET = ["Any", "Vegetarian", "Non-vegetarian", "Eggetarian"];
const PARTNER_MARITAL = ["Never Married", "Never Married or Divorced", "Any"];

export default function AdditionalInfoForm({
  lifestyle,
  partner,
  onLifestyleChange,
  onPartnerChange,
}: Props) {
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
          {(id) => <input id={id} type="text" value={lifestyle.hobbies} onChange={(e) => updateLifestyle("hobbies", e.target.value)} className={fieldInputClass} placeholder="e.g., Gaming, Traveling" />}
        </Field>
        <Field label="Languages">
          {(id) => <input id={id} type="text" value={lifestyle.languages} onChange={(e) => updateLifestyle("languages", e.target.value)} className={fieldInputClass} placeholder="e.g., Bengali, English, Hindi" />}
        </Field>
        <Field label="Sports">
          {(id) => <input id={id} type="text" value={lifestyle.sports} onChange={(e) => updateLifestyle("sports", e.target.value)} className={fieldInputClass} placeholder="e.g., Cricket, Football" />}
        </Field>
        <Field label="Personality">
          {(id) => <input id={id} type="text" value={lifestyle.personality} onChange={(e) => updateLifestyle("personality", e.target.value)} className={fieldInputClass} placeholder="e.g., Honest, Responsible" />}
        </Field>
        <Field label="Diet">
          {(id) => (
            <select id={id} value={lifestyle.diet} onChange={(e) => updateLifestyle("diet", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {DIETS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          )}
        </Field>
        <Field label="Smoking">
          {(id) => (
            <select id={id} value={lifestyle.smoking} onChange={(e) => updateLifestyle("smoking", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {YES_NO.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          )}
        </Field>
        <Field label="Drinking">
          {(id) => (
            <select id={id} value={lifestyle.drinking} onChange={(e) => updateLifestyle("drinking", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {YES_NO.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          )}
        </Field>
      </FormSection>

      <FormSection title="Partner Preference">
        <Field label="Age Range">
          {(id) => <input id={id} type="text" value={partner.ageRange} onChange={(e) => updatePartner("ageRange", e.target.value)} className={fieldInputClass} placeholder="e.g., 20 – 27 years" />}
        </Field>
        <Field label="Height Range">
          {(id) => <input id={id} type="text" value={partner.heightRange} onChange={(e) => updatePartner("heightRange", e.target.value)} className={fieldInputClass} placeholder={`e.g., 5'2" – 5'5"`} />}
        </Field>
        <Field label="Complexion">
          {(id) => <input id={id} type="text" value={partner.complexion} onChange={(e) => updatePartner("complexion", e.target.value)} className={fieldInputClass} placeholder="e.g., Any" />}
        </Field>
        <Field label="Education">
          {(id) => <input id={id} type="text" value={partner.education} onChange={(e) => updatePartner("education", e.target.value)} className={fieldInputClass} placeholder="e.g., Any / Graduate" />}
        </Field>
        <Field label="Profession">
          {(id) => <input id={id} type="text" value={partner.profession} onChange={(e) => updatePartner("profession", e.target.value)} className={fieldInputClass} placeholder="e.g., Any" />}
        </Field>
        <Field label="Working">
          {(id) => <input id={id} type="text" value={partner.working} onChange={(e) => updatePartner("working", e.target.value)} className={fieldInputClass} placeholder="e.g., Not mandatory" />}
        </Field>
        <Field label="Religion">
          {(id) => <input id={id} type="text" value={partner.religion} onChange={(e) => updatePartner("religion", e.target.value)} className={fieldInputClass} placeholder="e.g., Islam" />}
        </Field>
        <Field label="Marital Status">
          {(id) => (
            <select id={id} value={partner.maritalStatus} onChange={(e) => updatePartner("maritalStatus", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {PARTNER_MARITAL.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          )}
        </Field>
        <Field label="Family Type">
          {(id) => <input id={id} type="text" value={partner.familyType} onChange={(e) => updatePartner("familyType", e.target.value)} className={fieldInputClass} placeholder="e.g., Any" />}
        </Field>
        <Field label="Diet">
          {(id) => (
            <select id={id} value={partner.diet} onChange={(e) => updatePartner("diet", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {PARTNER_DIET.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          )}
        </Field>
        <Field label="Preferred Location">
          {(id) => <input id={id} type="text" value={partner.location} onChange={(e) => updatePartner("location", e.target.value)} className={fieldInputClass} placeholder="e.g., Cumilla - B.Baria preferred" />}
        </Field>
        <Field label="Living Abroad Acceptable">
          {(id) => (
            <select id={id} value={partner.abroadAcceptable} onChange={(e) => updatePartner("abroadAcceptable", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Open to discuss">Open to discuss</option>
            </select>
          )}
        </Field>
      </FormSection>
    </>
  );
}
