"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import type { TemplateProps } from "./BiodataPreview";

function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[115px] shrink-0 text-gray-600 font-medium">{row.label}</span>
            <span className="text-gray-800">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[115px] shrink-0 text-gray-600 font-medium">{row.l1}</span>
            <span className="w-[125px] shrink-0 text-gray-800">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[100px] shrink-0 text-gray-600 font-medium">{row.l2}</span>
                <span className="text-gray-800">{row.v2}</span>
              </>
            )}
          </div>
        ),
      )}
    </>
  );
}

export default function ModernTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      <div className="sheet-frame border-2 border-violet-200 rounded-lg overflow-hidden min-h-[277mm] flex flex-col">
        <div className="text-center pt-5 pb-3 px-5 break-inside-avoid">
          {/* Ornament, not content. Unhidden, a screen reader opens every
              biodata with "six petalled black and white florette" ×3. */}
          <div aria-hidden="true" className="text-violet-400 text-[12px] leading-none mb-1">&#10043; &#10043; &#10043;</div>
          <Title className="text-[18px] font-bold text-violet-700 tracking-[.15em] uppercase">{documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}</Title>
          <div className="w-36 mx-auto mt-1 border-t border-violet-300" />
          <div className="w-24 mx-auto mt-[2px] border-t border-violet-200" />
        </div>

        <div className="flex items-start gap-4 px-5 mb-2 break-inside-avoid">
          {personal.photo && (
            <div className="photo-frame w-[75px] h-[90px] rounded-lg overflow-hidden shrink-0 ring-2 ring-violet-200">
              <img
                src={personal.photo}
                alt={personal.fullName ? `Photograph of ${personal.fullName}` : "Photograph"}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 pt-1">
            {personal.fullName && <Name className="text-[15px] font-bold text-gray-900">{personal.fullName}</Name>}
            <div className="flex flex-wrap gap-2 mt-1.5">
              {headlineFacts(data).map((f) => (
                <span key={f} className="bg-violet-50 text-violet-700 text-[9px] px-2 py-[1px] rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 flex-1">
          {sections.map((section) => (
            <div key={section.id} className="mt-3 first:mt-0 break-inside-avoid">
              <Section className="text-[10px] font-bold uppercase tracking-[.15em] text-violet-600 mb-1 pb-1 border-b border-violet-100">
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}

          <div className="text-center mt-auto pt-4">
            <div aria-hidden="true" className="text-violet-300 text-[10px]">&#10043; &#10043; &#10043;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
