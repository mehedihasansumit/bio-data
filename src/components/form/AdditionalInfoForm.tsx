"use client";

import { LifestyleInfo, PartnerPreference } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";

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

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  return (
    <>
      <FormSection title="Lifestyle & Interests">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies</label>
          <input type="text" value={lifestyle.hobbies} onChange={(e) => updateLifestyle("hobbies", e.target.value)} className={inputClass} placeholder="e.g., Gaming, Traveling" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
          <input type="text" value={lifestyle.languages} onChange={(e) => updateLifestyle("languages", e.target.value)} className={inputClass} placeholder="e.g., Bengali, English, Hindi" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sports</label>
          <input type="text" value={lifestyle.sports} onChange={(e) => updateLifestyle("sports", e.target.value)} className={inputClass} placeholder="e.g., Cricket, Football" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personality</label>
          <input type="text" value={lifestyle.personality} onChange={(e) => updateLifestyle("personality", e.target.value)} className={inputClass} placeholder="e.g., Honest, Responsible" />
        </div>
      </FormSection>

      <FormSection title="Partner Preference">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
          <input type="text" value={partner.ageRange} onChange={(e) => updatePartner("ageRange", e.target.value)} className={inputClass} placeholder="e.g., 20 – 27 years" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height Range</label>
          <input type="text" value={partner.heightRange} onChange={(e) => updatePartner("heightRange", e.target.value)} className={inputClass} placeholder="e.g., 5'2&quot; – 5'5&quot;" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
          <input type="text" value={partner.education} onChange={(e) => updatePartner("education", e.target.value)} className={inputClass} placeholder="e.g., Any / Graduate" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Working</label>
          <input type="text" value={partner.working} onChange={(e) => updatePartner("working", e.target.value)} className={inputClass} placeholder="e.g., Not mandatory" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
          <input type="text" value={partner.religion} onChange={(e) => updatePartner("religion", e.target.value)} className={inputClass} placeholder="e.g., Islam" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
          <input type="text" value={partner.location} onChange={(e) => updatePartner("location", e.target.value)} className={inputClass} placeholder="e.g., Cumilla - B.Baria preferred" />
        </div>
      </FormSection>
    </>
  );
}
