"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

const INK = "#111827";

/**
 * `#9ca3af` is 2.51:1 on white and therefore never carries text. Its one job in
 * this document is the single hairline under the head. Section headings and row
 * labels are `#111827` at 17.74:1, and the hierarchy comes from size, tracking,
 * weight and space — which is Plain's entire argument.
 */
const HAIRLINE = "#9ca3af";

/**
 * The wider measure buys a 130px label column, the widest in the set. The
 * widest label anyone can produce is "Permanent Address" at 108px at 11px, so
 * this clears it with room for a longer translation later.
 */
function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[130px] shrink-0 font-semibold" style={{ color: INK }}>
              {row.label}
            </span>
            <span className="text-gray-700">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[130px] shrink-0 font-semibold" style={{ color: INK }}>
              {row.l1}
            </span>
            <span className="w-[140px] shrink-0 text-gray-700">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[110px] shrink-0 font-semibold" style={{ color: INK }}>
                  {row.l2}
                </span>
                <span className="text-gray-700">{row.v2}</span>
              </>
            )}
          </div>
        ),
      )}
    </>
  );
}

export default function PlainTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      {/* `.sheet-frame` here is for the padding, not for a border — there is no
          border. `box-decoration-break: clone` repeats the 22mm inset on every
          fragment, so page two keeps the margin instead of dropping to the 10mm
          `@page` edge.

          No glyph anywhere in this template. The One Glyph Rule is a ceiling on
          ornament, not a floor, and "no ornament at all" is the whole of Plain's
          identity. */}
      <div className="sheet-frame p-[22mm] min-h-[277mm] flex flex-col">
        {/* The one rule in the document. Everything below it is separated by
            space alone. */}
        <header
          className="flex items-start justify-between gap-6 pb-4 mb-6 border-b break-inside-avoid"
          style={{ borderColor: HAIRLINE }}
        >
          <div className="min-w-0">
            <Title
              className="text-[18px] font-bold uppercase tracking-[.15em]"
              style={{ color: INK }}
            >
              {documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}
            </Title>
            {personal.fullName && (
              <Name className="text-[15px] font-bold mt-2" style={{ color: INK }}>
                {personal.fullName}
              </Name>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px] text-gray-600">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
          {personal.photo && (
            <Photo src={personal.photo} name={personal.fullName} className="w-[80px] h-[100px]" />
          )}
        </header>

        <div className="flex-1">
          {sections.map((section) => (
            <div key={section.id} className="mb-5 last:mb-0 break-inside-avoid">
              <Section
                className="text-[10px] font-bold uppercase tracking-[.15em] mb-2"
                style={{ color: INK }}
              >
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
