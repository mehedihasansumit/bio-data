"use client";

import { templates, TemplateName } from "@/types/templates";
import { useRovingRadio } from "@/components/ui/useRovingRadio";

interface Props {
  selected: TemplateName;
  onChange: (t: TemplateName) => void;
}

const IDS = templates.map((t) => t.id);

export default function TemplateSelector({ selected, onChange }: Props) {
  const { radioProps } = useRovingRadio(IDS, selected, onChange);

  return (
    /* A two-up grid, not a scrolling row. The preview column is 604px at every
       desktop width, and four ~230px chips in a row meant Royal sat entirely
       off-screen behind an `overflow-x-auto` with no fade, no arrows and no
       wrap — a quarter of the templates undiscoverable unless you happened to
       drag sideways inside a column that looked static. Two rows of two fit
       the column at every width the builder has. */
    <div role="radiogroup" aria-label="Document template" className="grid grid-cols-2 gap-2">
      {templates.map((t, i) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            {...radioProps(t.id, i)}
            className={`flex items-center gap-2 min-h-11 px-3 py-2 rounded-lg border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 ${
              isSelected
                ? "border-gray-800 bg-gray-50 shadow-sm ring-1 ring-gray-800"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <span className="flex gap-[2px] shrink-0" aria-hidden="true">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.primary }} />
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.accent }} />
            </span>
            <span className="block min-w-0">
              <span className="block text-xs font-semibold text-gray-800">{t.name}</span>
              <span className="block text-[11px] text-gray-600 leading-tight">{t.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
