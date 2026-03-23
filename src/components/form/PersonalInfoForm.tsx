"use client";

import { PersonalInfo } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import PhotoUpload from "@/components/ui/PhotoUpload";
import { calculateAge } from "@/lib/utils";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
  const update = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...data, [field]: value };
    if (field === "dateOfBirth") {
      updated.age = calculateAge(value);
    }
    onChange(updated);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  return (
    <FormSection title="Personal Information">
      <PhotoUpload
        photo={data.photo}
        onChange={(base64) => update("photo", base64)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input type="text" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} placeholder="Enter full name" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Birth Place</label>
        <input type="text" value={data.birthPlace} onChange={(e) => update("birthPlace", e.target.value)} className={inputClass} placeholder="e.g., Nabinagar, B.Baria" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input type="date" value={data.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
        <input type="text" value={data.age} readOnly className={`${inputClass} bg-gray-50`} placeholder="Auto-calculated" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
        <input type="text" value={data.height} onChange={(e) => update("height", e.target.value)} className={inputClass} placeholder="e.g., 5 ft 8 in (173 cm)" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
        <input type="text" value={data.weight} onChange={(e) => update("weight", e.target.value)} className={inputClass} placeholder="e.g., 66 kg" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Complexion</label>
        <select value={data.complexion} onChange={(e) => update("complexion", e.target.value)} className={inputClass}>
          <option value="">Select</option>
          <option value="Very Fair">Very Fair</option>
          <option value="Fair">Fair</option>
          <option value="Medium">Medium</option>
          <option value="Olive">Olive</option>
          <option value="Brown">Brown</option>
          <option value="Dark">Dark</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
        <select value={data.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)} className={inputClass}>
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
        <input type="text" value={data.religion} onChange={(e) => update("religion", e.target.value)} className={inputClass} placeholder="e.g., Islam" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
        <input type="text" value={data.motherTongue} onChange={(e) => update("motherTongue", e.target.value)} className={inputClass} placeholder="e.g., Bengali" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
        <select value={data.maritalStatus} onChange={(e) => update("maritalStatus", e.target.value)} className={inputClass}>
          <option value="">Select</option>
          <option value="Never Married">Never Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
        <input type="text" value={data.nationality} onChange={(e) => update("nationality", e.target.value)} className={inputClass} placeholder="e.g., Bangladeshi" />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Hometown / Current City</label>
        <input type="text" value={data.hometown} onChange={(e) => update("hometown", e.target.value)} className={inputClass} placeholder="e.g., Dhaka, Bangladesh" />
      </div>
    </FormSection>
  );
}
