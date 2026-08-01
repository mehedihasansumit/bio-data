export type TemplateName = "classic" | "elegant" | "modern" | "royal";

export interface TemplateOption {
  id: TemplateName;
  name: string;
  description: string;
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
    colors: { primary: "#065f46", accent: "#10b981" },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Navy with gold corner brackets",
    colors: { primary: "#1e3a5f", accent: "#d4a853" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Violet, rounded frame, pill facts",
    colors: { primary: "#6d28d9", accent: "#a78bfa" },
  },
  {
    id: "royal",
    name: "Royal",
    description: "Burgundy, doubled frame, star marks",
    colors: { primary: "#7f1d1d", accent: "#b91c1c" },
  },
];
