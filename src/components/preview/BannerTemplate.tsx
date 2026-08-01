"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Ornament, Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

const INDIGO = "#312e81";
const ACCENT = "#818cf8";

/**
 * The accent lives on the banner; the primary lives on the paper.
 *
 * `#818cf8` is 3.83:1 on indigo — a visible hairline or ornament there — and
 * 2.98:1 on white, below what a rule wants. So on paper the rules are indigo at
 * reduced alpha and the accent stays inside the band. White on indigo is
 * 11.42:1 and indigo on white is the same, so all text is safe either way.
 */
const RULE = `${INDIGO}33`;

/** Banner keeps the paired row: it has the full 684px, so 120/130/110 fits. */
function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[120px] shrink-0 font-semibold" style={{ color: INDIGO }}>
              {row.label}
            </span>
            <span className="text-gray-700">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[120px] shrink-0 font-semibold" style={{ color: INDIGO }}>
              {row.l1}
            </span>
            <span className="w-[130px] shrink-0 text-gray-700">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[110px] shrink-0 font-semibold" style={{ color: INDIGO }}>
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

export default function BannerTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      {/* No `.sheet-frame` and no vertical inset, deliberately: there is no
          border to close and no frame padding to clone. The 10mm `@page` margin
          is this template's inset, so page two begins at the page edge, which is
          the right behaviour for an unframed sheet.

          The band is full-bleed across the whole live area and appears on page
          one only. A banner repeated on every page would lay indigo down every
          sheet at a print shop now that `print-color-adjust: exact` forces fills
          to print — the same argument that makes Panel a float. */}
      <div className="min-h-[277mm] flex flex-col">
        <header
          className="flex items-start gap-5 px-6 py-5 break-inside-avoid"
          style={{ backgroundColor: INDIGO }}
        >
          {personal.photo && (
            <Photo
              src={personal.photo}
              name={personal.fullName}
              className="w-[80px] h-[100px]"
              style={{ boxShadow: `0 0 0 2px ${ACCENT}` }}
            />
          )}
          <div className="flex-1 min-w-0 pt-1">
            <Ornament
              glyph={"❈"}
              className="text-[12px] leading-none mb-1"
              style={{ color: ACCENT }}
            />
            <Title className="text-[18px] font-bold uppercase tracking-[.15em] text-white">
              {documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}
            </Title>
            <div className="w-24 mt-1 border-t" style={{ borderColor: ACCENT }} />
            {personal.fullName && (
              <Name className="text-[15px] font-bold text-white mt-2">{personal.fullName}</Name>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px] text-white">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="flex-1 px-6 pt-4">
          {sections.map((section) => (
            <div key={section.id} className="mt-3 first:mt-0 break-inside-avoid">
              <Section
                className="text-[10px] font-bold uppercase tracking-[.14em] pb-1 mb-1 border-b"
                style={{ color: INDIGO, borderColor: RULE }}
              >
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}
        </div>

        <div className="text-center px-6 pt-4 pb-4">
          <Ornament glyph={"❈"} className="text-[10px]" style={{ color: `${INDIGO}66` }} />
        </div>
      </div>
    </div>
  );
}
