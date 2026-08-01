"use client";

import {
  BiodataMeta,
  CandidateKind,
  CANDIDATE_KINDS,
  DocumentLanguage,
  DOCUMENT_LANGUAGES,
} from "@/types/biodata";

interface Props {
  meta: BiodataMeta;
  onChange: (meta: BiodataMeta) => void;
}

/**
 * Bilingual by design, and the one place in the app where that is unambiguously
 * right: these two controls decide what the *document* says, so the person
 * choosing needs to recognise the option in whichever language they think in.
 * The document they produce is never bilingual — see docs/adr/0001.
 *
 * Bengali leads and English supports, matching the product's Bengali-first
 * stance, and mirroring the two-line shape of the template chip beside it.
 */
const CANDIDATE_LABELS: Record<CandidateKind, { bn: string; en: string }> = {
  unspecified: { bn: "উল্লেখ নয়", en: "Not specified" },
  bride: { bn: "পাত্রী", en: "Bride" },
  groom: { bn: "পাত্র", en: "Groom" },
};

const LANGUAGE_LABELS: Record<DocumentLanguage, { bn: string; en: string }> = {
  bn: { bn: "বাংলা", en: "Bengali document" },
  en: { bn: "ইংরেজি", en: "English document" },
};

function Segmented<T extends string>({
  label,
  hint,
  options,
  labels,
  selected,
  onSelect,
}: {
  label: string;
  hint: string;
  options: T[];
  labels: Record<T, { bn: string; en: string }>;
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      {/* Not uppercase and not tracked: this heading carries Bengali, where the
          Uppercase-Is-Structural Rule does not apply and tracking would sever
          the মাত্রা. Weight and colour do the work instead. */}
      <h3 className="text-xs font-semibold text-gray-700">{label}</h3>
      <p className="text-[11px] text-gray-500 mb-1.5">{hint}</p>
      <div role="radiogroup" aria-label={hint} className="flex gap-2 overflow-x-auto pb-1">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option)}
              className={`min-h-11 px-3 py-1.5 rounded-lg border text-left transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                isSelected
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <span className="block text-xs font-semibold">{labels[option].bn}</span>
              <span
                className={`block text-[10px] leading-tight ${
                  isSelected ? "text-emerald-100" : "text-gray-600"
                }`}
              >
                {labels[option].en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DocumentSettings({ meta, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Segmented
        label="কার বায়োডাটা?"
        hint="Whose biodata is this?"
        options={CANDIDATE_KINDS}
        labels={CANDIDATE_LABELS}
        selected={meta.candidateKind}
        onSelect={(candidateKind) => onChange({ ...meta, candidateKind })}
      />
      <Segmented
        label="ডকুমেন্টের ভাষা"
        hint="Language of the printed biodata"
        options={DOCUMENT_LANGUAGES}
        labels={LANGUAGE_LABELS}
        selected={meta.documentLanguage}
        onSelect={(documentLanguage) => onChange({ ...meta, documentLanguage })}
      />
    </div>
  );
}
