"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Ornament, Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

const TEAL = "#0f766e";
const ACCENT = "#5eead4";

/**
 * The accent lives on the panel; the primary lives on the paper.
 *
 * `#5eead4` is 3.74:1 on teal — fine for a hairline or a photo ring there — and
 * 1.48:1 on white, where it is invisible. So it never appears outside the
 * coloured band. Everything on white is teal, at 5.47:1 for text and at reduced
 * alpha for rules.
 */
const RULE = `${TEAL}33`;

/** Reduce a row to the label/value lines it actually contains. */
function flatten(rows: DocRow[]) {
  return rows.flatMap((row) =>
    row.kind === "single"
      ? [{ label: row.label, value: row.value }]
      : [
          { label: row.l1, value: row.v1 },
          { label: row.l2, value: row.v2 },
        ],
  );
}

/**
 * One label, one value, always.
 *
 * Panel flattens `pair` rows because its body has two different widths: ~472px
 * beside the float and ~684px below it. A four-cell row would leave the second
 * value 127px in the wrap zone and 236px underneath, so the same row type would
 * read as two different rows down one page. Both halves still print — this is
 * an arrangement decision, not a content one.
 */
function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {flatten(rows).map((row, i) => (
        <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
          <span className="w-[120px] shrink-0 font-semibold" style={{ color: TEAL }}>
            {row.label}
          </span>
          <span className="text-gray-700">{row.value}</span>
        </div>
      ))}
    </>
  );
}

/** Stacked label-over-value, for the 52mm panel where a 120px column will not fit. */
function PanelRows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {flatten(rows).map((row, i) => (
        <div key={i} className="mt-2 first:mt-0 break-inside-avoid">
          {row.label && (
            <div className="text-[11px] font-semibold leading-snug text-white">{row.label}</div>
          )}
          <div className="text-[11px] leading-snug text-white">{row.value}</div>
        </div>
      ))}
    </>
  );
}

export default function PanelTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  /* Contact moves into the panel, where it belongs on a sheet someone is going
     to act on. It is *moved*, never duplicated — Content Parity is about every
     field appearing, not about where. */
  const contact = sections.find((s) => s.id === "contact");
  const body = sections.filter((s) => s.id !== "contact");

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      <div
        className="sheet-frame border pt-4 pb-3 px-4 min-h-[277mm] flex flex-col"
        style={{ borderColor: TEAL }}
      >
        {/* A flex item is a block formatting context, so it contains the float
            without a clearfix and without letting it escape past the footer.

            The panel is a float rather than a column so that it *ends with its
            content*: page two runs full width with no orphaned colour band. An
            empty 52mm strip down every sheet reads as broken, and now that
            `print-color-adjust: exact` forces fills to print, it would lay a
            band of ink down every page at a print shop. */}
        <div className="flex-1">
          <aside
            className="float-left w-[52mm] mr-4 mb-3 p-3 break-inside-avoid"
            style={{ backgroundColor: TEAL }}
          >
            {personal.photo && (
              <Photo
                src={personal.photo}
                name={personal.fullName}
                className="w-[34mm] h-[42mm] mx-auto mb-3"
                style={{ boxShadow: `0 0 0 1px ${ACCENT}` }}
              />
            )}
            {personal.fullName && (
              <Name className="text-[15px] font-bold text-white text-center">
                {personal.fullName}
              </Name>
            )}
            <div className="mt-2 flex flex-col gap-[2px] text-[10px] text-white text-center">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>

            {contact && (
              <div className="mt-4 pt-3 border-t" style={{ borderColor: ACCENT }}>
                <Section className="text-[10px] font-bold uppercase tracking-[.14em] text-white mb-2">
                  {contact.title}
                </Section>
                {/* On this one reversed surface both label and value are white,
                    separated by weight. `ink-body` grey on teal is unreadable,
                    and The Neutral Value Rule's substance — no value is tinted
                    or emphasised — is untouched by dropping the tint from the
                    label instead. */}
                <PanelRows rows={contact.rows} />
              </div>
            )}
          </aside>

          {/* Left-aligned, because a centred title beside a left panel reads as
              a misalignment rather than a composition. */}
          <div className="mb-4 break-inside-avoid">
            <Ornament
              glyph={"❖"}
              className="text-[12px] leading-none mb-1"
              style={{ color: TEAL }}
            />
            <Title
              className="text-[18px] font-bold tracking-[.15em] uppercase"
              style={{ color: TEAL }}
            >
              {documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}
            </Title>
            <div className="mt-1 border-t" style={{ borderColor: TEAL }} />
          </div>

          {/* `flow-root` makes each section a block formatting context, which
              may not overlap the float — so a section sits *wholly* beside the
              panel or *wholly* below it. Without it a section straddles the
              float's bottom edge: its heading rule stops at the panel while its
              later rows run full width, which reads as a broken heading rather
              than as text wrapping.

              `flow-root` and not `overflow-hidden`, which would do the same on
              screen and then come apart in print — globals.css forces
              `overflow: visible` on everything inside #biodata-preview except
              the photo, so an overflow-based BFC silently stops being one on
              paper. `display` is untouched by that rule. */}
          {body.map((section) => (
            <div
              key={section.id}
              className="mt-3 first:mt-0 break-inside-avoid [display:flow-root]"
            >
              <Section
                className="text-[10px] font-bold uppercase tracking-[.14em] pb-1 mb-1 border-b"
                style={{ color: TEAL, borderColor: RULE }}
              >
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Ornament glyph={"❖"} className="text-[10px]" style={{ color: `${TEAL}66` }} />
        </div>
      </div>
    </div>
  );
}
