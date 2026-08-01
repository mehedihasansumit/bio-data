"use client";

import { ReligiousInfo } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";
import { religionKind } from "@/lib/religion";

interface Props {
  religion: string;
  data: ReligiousInfo;
  onChange: (data: ReligiousInfo) => void;
}

const MANGLIK = ["No", "Yes", "Anshik (partial)", "Don't know"];
const PRAYER = [
  "Five times daily",
  "Regularly",
  "Occasionally",
  "Jumu'ah only",
  "Prefer not to say",
];

export default function ReligiousInfoForm({ religion, data, onChange }: Props) {
  const kind = religionKind(religion);
  const update = (field: keyof ReligiousInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  // Neither field set applies until a religion is chosen, and showing a Hindu
  // biodata's gotra beside a Muslim one's maslak would be wrong in both
  // directions. Render nothing rather than guess.
  if (kind === "none") return null;

  if (kind === "hindu") {
    return (
      <FormSection title="Religious & Community Details">
        <Field label="Caste">
          {(id) => <input id={id} type="text" value={data.caste} onChange={(e) => update("caste", e.target.value)} className={fieldInputClass} placeholder="e.g., Brahmin" />}
        </Field>
        <Field label="Sub-caste">
          {(id) => <input id={id} type="text" value={data.subCaste} onChange={(e) => update("subCaste", e.target.value)} className={fieldInputClass} placeholder="e.g., Kanyakubja" />}
        </Field>
        <Field label="Gotra">
          {(id) => <input id={id} type="text" value={data.gotra} onChange={(e) => update("gotra", e.target.value)} className={fieldInputClass} placeholder="e.g., Kashyap" />}
        </Field>
        <Field label="Rashi (Moon Sign)">
          {(id) => <input id={id} type="text" value={data.rashi} onChange={(e) => update("rashi", e.target.value)} className={fieldInputClass} placeholder="e.g., Mesh" />}
        </Field>
        <Field label="Nakshatra">
          {(id) => <input id={id} type="text" value={data.nakshatra} onChange={(e) => update("nakshatra", e.target.value)} className={fieldInputClass} placeholder="e.g., Rohini" />}
        </Field>
        <Field label="Manglik">
          {(id) => (
            <select id={id} value={data.manglik} onChange={(e) => update("manglik", e.target.value)} className={fieldInputClass}>
              <option value="">Select</option>
              {MANGLIK.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          )}
        </Field>
      </FormSection>
    );
  }

  return (
    <FormSection title="Religious Details">
      <Field label="Maslak / Sect">
        {(id) => <input id={id} type="text" value={data.maslak} onChange={(e) => update("maslak", e.target.value)} className={fieldInputClass} placeholder="e.g., Sunni (Hanafi)" />}
      </Field>
      <Field label="Prayer (Namaz)">
        {(id) => (
          <select id={id} value={data.prayerRegularity} onChange={(e) => update("prayerRegularity", e.target.value)} className={fieldInputClass}>
            <option value="">Select</option>
            {PRAYER.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        )}
      </Field>
      <Field label="Religious Observance" wide>
        {(id) => <input id={id} type="text" value={data.observance} onChange={(e) => update("observance", e.target.value)} className={fieldInputClass} placeholder="e.g., Keeps a beard / Observes purdah" />}
      </Field>
    </FormSection>
  );
}
