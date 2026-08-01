"use client";

import { Address } from "@/types/biodata";
import FormSection from "@/components/ui/FormSection";
import Field, { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: Address;
  onChange: (data: Address) => void;
}

export default function AddressForm({ data, onChange }: Props) {
  const update = (field: keyof Address, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormSection title="Address">
      <Field label="Present Address" wide>
        {(id) => (
          <textarea
            id={id}
            value={data.presentAddress}
            onChange={(e) => update("presentAddress", e.target.value)}
            className={fieldInputClass}
            rows={2}
            placeholder="Enter present address"
            autoComplete="street-address"
          />
        )}
      </Field>

      <Field label="Permanent Address" wide>
        {(id) => (
          <textarea
            id={id}
            value={data.permanentAddress}
            onChange={(e) => update("permanentAddress", e.target.value)}
            className={fieldInputClass}
            rows={2}
            placeholder="Enter permanent address"
          />
        )}
      </Field>
    </FormSection>
  );
}
