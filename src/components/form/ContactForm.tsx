"use client";

import { Contact } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: Contact;
  onChange: (data: Contact) => void;
}

export default function ContactForm({ data, onChange }: Props) {
  const update = (field: keyof Contact, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormSection title="Contact Information">
      <Field label="Contact Person">
        {(id) => (
          <input id={id} type="text" value={data.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className={fieldInputClass} placeholder="e.g., Mother's Name (Relation)" />
        )}
      </Field>
      <Field label="Phone Number">
        {(id) => (
          <input id={id} type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={fieldInputClass} placeholder="e.g., +880 1XXXXXXXXX" autoComplete="tel" inputMode="tel" />
        )}
      </Field>
      <Field label="Email">
        {(id) => (
          <input id={id} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={fieldInputClass} placeholder="email@example.com" autoComplete="email" inputMode="email" />
        )}
      </Field>
    </FormSection>
  );
}
