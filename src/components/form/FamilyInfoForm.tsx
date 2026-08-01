"use client";

import { FamilyInfo, Sibling } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";
import SiblingsEditor from "@/components/form/SiblingsEditor";

interface Props {
  data: FamilyInfo;
  onChange: (data: FamilyInfo) => void;
}

const PARENT_STATUS = ["Living", "Late"];

export default function FamilyInfoForm({ data, onChange }: Props) {
  const update = (field: keyof FamilyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const updateSiblings = (siblings: Sibling[]) => onChange({ ...data, siblings });

  return (
    <FormSection title="Family Information">
      <Field label="Father's Name">
        {(id) => <input id={id} type="text" value={data.fatherName} onChange={(e) => update("fatherName", e.target.value)} className={fieldInputClass} placeholder="Father's full name" />}
      </Field>
      <Field label="Father's Status">
        {(id) => (
          <select id={id} value={data.fatherStatus} onChange={(e) => update("fatherStatus", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            {PARENT_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </Field>
      <Field label="Father's Occupation" wide>
        {(id) => <input id={id} type="text" value={data.fatherOccupation} onChange={(e) => update("fatherOccupation", e.target.value)} className={fieldInputClass} placeholder="Father's occupation" />}
      </Field>

      <Field label="Mother's Name">
        {(id) => <input id={id} type="text" value={data.motherName} onChange={(e) => update("motherName", e.target.value)} className={fieldInputClass} placeholder="Mother's full name" />}
      </Field>
      <Field label="Mother's Status">
        {(id) => (
          <select id={id} value={data.motherStatus} onChange={(e) => update("motherStatus", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            {PARENT_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </Field>
      <Field label="Mother's Occupation" wide>
        {(id) => <input id={id} type="text" value={data.motherOccupation} onChange={(e) => update("motherOccupation", e.target.value)} className={fieldInputClass} placeholder="Mother's occupation" />}
      </Field>

      <Field label="Number of Brothers">
        {(id) => <input id={id} type="text" value={data.brothersCount} onChange={(e) => update("brothersCount", e.target.value)} className={fieldInputClass} placeholder="e.g., 1" inputMode="numeric" />}
      </Field>
      <Field label="Number of Sisters">
        {(id) => <input id={id} type="text" value={data.sistersCount} onChange={(e) => update("sistersCount", e.target.value)} className={fieldInputClass} placeholder="e.g., 2" inputMode="numeric" />}
      </Field>

      <SiblingsEditor siblings={data.siblings} onChange={updateSiblings} />

      <Field label="Or describe them in one line" wide>
        {(id) => <input id={id} type="text" value={data.siblingsNote} onChange={(e) => update("siblingsNote", e.target.value)} className={fieldInputClass} placeholder="e.g., 2 younger sisters – both students" />}
      </Field>

      <Field label="Family Type">
        {(id) => <input id={id} type="text" value={data.familyType} onChange={(e) => update("familyType", e.target.value)} className={fieldInputClass} placeholder="e.g., Nuclear, Upper Middle Class" />}
      </Field>
      <Field label="Family Values">
        {(id) => <input id={id} type="text" value={data.familyValues} onChange={(e) => update("familyValues", e.target.value)} className={fieldInputClass} placeholder="e.g., Traditional & Religious" />}
      </Field>

      <Field label="Economic Status">
        {(id) => <input id={id} type="text" value={data.economicStatus} onChange={(e) => update("economicStatus", e.target.value)} className={fieldInputClass} placeholder="e.g., Solvent" />}
      </Field>
      <Field label="Notable Relative">
        {(id) => <input id={id} type="text" value={data.notableRelative} onChange={(e) => update("notableRelative", e.target.value)} className={fieldInputClass} placeholder="e.g., Uncle – College Principal" />}
      </Field>

      <Field label="Native Place" wide>
        {(id) => <input id={id} type="text" value={data.nativePlace} onChange={(e) => update("nativePlace", e.target.value)} className={fieldInputClass} placeholder="Ancestral hometown" />}
      </Field>

      <Field label="Property" wide>
        {(id) => <textarea id={id} value={data.property} onChange={(e) => update("property", e.target.value)} className={fieldInputClass} rows={2} placeholder="Family property details" />}
      </Field>
    </FormSection>
  );
}
