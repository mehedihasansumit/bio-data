"use client";

import { FamilyInfo } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: FamilyInfo;
  onChange: (data: FamilyInfo) => void;
}

export default function FamilyInfoForm({ data, onChange }: Props) {
  const update = (field: keyof FamilyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormSection title="Family Information">
      <Field label="Father's Name">
        {(id) => (
          <input id={id} type="text" value={data.fatherName} onChange={(e) => update("fatherName", e.target.value)} className={fieldInputClass} placeholder="Father's full name" />
        )}
      </Field>
      <Field label="Father's Occupation">
        {(id) => (
          <input id={id} type="text" value={data.fatherOccupation} onChange={(e) => update("fatherOccupation", e.target.value)} className={fieldInputClass} placeholder="Father's occupation" />
        )}
      </Field>

      <Field label="Mother's Name">
        {(id) => (
          <input id={id} type="text" value={data.motherName} onChange={(e) => update("motherName", e.target.value)} className={fieldInputClass} placeholder="Mother's full name" />
        )}
      </Field>
      <Field label="Mother's Occupation">
        {(id) => (
          <input id={id} type="text" value={data.motherOccupation} onChange={(e) => update("motherOccupation", e.target.value)} className={fieldInputClass} placeholder="Mother's occupation" />
        )}
      </Field>

      <Field label="Brothers / Sisters" wide>
        {(id) => (
          <input id={id} type="text" value={data.siblings} onChange={(e) => update("siblings", e.target.value)} className={fieldInputClass} placeholder="e.g., 2 Younger Sisters – Students" />
        )}
      </Field>

      <Field label="Family Type">
        {(id) => (
          <input id={id} type="text" value={data.familyType} onChange={(e) => update("familyType", e.target.value)} className={fieldInputClass} placeholder="e.g., Nuclear, Upper Middle Class" />
        )}
      </Field>
      <Field label="Family Values">
        {(id) => (
          <input id={id} type="text" value={data.familyValues} onChange={(e) => update("familyValues", e.target.value)} className={fieldInputClass} placeholder="e.g., Traditional & Religious" />
        )}
      </Field>

      <Field label="Native Place" wide>
        {(id) => (
          <input id={id} type="text" value={data.nativePlace} onChange={(e) => update("nativePlace", e.target.value)} className={fieldInputClass} placeholder="Ancestral hometown" />
        )}
      </Field>

      <Field label="Property" wide>
        {(id) => (
          <textarea id={id} value={data.property} onChange={(e) => update("property", e.target.value)} className={fieldInputClass} rows={2} placeholder="Family property details" />
        )}
      </Field>
    </FormSection>
  );
}
