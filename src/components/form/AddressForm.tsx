"use client";

import { Address } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";

interface Props {
  data: Address;
  onChange: (data: Address) => void;
}

export default function AddressForm({ data, onChange }: Props) {
  const update = (field: keyof Address, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  return (
    <FormSection title="Address">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Present Address
        </label>
        <textarea
          value={data.presentAddress}
          onChange={(e) => update("presentAddress", e.target.value)}
          className={inputClass}
          rows={2}
          placeholder="Enter present address"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Permanent Address
        </label>
        <textarea
          value={data.permanentAddress}
          onChange={(e) => update("permanentAddress", e.target.value)}
          className={inputClass}
          rows={2}
          placeholder="Enter permanent address"
        />
      </div>
    </FormSection>
  );
}
