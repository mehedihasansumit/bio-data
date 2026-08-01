"use client";

import { templates, TemplateLayout, TemplateName } from "@/types/templates";
import { useRovingRadio } from "@/components/ui/useRovingRadio";

interface Props {
  selected: TemplateName;
  onChange: (t: TemplateName) => void;
}

const IDS = templates.map((t) => t.id);

/** The filled mass of a wireframe — a band, a panel, a title bar. */
const MASS = "bg-gray-400";
/** A row of text in a wireframe. */
const LINE = "bg-gray-300";

function Line({ w = "w-full" }: { w?: string }) {
  return <span className={`block h-[2px] ${w} ${LINE}`} />;
}

/**
 * A ~20×26px drawing of what the template actually looks like.
 *
 * This is necessary rather than cosmetic. The new inks sit close to the
 * existing ones in RGB terms — Panel teal is 47 from Classic emerald, Compact
 * ochre 43 from Royal oxblood, Banner indigo 41 from Elegant navy — which is
 * not distinguishable in a 12px swatch. Colour has stopped being the thing that
 * tells these templates apart; layout is, so the chooser shows layout.
 *
 * Drawn from `TemplateOption.layout` with plain divs, so adding a template
 * means picking one of five names and nothing else.
 */
function Wireframe({ layout }: { layout: TemplateLayout }) {
  return (
    <span
      aria-hidden="true"
      className={`block w-5 h-[26px] shrink-0 bg-white p-[2px] border ${
        /* Plain has no frame, and the wireframe says so. A transparent border
           rather than none, so all five drawings are the same size. */
        layout === "plain" ? "border-transparent" : "border-gray-300"
      }`}
    >
      {layout === "stacked" && (
        <span className="flex h-full flex-col gap-[2px]">
          <span className={`block h-[3px] w-3/5 self-center ${MASS}`} />
          <Line />
          <Line />
          <Line w="w-4/5" />
          <Line />
        </span>
      )}

      {layout === "panel" && (
        <span className="flex h-full gap-[2px]">
          <span className={`block w-2/5 h-full ${MASS}`} />
          <span className="flex flex-1 flex-col gap-[2px]">
            <Line />
            <Line />
            <Line w="w-3/4" />
            <Line />
            <Line />
          </span>
        </span>
      )}

      {layout === "two-column" && (
        <span className="flex h-full flex-col gap-[2px]">
          <span className={`block h-[4px] w-full ${MASS}`} />
          <span className="flex flex-1 gap-[2px]">
            <span className="flex flex-1 flex-col gap-[2px]">
              <Line />
              <Line />
              <Line w="w-3/4" />
              <Line />
            </span>
            <span className="flex flex-1 flex-col gap-[2px]">
              <Line />
              <Line w="w-3/4" />
              <Line />
              <Line />
            </span>
          </span>
        </span>
      )}

      {layout === "banner" && (
        <span className="flex h-full flex-col gap-[2px]">
          <span className={`block h-[8px] w-full ${MASS}`} />
          <Line />
          <Line />
          <Line w="w-4/5" />
          <Line />
        </span>
      )}

      {layout === "plain" && (
        <span className="flex h-full flex-col gap-[2px]">
          <span className={`block h-[3px] w-3/5 ${MASS}`} />
          <span className="block h-px w-full bg-gray-400" />
          <Line />
          <Line w="w-4/5" />
          <Line />
        </span>
      )}
    </span>
  );
}

export default function TemplateSelector({ selected, onChange }: Props) {
  const { radioProps } = useRovingRadio(IDS, selected, onChange);

  return (
    /* A two-up grid, not a scrolling row. The preview column is 604px at every
       desktop width, and four ~230px chips in a row meant Royal sat entirely
       off-screen behind an `overflow-x-auto` with no fade, no arrows and no
       wrap — a quarter of the templates undiscoverable unless you happened to
       drag sideways inside a column that looked static. Two rows of two fit the
       column at every width the builder has; at eight templates it is four rows
       of two, roughly 250px above the sheet, and it stays a grid. */
    <div role="radiogroup" aria-label="Document template" className="grid grid-cols-2 gap-2">
      {templates.map((t, i) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            {...radioProps(t.id, i)}
            className={`flex items-center gap-2 min-h-11 px-2 py-2 rounded-lg border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 ${
              isSelected
                ? "border-gray-800 bg-gray-50 shadow-sm ring-1 ring-gray-800"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <Wireframe layout={t.layout} />
            {/* Stacked rather than side by side, and the chip's horizontal
                padding steps down from 12px to 8px: both buy room for the
                wireframe so eight descriptions still fit two lines in a 604px
                column. The pair is 12px wide against the wireframe's 20px,
                which keeps the wireframe the dominant cue — the point of the
                change. */}
            <span className="flex flex-col gap-[2px] shrink-0" aria-hidden="true">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.primary }} />
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.colors.accent }} />
            </span>
            <span className="block min-w-0">
              <span className="block text-xs font-semibold text-gray-800">{t.name}</span>
              <span className="block text-[11px] text-gray-600 leading-tight">{t.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
