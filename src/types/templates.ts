export type TemplateName = "classic" | "elegant" | "modern" | "royal";

export interface TemplateOption {
  id: TemplateName;
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    bg: string;
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
    colors: { primary: "#065f46", accent: "#10b981", bg: "#ecfdf5" },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Navy with gold corner brackets",
    colors: { primary: "#1e3a5f", accent: "#d4a853", bg: "#f0f4f8" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Violet, rounded frame, pill facts",
    colors: { primary: "#6d28d9", accent: "#a78bfa", bg: "#f5f3ff" },
  },
  {
    id: "royal",
    name: "Royal",
    description: "Burgundy, doubled frame, star marks",
    colors: { primary: "#7f1d1d", accent: "#b91c1c", bg: "#fef2f2" },
  },
];
