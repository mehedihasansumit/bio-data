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

export const templates: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional green with decorative borders",
    colors: { primary: "#065f46", accent: "#10b981", bg: "#ecfdf5" },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Navy & gold with sidebar layout",
    colors: { primary: "#1e3a5f", accent: "#d4a853", bg: "#f0f4f8" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean minimal with color blocks",
    colors: { primary: "#6d28d9", accent: "#a78bfa", bg: "#f5f3ff" },
  },
  {
    id: "royal",
    name: "Royal",
    description: "Rich burgundy ornamental style",
    colors: { primary: "#7f1d1d", accent: "#b91c1c", bg: "#fef2f2" },
  },
];
