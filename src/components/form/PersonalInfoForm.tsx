"use client";

import { PersonalInfo } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import PhotoUpload from "@/components/ui/PhotoUpload";
import Field, { fieldInputClass } from "@/components/ui/Field";
import { calculateAge } from "@/lib/utils";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const COMPLEXIONS = ["Very Fair", "Fair", "Medium", "Olive", "Brown", "Dark"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function PersonalInfoForm({ data, onChange }: Props) {
  const update = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...data, [field]: value };
    if (field === "dateOfBirth") {
      updated.age = calculateAge(value);
    }
    onChange(updated);
  };

  return (
    <FormSection title="Personal Information">
      <PhotoUpload
        photo={data.photo}
        onChange={(base64) => update("photo", base64)}
      />

      <Field label="Full Name" required>
        {(id) => (
          <input id={id} type="text" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} className={fieldInputClass} placeholder="Enter full name" autoComplete="name" />
        )}
      </Field>

      <Field label="Birth Place">
        {(id) => (
          <input id={id} type="text" value={data.birthPlace} onChange={(e) => update("birthPlace", e.target.value)} className={fieldInputClass} placeholder="e.g., Nabinagar, B.Baria" />
        )}
      </Field>

      <Field label="Date of Birth">
        {(id) => (
          <input id={id} type="date" value={data.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} className={fieldInputClass} autoComplete="bday" />
        )}
      </Field>

      <Field label="Age">
        {(id) => (
          <input id={id} type="text" value={data.age} readOnly aria-live="polite" className={`${fieldInputClass} bg-gray-50`} placeholder="Calculated from date of birth" />
        )}
      </Field>

      <Field label="Height">
        {(id) => (
          <input id={id} type="text" value={data.height} onChange={(e) => update("height", e.target.value)} className={fieldInputClass} placeholder="e.g., 5 ft 8 in (173 cm)" />
        )}
      </Field>

      <Field label="Weight">
        {(id) => (
          <input id={id} type="text" value={data.weight} onChange={(e) => update("weight", e.target.value)} className={fieldInputClass} placeholder="e.g., 66 kg" />
        )}
      </Field>

      <Field label="Complexion">
        {(id) => (
          <select id={id} value={data.complexion} onChange={(e) => update("complexion", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            {COMPLEXIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Blood Group">
        {(id) => (
          <select id={id} value={data.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            {BLOOD_GROUPS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Religion">
        {(id) => (
          <input id={id} type="text" value={data.religion} onChange={(e) => update("religion", e.target.value)} className={fieldInputClass} placeholder="e.g., Islam" />
        )}
      </Field>

      <Field label="Mother Tongue">
        {(id) => (
          <input id={id} type="text" value={data.motherTongue} onChange={(e) => update("motherTongue", e.target.value)} className={fieldInputClass} placeholder="e.g., Bengali" />
        )}
      </Field>

      <Field label="Marital Status">
        {(id) => (
          <select id={id} value={data.maritalStatus} onChange={(e) => update("maritalStatus", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        )}
      </Field>

      <Field label="Nationality">
        {(id) => (
          <input id={id} type="text" value={data.nationality} onChange={(e) => update("nationality", e.target.value)} className={fieldInputClass} placeholder="e.g., Bangladeshi" autoComplete="country-name" />
        )}
      </Field>

      <Field label="Hometown / Current City" wide>
        {(id) => (
          <input id={id} type="text" value={data.hometown} onChange={(e) => update("hometown", e.target.value)} className={fieldInputClass} placeholder="e.g., Dhaka, Bangladesh" />
        )}
      </Field>
    </FormSection>
  );
}
