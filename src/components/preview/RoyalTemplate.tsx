"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import type { TemplateProps } from "./BiodataPreview";

const OXBLOOD = "#7f1d1d";
const CRIMSON = "#b91c1c";

function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[120px] shrink-0 font-semibold" style={{ color: OXBLOOD }}>{row.label}</span>
            <span className="text-gray-700">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[120px] shrink-0 font-semibold" style={{ color: OXBLOOD }}>{row.l1}</span>
            <span className="w-[125px] shrink-0 text-gray-700">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[105px] shrink-0 font-semibold" style={{ color: OXBLOOD }}>{row.l2}</span>
                <span className="text-gray-700">{row.v2}</span>
              </>
            )}
          </div>
        ),
      )}
    </>
  );
}

export default function RoyalTemplate({ data, headingLevel }: TemplateProps) {
  const { personal, education } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);
  const subtitle = [
    [education.designation, education.company].filter(Boolean).join(" at "),
    personal.hometown,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      {/* `flex-1` on the inner frame, not `min-h-full`. A percentage min-height
          resolves against the parent's *height*, which is auto here — the
          parent only has a min-height — so it computed to 0 and the crimson
          frame stopped at the end of the content, floating inside a full-page
          oxblood border with the footer ornament stranded under the last row.
          Growing the inner frame in a flex column is what the other three
          templates get for free by putting the min-height on the frame itself. */}
      <div className="border-2 p-1 min-h-[277mm] flex flex-col" style={{ borderColor: OXBLOOD }}>
        <div className="border p-4 flex-1 flex flex-col" style={{ borderColor: `${CRIMSON}4d` }}>
          <div className="text-center mb-3 break-inside-avoid">
            {/* Ornament, not content. Unhidden, a screen reader opens every
                biodata with "florette florette florette". */}
            <div aria-hidden="true" className="text-[14px] leading-none mb-1" style={{ color: CRIMSON }}>&#10048; &#10048; &#10048;</div>
            <Title className="text-[16px] font-bold tracking-[.2em] uppercase" style={{ color: OXBLOOD }}>{documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}</Title>
            <div className="w-36 mx-auto mt-1 border-t" style={{ borderColor: `${CRIMSON}66` }} />
            <div className="w-24 mx-auto mt-[2px] border-t" style={{ borderColor: `${CRIMSON}33` }} />
          </div>

          <div className="flex items-start gap-4 mb-2 break-inside-avoid">
            {personal.photo && (
              <div className="photo-frame w-20 h-20 rounded-md overflow-hidden shrink-0" style={{ boxShadow: `0 0 0 1px ${OXBLOOD}4d` }}>
                <img
                  src={personal.photo}
                  alt={personal.fullName ? `Photograph of ${personal.fullName}` : "Photograph"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 pt-1">
              {personal.fullName && <Name className="text-[15px] font-bold text-gray-900">{personal.fullName}</Name>}
              {subtitle && <p className="text-[10px] text-gray-600 mt-0.5">{subtitle}</p>}
              <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px]" style={{ color: OXBLOOD }}>
                {headlineFacts(data).map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.id} className="mt-3 break-inside-avoid">
              <div className="flex items-center gap-2 mb-1">
                <span aria-hidden="true" className="text-[10px]" style={{ color: CRIMSON }}>&#10022;</span>
                <Section className="text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: OXBLOOD }}>
                  {section.title}
                </Section>
                <div
                  className="h-[1px] flex-1"
                  style={{ backgroundImage: `linear-gradient(to right, ${CRIMSON}4d, transparent)` }}
                />
              </div>
              <div className="pl-1">
                <Rows rows={section.rows} />
              </div>
            </div>
          ))}

          <div className="text-center mt-auto pt-4">
            <div aria-hidden="true" className="text-[10px]" style={{ color: `${CRIMSON}66` }}>&#10022; &#10022; &#10022;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
