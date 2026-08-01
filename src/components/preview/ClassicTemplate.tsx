"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Ornament, Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[3px] text-[11px] leading-tight break-inside-avoid">
            <span className="w-[120px] shrink-0 font-semibold text-emerald-900">{row.label}</span>
            <span className="text-gray-700">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[3px] text-[11px] leading-tight break-inside-avoid">
            <span className="w-[120px] shrink-0 font-semibold text-emerald-900">{row.l1}</span>
            <span className="w-[130px] shrink-0 text-gray-700">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[110px] shrink-0 font-semibold text-emerald-900">{row.l2}</span>
                <span className="text-gray-700">{row.v2}</span>
              </>
            )}
          </div>
        ),
      )}
    </>
  );
}

export default function ClassicTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      <div className="sheet-frame border-[3px] border-double border-emerald-800 p-4 min-h-[277mm] flex flex-col">
        {/* Ornamental header */}
        <div className="text-center mb-3 break-inside-avoid">
          <Ornament glyph={"❅"} className="text-emerald-600 text-[12px] leading-none mb-1" />
          <Title className="text-[18px] font-bold text-emerald-900 tracking-[.15em] uppercase">{documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}</Title>
          <div className="w-36 mx-auto mt-1 border-t border-emerald-400" />
          <div className="w-24 mx-auto mt-[2px] border-t border-emerald-400/40" />
        </div>

        {/* Name + Photo */}
        <div className="flex justify-between items-start mb-2 break-inside-avoid">
          <div className="flex-1 pt-1">
            {personal.fullName && <Name className="text-[15px] font-bold text-gray-900">{personal.fullName}</Name>}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px] text-emerald-800">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
          {personal.photo && (
            <Photo
              src={personal.photo}
              name={personal.fullName}
              className="w-[80px] h-[100px] rounded-md ml-3 ring-1 ring-emerald-800/20"
            />
          )}
        </div>

        {sections.map((section) => (
          <div key={section.id} className="mt-3 break-inside-avoid">
            <Section className="bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-[3px] rounded-sm">
              {section.title}
            </Section>
            <div className="px-1 pt-1">
              <Rows rows={section.rows} />
            </div>
          </div>
        ))}

        <div className="text-center mt-auto pt-4">
          <Ornament glyph={"❅"} className="text-emerald-600/40 text-[10px]" />
        </div>
      </div>
    </div>
  );
}
