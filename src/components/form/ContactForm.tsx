"use client";

import { Contact } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: Contact;
  onChange: (data: Contact) => void;
}

const RELATIONS = ["Self", "Father", "Mother", "Brother", "Sister", "Uncle", "Aunt", "Guardian"];

export default function ContactForm({ data, onChange }: Props) {
  const update = (field: keyof Contact, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormSection title="Contact Information">
      <Field label="Contact Person">
        {(id) => <input id={id} type="text" value={data.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className={fieldInputClass} placeholder="Full name" />}
      </Field>
      <Field label="Their Relation to You">
        {(id) => (
          <select id={id} value={data.contactRelation} onChange={(e) => update("contactRelation", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            {RELATIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        )}
      </Field>
      <Field label="Phone Number">
        {(id) => <input id={id} type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={fieldInputClass} placeholder="e.g., +880 1XXXXXXXXX" autoComplete="tel" inputMode="tel" />}
      </Field>
      <Field label="Alternate Phone">
        {(id) => <input id={id} type="tel" value={data.alternatePhone} onChange={(e) => update("alternatePhone", e.target.value)} className={fieldInputClass} placeholder="Optional second number" inputMode="tel" />}
      </Field>
      <Field label="WhatsApp Number">
        {(id) => <input id={id} type="tel" value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className={fieldInputClass} placeholder="e.g., +880 1XXXXXXXXX" inputMode="tel" />}
      </Field>
      <Field label="Email">
        {(id) => <input id={id} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={fieldInputClass} placeholder="email@example.com" autoComplete="email" inputMode="email" />}
      </Field>
    </FormSection>
  );
}
