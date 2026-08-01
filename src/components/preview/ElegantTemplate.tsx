"use client";

import { BiodataFormData } from "@/types/biodata";
import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";

interface Props {
  data: BiodataFormData;
}

const NAVY = "#1e3a5f";
const GOLD = "#d4a853";

function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[115px] shrink-0 font-semibold" style={{ color: NAVY }}>{row.label}</span>
            <span className="text-gray-700">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[115px] shrink-0 font-semibold" style={{ color: NAVY }}>{row.l1}</span>
            <span className="w-[125px] shrink-0 text-gray-700">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[100px] shrink-0 font-semibold" style={{ color: NAVY }}>{row.l2}</span>
                <span className="text-gray-700">{row.v2}</span>
              </>
            )}
          </div>
        ),
      )}
    </>
  );
}

export default function ElegantTemplate({ data }: Props) {
  const { personal } = data;
  const sections = documentContent(data);

  return (
    <div className="bg-white p-5 max-w-[190mm] mx-auto print:p-0">
      <div className="border p-0 relative min-h-[277mm] flex flex-col" style={{ borderColor: NAVY }}>
        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px]" style={{ borderColor: GOLD }} />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px]" style={{ borderColor: GOLD }} />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px]" style={{ borderColor: GOLD }} />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px]" style={{ borderColor: GOLD }} />

        <div className="text-center pt-5 pb-3 px-5 break-inside-avoid">
          <div className="text-[12px] leading-none mb-1" style={{ color: GOLD }}>&#10047; &#10047; &#10047;</div>
          <h1 className="text-[18px] font-bold tracking-[.18em] uppercase" style={{ color: NAVY }}>{documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}</h1>
          <div className="w-36 mx-auto mt-1 border-t" style={{ borderColor: GOLD }} />
          <div className="w-24 mx-auto mt-[2px] border-t" style={{ borderColor: `${GOLD}66` }} />
        </div>

        <div className="flex items-start gap-4 px-5 mb-2 break-inside-avoid">
          {personal.photo && (
            <div className="w-[80px] h-[100px] rounded-md overflow-hidden shrink-0 ring-2" style={{ boxShadow: `0 0 0 2px ${GOLD}80` }}>
              <img
                src={personal.photo}
                alt={personal.fullName ? `Photograph of ${personal.fullName}` : "Photograph"}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 pt-1">
            {personal.fullName && <h2 className="text-[15px] font-bold" style={{ color: NAVY }}>{personal.fullName}</h2>}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px]" style={{ color: NAVY }}>
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 flex-1">
          {sections.map((section) => (
            <div key={section.id} className="mt-3 first:mt-0 break-inside-avoid">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-[2px] w-3" style={{ backgroundColor: GOLD }} />
                <h3 className="text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: NAVY }}>
                  {section.title}
                </h3>
                <div className="h-[2px] flex-1" style={{ backgroundColor: `${GOLD}66` }} />
              </div>
              <div className="pl-1">
                <Rows rows={section.rows} />
              </div>
            </div>
          ))}

          <div className="text-center mt-auto pt-4">
            <div className="text-[10px]" style={{ color: `${GOLD}80` }}>&#10047; &#10047; &#10047;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
