"use client";

import { BiodataFormData } from "@/types/biodata";
import { TemplateName } from "@/types/templates";
import { DocHeadingLevel } from "./headings";
import ClassicTemplate from "./ClassicTemplate";
import ElegantTemplate from "./ElegantTemplate";
import ModernTemplate from "./ModernTemplate";
import RoyalTemplate from "./RoyalTemplate";
import PanelTemplate from "./PanelTemplate";
import CompactTemplate from "./CompactTemplate";
import BannerTemplate from "./BannerTemplate";

interface Props {
  data: BiodataFormData;
  template: TemplateName;
  /**
   * Where this document sits in the host page's outline. Defaults to a
   * top-level region; a guide page nests its sample one level deeper.
   */
  headingLevel?: DocHeadingLevel;
}

export interface TemplateProps {
  data: BiodataFormData;
  headingLevel: DocHeadingLevel;
}

/**
 * Every template the preview can render, keyed by the id the chooser hands it.
 *
 * Exported so `templateRegistry.test.ts` can assert this map and the chooser's
 * `templates` list agree. The `?? ClassicTemplate` fallback below is what makes
 * a mismatch silent — a chip that renders someone else's document rather than
 * an error — so the agreement is worth a test.
 */
export const TEMPLATES: Record<TemplateName, (props: TemplateProps) => React.ReactElement> = {
  classic: ClassicTemplate,
  elegant: ElegantTemplate,
  modern: ModernTemplate,
  royal: RoyalTemplate,
  panel: PanelTemplate,
  compact: CompactTemplate,
  banner: BannerTemplate,
};

export default function BiodataPreview({ data, template, headingLevel = 2 }: Props) {
  const Template = TEMPLATES[template] ?? ClassicTemplate;

  /* `lang` here is the *document's* language, not the interface's — the page
     around this element is in a different language from the biodata inside it.
     It earns its keep three times over: the browser applies Bengali line
     breaking, assistive tech reads the document in the right voice, and
     globals.css keys the no-letter-spacing rule off it, so no template can
     reintroduce tracking on Bengali headings. */
  return (
    <div id="biodata-preview" lang={data.meta.documentLanguage}>
      <Template data={data} headingLevel={headingLevel} />
    </div>
  );
}
