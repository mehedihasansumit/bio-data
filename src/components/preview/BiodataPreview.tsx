"use client";

import { BiodataFormData } from "@/types/biodata";
import { TemplateName } from "@/types/templates";
import ClassicTemplate from "./ClassicTemplate";
import ElegantTemplate from "./ElegantTemplate";
import ModernTemplate from "./ModernTemplate";
import RoyalTemplate from "./RoyalTemplate";

interface Props {
  data: BiodataFormData;
  template: TemplateName;
}

const TEMPLATES: Record<
  TemplateName,
  (props: { data: BiodataFormData }) => React.ReactElement
> = {
  classic: ClassicTemplate,
  elegant: ElegantTemplate,
  modern: ModernTemplate,
  royal: RoyalTemplate,
};

export default function BiodataPreview({ data, template }: Props) {
  const Template = TEMPLATES[template] ?? ClassicTemplate;

  /* `lang` here is the *document's* language, not the interface's — the page
     around this element is in a different language from the biodata inside it.
     It earns its keep three times over: the browser applies Bengali line
     breaking, assistive tech reads the document in the right voice, and
     globals.css keys the no-letter-spacing rule off it, so no template can
     reintroduce tracking on Bengali headings. */
  return (
    <div id="biodata-preview" lang={data.meta.documentLanguage}>
      <Template data={data} />
    </div>
  );
}
