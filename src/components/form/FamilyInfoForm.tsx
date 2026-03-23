"use client";

import { FamilyInfo } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";

interface Props {
  data: FamilyInfo;
  onChange: (data: FamilyInfo) => void;
}

export default function FamilyInfoForm({ data, onChange }: Props) {
  const update = (field: keyof FamilyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  return (
    <FormSection title="Family Information">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Father&apos;s Name</label>
        <input type="text" value={data.fatherName} onChange={(e) => update("fatherName", e.target.value)} className={inputClass} placeholder="Father's full name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Father&apos;s Occupation</label>
        <input type="text" value={data.fatherOccupation} onChange={(e) => update("fatherOccupation", e.target.value)} className={inputClass} placeholder="Father's occupation" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mother&apos;s Name</label>
        <input type="text" value={data.motherName} onChange={(e) => update("motherName", e.target.value)} className={inputClass} placeholder="Mother's full name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mother&apos;s Occupation</label>
        <input type="text" value={data.motherOccupation} onChange={(e) => update("motherOccupation", e.target.value)} className={inputClass} placeholder="Mother's occupation" />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Brothers / Sisters</label>
        <input type="text" value={data.siblings} onChange={(e) => update("siblings", e.target.value)} className={inputClass} placeholder="e.g., 2 Younger Sisters – Students" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Family Type</label>
        <input type="text" value={data.familyType} onChange={(e) => update("familyType", e.target.value)} className={inputClass} placeholder="e.g., Nuclear, Upper Middle Class" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Family Values</label>
        <input type="text" value={data.familyValues} onChange={(e) => update("familyValues", e.target.value)} className={inputClass} placeholder="e.g., Traditional & Religious" />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Native Place</label>
        <input type="text" value={data.nativePlace} onChange={(e) => update("nativePlace", e.target.value)} className={inputClass} placeholder="Ancestral hometown" />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
        <textarea value={data.property} onChange={(e) => update("property", e.target.value)} className={inputClass} rows={2} placeholder="Family property details" />
      </div>
    </FormSection>
  );
}
