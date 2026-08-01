"use client";

import { templates, TemplateName } from "@/types/templates";

interface Props {
  selected: TemplateName;
  onChange: (t: TemplateName) => void;
}

export default function TemplateSelector({ selected, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="Document template" className="flex gap-2 overflow-x-auto pb-1">
      {templates.map((t) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-2 min-h-11 px-3 py-2 rounded-lg border text-left transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 ${
              isSelected
                ? "border-gray-800 bg-gray-50 shadow-sm ring-1 ring-gray-800"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <span className="flex gap-[2px]" aria-hidden="true">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.primary }} />
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.accent }} />
            </span>
            <span className="block">
              <span className="block text-xs font-semibold text-gray-800">{t.name}</span>
              <span className="block text-[11px] text-gray-600 leading-tight">{t.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
