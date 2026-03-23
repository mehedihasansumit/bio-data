"use client";

import { Contact } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";

interface Props {
  data: Contact;
  onChange: (data: Contact) => void;
}

export default function ContactForm({ data, onChange }: Props) {
  const update = (field: keyof Contact, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  return (
    <FormSection title="Contact Information">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
        <input type="text" value={data.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className={inputClass} placeholder="e.g., Mother's Name (Relation)" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="e.g., +880 1XXXXXXXXX" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="email@example.com" />
      </div>
    </FormSection>
  );
}
