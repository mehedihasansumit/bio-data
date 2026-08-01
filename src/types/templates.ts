export type TemplateName =
  | "classic"
  | "elegant"
  | "modern"
  | "royal"
  | "panel";

/**
 * The shape of sheet a template produces, as a name the chooser can draw.
 *
 * Colour has stopped being the thing that tells these templates apart. Panel
 * teal is 47 from Classic emerald in RGB terms, Compact ochre 43 from Royal
 * oxblood, Banner indigo 41 from Elegant navy — none of which is
 * distinguishable in a 12px swatch. Layout is what actually differs, so the
 * chooser draws a wireframe of it.
 *
 * `stacked` covers the four originals: ornament row, centred title, name and
 * photo, then label/value rows under section headings. Adding a template means
 * picking one of these five names and nothing else — no per-template artwork,
 * no SVG asset to supply.
 */
export type TemplateLayout = "stacked" | "panel" | "two-column" | "banner" | "plain";

export interface TemplateOption {
  id: TemplateName;
  name: string;
  description: string;
  /** Which wireframe the chooser draws for this template. */
  layout: TemplateLayout;
  /**
   * The two swatches the chooser shows for this template. Not the template's
   * palette — each template component owns its own inks. A third `bg` value
   * used to sit here, described as reserved for tinted paper stocks; nothing
   * ever read it, and four unused hex values that look authoritative are worse
   * than none. Add it back with the feature that needs it.
   */
  colors: {
    primary: string;
    accent: string;
  };
}

/**
 * `description` is the only thing telling someone what they are choosing
 * before they choose it, so it describes the template that exists rather than
 * one that was planned. Elegant promised a "sidebar layout" and Modern
 * promised "color blocks"; neither has ever had either. Each line now names
 * the frame and the section treatment — the two things that actually differ.
 */
export const templates: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Green, double border, filled headings",
    layout: "stacked",
    colors: { primary: "#065f46", accent: "#10b981" },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Navy with gold corner brackets",
    layout: "stacked",
    colors: { primary: "#1e3a5f", accent: "#d4a853" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Violet, rounded frame, pill facts",
    layout: "stacked",
    colors: { primary: "#6d28d9", accent: "#a78bfa" },
  },
  {
    id: "royal",
    name: "Royal",
    description: "Burgundy, doubled frame, star marks",
    layout: "stacked",
    colors: { primary: "#7f1d1d", accent: "#b91c1c" },
  },
  {
    id: "panel",
    name: "Panel",
    description: "Teal side panel, sections beside",
    layout: "panel",
    colors: { primary: "#0f766e", accent: "#5eead4" },
  },
];
