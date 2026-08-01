"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Ornament, Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

const OCHRE = "#92400e";
const AMBER = "#d97706";

/**
 * Compact's accent goes the other way from Panel's and Banner's.
 *
 * `#d97706` is 3.20:1 on white and only 2.21:1 on the ochre band, so it lives
 * on the paper — section rules and the footer ornament — and the band's own
 * ornament is white at 70% instead. It is never text anywhere: ochre carries
 * every label, at 7.09:1.
 */

/**
 * One label, one value, always — a 90mm column has no room for four cells.
 *
 * Both halves of a `pair` still print, as consecutive lines. Content Parity is
 * about every field appearing, not about how many cells a line has.
 */
function Rows({ rows }: { rows: DocRow[] }) {
  const flat = rows.flatMap((row) =>
    row.kind === "single"
      ? [{ label: row.label, value: row.value }]
      : [
          { label: row.l1, value: row.v1 },
          { label: row.l2, value: row.v2 },
        ],
  );
  return (
    <>
      {flat.map((row, i) => (
        /* 10px, and only here. The 11px Record Rule holds everywhere else; this
           exemption is Compact's alone and was bought with a 4× legibility
           check on Bengali conjuncts in Hind Siliguri. The 104px label column
           was measured, not estimated — 78px overflowed and
           `ভাই-বোনের বিবরণ` collided with its own value. */
        <div key={i} className="flex py-[1.5px] text-[10px] leading-snug break-inside-avoid">
          <span className="w-[104px] shrink-0 font-semibold" style={{ color: OCHRE }}>
            {row.label}
          </span>
          <span className="text-gray-700">{row.value}</span>
        </div>
      ))}
    </>
  );
}

export default function CompactTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      {/* 3mm frame padding, not the usual 12px: it is what leaves two true 90mm
          columns inside a 190mm sheet once the 4mm gutter is taken —
          (190 − 6 − 4) / 2 = 90. The inset sits on the frame itself so
          `box-decoration-break: clone` repeats it on every fragment. */}
      <div
        className="sheet-frame border p-[3mm] min-h-[277mm] flex flex-col"
        style={{ borderColor: OCHRE }}
      >
        <header
          className="flex items-center gap-3 px-3 py-2 mb-3 break-inside-avoid"
          style={{ backgroundColor: OCHRE }}
        >
          {personal.photo && (
            <Photo
              src={personal.photo}
              name={personal.fullName}
              className="w-[54px] h-[68px]"
              style={{ boxShadow: `0 0 0 1px #ffffff66` }}
            />
          )}
          <div className="flex-1 min-w-0">
            <Ornament glyph={"✤"} className="text-[10px] leading-none mb-[2px] text-white/70" />
            <Title className="text-[16px] font-bold uppercase tracking-[.18em] text-white">
              {documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}
            </Title>
            {/* 15px, the ramp's document-name step, even in the dense template —
                the band has room and the four px it saves are not worth an
                undocumented deviation. The 16px Title above is a deliberate
                tightening, with Royal's 16px/0.2em as precedent. */}
            {personal.fullName && (
              <Name className="text-[15px] font-bold text-white mt-[2px]">
                {personal.fullName}
              </Name>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-0 mt-[2px] text-[9px] text-white">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </header>

        {/* Two columns, `break-inside-avoid` on every section, default
            `column-fill: balance`. Prototyped in a real print PDF: no section
            split across a column boundary, the frame closed on all sides, and a
            document with three times the real section count still fit one
            sheet. */}
        <div className="flex-1 [column-count:2] [column-gap:4mm]">
          {sections.map((section) => (
            <div key={section.id} className="mb-3 break-inside-avoid">
              <Section
                className="text-[10px] font-bold uppercase tracking-[.14em] pb-[2px] mb-1 border-b"
                style={{ color: OCHRE, borderColor: AMBER }}
              >
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Ornament glyph={"✤"} className="text-[10px]" style={{ color: `${AMBER}99` }} />
        </div>
      </div>
    </div>
  );
}
