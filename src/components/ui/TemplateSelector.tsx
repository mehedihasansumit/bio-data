"use client";

import { templates, TemplateName } from "@/types/templates";

interface Props {
  selected: TemplateName;
  onChange: (t: TemplateName) => void;
}

export default function TemplateSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all shrink-0 ${
            selected === t.id
              ? "border-gray-800 bg-gray-50 shadow-sm ring-1 ring-gray-800"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex gap-[2px]">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.primary }} />
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.accent }} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-800">{t.name}</div>
            <div className="text-[10px] text-gray-400 leading-tight">{t.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
