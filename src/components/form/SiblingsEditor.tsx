"use client";

import { useId } from "react";
import { emptySibling, Sibling } from "@/types/biodata";
import { fieldInputClass } from "@/components/ui/Field";

interface Props {
  siblings: Sibling[];
  onChange: (siblings: Sibling[]) => void;
}

const RELATIONS = ["Brother", "Sister"];
const ORDERS = ["Elder", "Younger"];
const MARITAL = ["Unmarried", "Married", "Divorced", "Widowed"];

export default function SiblingsEditor({ siblings, onChange }: Props) {
  const baseId = useId();

  const update = (index: number, field: keyof Sibling, value: string) => {
    onChange(siblings.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const add = () => onChange([...siblings, { ...emptySibling }]);
  const remove = (index: number) => onChange(siblings.filter((_, i) => i !== index));

  return (
    <div className="sm:col-span-2">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Brothers &amp; Sisters</h4>

      {siblings.length === 0 && (
        <p className="text-sm text-gray-600 mb-3">
          None added yet. Add each brother or sister so their occupation appears on the
          biodata.
        </p>
      )}

      <ul className="space-y-3">
        {siblings.map((sibling, i) => {
          const id = (field: string) => `${baseId}-${i}-${field}`;
          const label = sibling.name || `${sibling.order} ${sibling.relation}`.trim();
          return (
            <li key={i} className="rounded-lg border border-gray-300 p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  {label || `Sibling ${i + 1}`}
                </p>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="min-h-11 px-3 text-sm font-medium text-red-700 rounded-lg hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                >
                  Remove<span className="sr-only"> {label || `sibling ${i + 1}`}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor={id("name")} className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input id={id("name")} type="text" value={sibling.name} onChange={(e) => update(i, "name", e.target.value)} className={fieldInputClass} placeholder="Full name" />
                </div>

                <div>
                  <label htmlFor={id("relation")} className="block text-sm font-medium text-gray-700 mb-1">Brother or Sister</label>
                  <select id={id("relation")} value={sibling.relation} onChange={(e) => update(i, "relation", e.target.value)} className={fieldInputClass}>
                    {RELATIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor={id("order")} className="block text-sm font-medium text-gray-700 mb-1">Elder or Younger</label>
                  <select id={id("order")} value={sibling.order} onChange={(e) => update(i, "order", e.target.value)} className={fieldInputClass}>
                    {ORDERS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor={id("marital")} className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  <select id={id("marital")} value={sibling.maritalStatus} onChange={(e) => update(i, "maritalStatus", e.target.value)} className={fieldInputClass}>
                    <option value="">Select</option>
                    {MARITAL.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor={id("occupation")} className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <input id={id("occupation")} type="text" value={sibling.occupation} onChange={(e) => update(i, "occupation", e.target.value)} className={fieldInputClass} placeholder="e.g., Banker" />
                </div>

                {sibling.maritalStatus === "Married" && (
                  <div>
                    <label htmlFor={id("spouse")} className="block text-sm font-medium text-gray-700 mb-1">Spouse&apos;s Occupation</label>
                    <input id={id("spouse")} type="text" value={sibling.spouseOccupation} onChange={(e) => update(i, "spouseOccupation", e.target.value)} className={fieldInputClass} placeholder="e.g., Schoolteacher" />
                  </div>
                )}

                <div>
                  <label htmlFor={id("location")} className="block text-sm font-medium text-gray-700 mb-1">Lives In</label>
                  <input id={id("location")} type="text" value={sibling.location} onChange={(e) => update(i, "location", e.target.value)} className={fieldInputClass} placeholder="e.g., Dhaka" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={add}
        className="mt-3 min-h-11 px-4 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        Add brother or sister
      </button>
    </div>
  );
}
