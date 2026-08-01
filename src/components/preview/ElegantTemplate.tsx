"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import type { TemplateProps } from "./BiodataPreview";

const NAVY = "#1e3a5f";
const GOLD = "#d4a853";

/**
 * The four gold L-brackets, as eight background layers instead of four
 * absolutely-positioned divs.
 *
 * An absolutely-positioned corner belongs to the box as a whole, so when the
 * frame splits across pages the top pair paints on the first page and the
 * bottom pair on the last — every page ends up half-bracketed. Backgrounds are
 * part of the box decoration, so `box-decoration-break: clone` repeats all
 * four on every fragment, which is the whole point of the brackets: they are
 * what tells you this page is Elegant.
 *
 * Two layers per corner — a 20×3 arm and a 3×20 arm — matching the `w-5 h-5`
 * boxes with 3px borders they replace. Positioned against the padding box,
 * which is where the absolute insets resolved to, so the geometry is unchanged.
 */
const CORNER_BRACKETS: React.CSSProperties = {
  backgroundImage: Array(8).fill(`linear-gradient(${GOLD}, ${GOLD})`).join(", "),
  backgroundSize:
    "20px 3px, 3px 20px, 20px 3px, 3px 20px, 20px 3px, 3px 20px, 20px 3px, 3px 20px",
  backgroundPosition:
    "left top, left top, right top, right top, left bottom, left bottom, right bottom, right bottom",
  backgroundRepeat: "no-repeat",
};

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

export default function ElegantTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      <div
        /* The vertical inset belongs to the frame, not to the blocks inside it.
           `box-decoration-break: clone` repeats the frame's own padding on
           every fragment, so this is what holds content off the border where a
           page breaks; padding on an inner wrapper just continues through the
           break and leaves rows touching the new page's top border. Taken off
           the header and the section list below in equal measure, so page one
           is unchanged. */
        className="sheet-frame border pt-5 pb-3 min-h-[277mm] flex flex-col"
        style={{ borderColor: NAVY, ...CORNER_BRACKETS }}
      >
        <div className="text-center pb-3 px-5 break-inside-avoid">
          {/* Ornament, not content. Unhidden, a screen reader opens every
              biodata with "black florette black florette black florette". */}
          <div aria-hidden="true" className="text-[12px] leading-none mb-1" style={{ color: GOLD }}>&#10047; &#10047; &#10047;</div>
          <Title className="text-[18px] font-bold tracking-[.18em] uppercase" style={{ color: NAVY }}>{documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}</Title>
          <div className="w-36 mx-auto mt-1 border-t" style={{ borderColor: GOLD }} />
          <div className="w-24 mx-auto mt-[2px] border-t" style={{ borderColor: `${GOLD}66` }} />
        </div>

        <div className="flex items-start gap-4 px-5 mb-2 break-inside-avoid">
          {personal.photo && (
            <div className="photo-frame w-[80px] h-[100px] rounded-md overflow-hidden shrink-0" style={{ boxShadow: `0 0 0 2px ${GOLD}80` }}>
              <img
                src={personal.photo}
                alt={personal.fullName ? `Photograph of ${personal.fullName}` : "Photograph"}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 pt-1">
            {personal.fullName && <Name className="text-[15px] font-bold" style={{ color: NAVY }}>{personal.fullName}</Name>}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px]" style={{ color: NAVY }}>
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pt-3 flex-1">
          {sections.map((section) => (
            <div key={section.id} className="mt-3 first:mt-0 break-inside-avoid">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-[2px] w-3" style={{ backgroundColor: GOLD }} />
                <Section className="text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: NAVY }}>
                  {section.title}
                </Section>
                <div className="h-[2px] flex-1" style={{ backgroundColor: `${GOLD}66` }} />
              </div>
              <div className="pl-1">
                <Rows rows={section.rows} />
              </div>
            </div>
          ))}

          <div className="text-center mt-auto pt-4">
            <div aria-hidden="true" className="text-[10px]" style={{ color: `${GOLD}80` }}>&#10047; &#10047; &#10047;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
