import { describe, expect, it } from "vitest";
import { templates, TemplateLayout, TemplateName } from "@/types/templates";
import { TEMPLATES } from "@/components/preview/BiodataPreview";

/**
 * A template lives in two places that have to agree: `templates` is what the
 * chooser offers, and `TEMPLATES` is what the preview can actually render. A
 * template present in one and missing from the other is either an unreachable
 * component or a chip that silently falls back to Classic — and the fallback is
 * what makes the second case silent.
 *
 * This is a registration guard, not a rendering test. It never mounts a
 * component; the vitest environment is `node` and deliberately has no DOM.
 */
const LAYOUTS: TemplateLayout[] = ["stacked", "panel", "two-column", "banner", "plain"];

describe("template registry", () => {
  it("renders a component for every template the chooser offers", () => {
    for (const t of templates) {
      expect(TEMPLATES[t.id], `no component registered for "${t.id}"`).toBeTypeOf("function");
    }
  });

  it("offers every registered component in the chooser", () => {
    const offered = new Set<string>(templates.map((t) => t.id));
    for (const id of Object.keys(TEMPLATES) as TemplateName[]) {
      expect(offered.has(id), `"${id}" is registered but the chooser never offers it`).toBe(true);
    }
  });

  it("gives every template a layout the chooser knows how to draw", () => {
    for (const t of templates) {
      expect(LAYOUTS, `"${t.id}" has no drawable layout`).toContain(t.layout);
    }
  });

  it("gives every template a distinct id", () => {
    expect(new Set(templates.map((t) => t.id)).size).toBe(templates.length);
  });
});
