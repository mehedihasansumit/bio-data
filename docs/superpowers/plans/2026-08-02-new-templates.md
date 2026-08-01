# Four New Document Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take the template set from four to eight by adding Panel, Compact, Banner and Plain — four genuinely different *shapes* of A4 sheet — and migrate all eight onto a shared print-safety kit.

**Architecture:** A new `preview/kit.tsx` holds the two things that must never drift between templates (`<Photo>`, `<Ornament>`) — semantics and print-safety only, never visual decisions. Each template keeps its own private `Rows`/`Section` and its entire composition, per The Four Voices Rule. `TemplateOption` gains a `layout` discriminator that `TemplateSelector` draws as a ~20×26px CSS wireframe, because the new inks sit too close to the old ones in RGB terms for a 12px swatch to distinguish them. A vitest guard asserts no template can be half-registered.

**Tech Stack:** Next.js 16.2.1, React 19.2.4, Tailwind CSS v4 (`@import "tailwindcss"`, no config file — arbitrary values like `w-[52mm]` are the idiom here), TypeScript 5, vitest 4 in a `node` environment (`include: ["src/**/*.test.ts"]` — **`.ts` only, not `.tsx`**).

Source of truth for this work: `docs/superpowers/specs/2026-08-01-new-templates-design.md`. The governing design document is `DESIGN.md` at the repo root; read its Named Rules before writing any template.

---

## Global Constraints

Every task's requirements implicitly include this section.

**Inherited by every template, changeable by none:**

- `w-[190mm]` width with `min-h-[277mm]` minimum height. Both figures are load-bearing: 190 = 210 − 2×10, 277 = 297 − 2×10, against `@page { size: A4; margin: 10mm }`.
- Outer wrapper is exactly `<div className="bg-white p-5 w-[190mm] mx-auto print:p-0">`. Same in all eight.
- Every field from `documentContent(data)`, in order. No template decides what is said. (The Single Content Source Rule, The Content Parity Rule.)
- `docHeadings(headingLevel)` supplies the `Title` / `Name` / `Section` tags. Never hard-code a heading tag. (The Borrowed Outline Rule.)
- `.sheet-frame` on any bordered frame, so `box-decoration-break: clone` closes it on every printed page.
- Vertical inset on the frame element itself, never only on an inner wrapper — only the frame's own padding is cloned onto each fragment.
- `break-inside-avoid` on every section and every row. (The Clean Break Rule.)
- No shadow inside the frame. A `box-shadow: 0 0 0 Npx` used as a *ring* is permitted and is existing practice; a blurred/offset shadow is not. (The Flat Paper Rule.)
- No `letter-spacing` on Bengali at any size — enforced centrally by `#biodata-preview[lang="bn"] *` in `globals.css`; do not fight it. (The Bengali-Is-Never-Tracked Rule.)
- Geist and Hind Siliguri only. No new font family. (The Single Family Rule.)
- Square corners. Modern's 8px radius is Modern's alone. (The Square Paper Rule.) Small radii on a *photo* are existing practice in all four current templates and are not the frame.
- No skill bars, rings, timelines or rating dots. Plain is closest to this line and must stay clerical.
- Document body rows are 11px. **Compact alone is exempt at 10px**, conditional on the Bengali legibility check recorded in the spec. Every other template stays at 11px. (The 11px Record Rule.)
- Section headings are 10px, uppercase, tracking 0.12–0.15em, in the template's ink.
- The label is coloured and the value is neutral (`text-gray-700`). (The Neutral Value Rule.) The one documented exception is Panel's reversed teal panel — see Task 3.
- One ornamental glyph per template, three of them, used twice (header and footer). **Plain carries none** — the One Glyph Rule sets a ceiling, not a floor.

**Exact inks (copy verbatim):**

| Template | Primary | Accent | Glyph | Escape |
|---|---|---|---|---|
| Panel | `#0f766e` | `#5eead4` | ❖ | `"❖"` |
| Compact | `#92400e` | `#d97706` | ✤ | `"✤"` |
| Banner | `#312e81` | `#818cf8` | ❈ | `"❈"` |
| Plain | `#111827` | `#9ca3af` | *none* | — |

**Measured contrast — do not re-derive, do not violate:**

| Pair | Ratio | Use |
|---|---|---|
| Panel teal on white / white on Panel teal | 5.47:1 | text ✓ |
| Compact ochre on white / white on ochre | 7.09:1 | text ✓ |
| Banner indigo on white / white on indigo | 11.42:1 | text ✓ |
| Plain ink on white | 17.74:1 | text ✓ |
| Panel accent `#5eead4` on teal | 3.74:1 | rules/ornament on the panel only — **never text** |
| Panel accent `#5eead4` on white | 1.48:1 | **unusable — never appears on white** |
| Banner accent `#818cf8` on indigo | 3.83:1 | rules/ornament on the banner only — **never text** |
| Compact accent `#d97706` on white | 3.20:1 | rules and the aria-hidden footer ornament — **never text** |
| Compact accent `#d97706` on ochre | 2.21:1 | too faint — the header ornament is white at 70% instead |
| Plain accent `#9ca3af` on white | 2.51:1 | the single head hairline — **never text** |

The governing pattern for the three filled-surface templates: **the accent lives on the filled surface, the primary lives on the paper.** Compact inverts it (its accent is stronger on white than on the band) and that asymmetry is deliberate.

**Verified label-column widths — use these exact pixel values:**

- Compact (10px rows): first label **104px**. (78px overflowed in the mockup — `ভাই-বোনের বিবরণ` collided with its own value.)
- Panel, Banner (11px rows): first label **120px**, matching Classic.
- Plain (11px rows): first label **130px**, which its wider measure affords.

The widest row label measured is English "Permanent Address" — 99px at 10px, 108px at 11px. English is wider than Bengali at every size measured, and Document Language is the user's choice, so a column has to hold the wider script.

**Out of scope — do not touch:**

- `src/lib/documentContent.ts`. No new fields, no reordering.
- Re-inking or re-laying-out Classic, Elegant, Modern or Royal. They migrate onto the kit; they do not change visually.
- Interface Language for the builder.

**Verify after every task:** `npm test` and `npx tsc --noEmit` and `npm run lint`. Commit only when all three are clean.

---

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `src/components/preview/kit.tsx` | new | `<Photo>` and `<Ornament>` — semantics + print-safety only |
| `src/types/templates.ts` | modify | `TemplateName` union → 8; new `TemplateLayout` type; `layout` on `TemplateOption`; four new entries |
| `src/components/preview/BiodataPreview.tsx` | modify | export `TEMPLATES`; register four new components |
| `src/components/preview/templateRegistry.test.ts` | new | guard: no half-registered template |
| `src/components/preview/PanelTemplate.tsx` | new | 52mm floated teal panel |
| `src/components/preview/CompactTemplate.tsx` | new | ochre band + two 90mm columns at 10px |
| `src/components/preview/BannerTemplate.tsx` | new | full-bleed indigo banner |
| `src/components/preview/PlainTemplate.tsx` | new | no frame, no ornament, 22mm margins |
| `src/components/preview/{Classic,Elegant,Modern,Royal}Template.tsx` | modify | migrate onto the kit, zero visual change |
| `src/components/ui/TemplateSelector.tsx` | modify | layout wireframes beside the swatches |
| `src/lib/structuredData.ts` | modify | `featureList` says "Four document templates" |
| `DESIGN.md` | modify | four new voices; Compact's 10px exemption; the accent-on-fill pattern; Panel's reversed-surface exception; chooser change |

---

## Task 1: The kit, and migrating the existing four onto it

The motivation is concrete and recent: the photo-clipping fix had to be applied in four separate files, `.sheet-frame` in five, and Classic's section heading had silently drifted to a `<div>` while the other three used `<h3>`. At eight templates every such fix doubles.

**Files:**
- Create: `src/components/preview/kit.tsx`
- Modify: `src/components/preview/ClassicTemplate.tsx`
- Modify: `src/components/preview/ElegantTemplate.tsx`
- Modify: `src/components/preview/ModernTemplate.tsx`
- Modify: `src/components/preview/RoyalTemplate.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `Photo({ src, name, className, style }: { src: string; name: string; className?: string; style?: React.CSSProperties }): React.ReactElement`
  - `Ornament({ glyph, className, style }: { glyph: string; className?: string; style?: React.CSSProperties }): React.ReactElement`

  Both are named exports from `@/components/preview/kit`. Tasks 3–6 use them.

- [ ] **Step 1: Write the kit**

Create `src/components/preview/kit.tsx`:

```tsx
"use client";

/**
 * The two things that must never drift between templates.
 *
 * The Four Voices Rule gives a template its own layout, its own row anatomy,
 * its own ink and its own section treatment. It does not give it its own
 * accessibility conventions or its own print behaviour — those are obligations
 * of the record, not decisions of the voice. This module holds exactly those,
 * following the precedent set by `preview/headings.ts`.
 *
 * Everything visual stays with the caller: sizing, rounding, ring colour and
 * placement arrive as `className`/`style`, so adopting the kit changes no
 * pixel in any template.
 */

interface PhotoProps {
  /** A data URL from PhotoUpload. */
  src: string;
  /** The candidate's name, for the alt text. May be empty. */
  name: string;
  /** Size, rounding and ring — the template's decision. */
  className?: string;
  /** For ring colours that need a literal hex, e.g. `boxShadow`. */
  style?: React.CSSProperties;
}

/**
 * The candidate's photograph.
 *
 * Owns three things that were previously copy-pasted into every template and
 * had to be fixed in every template:
 *
 *  - `.photo-frame`, which is the one selector the print stylesheet re-clips.
 *    Everything inside `#biodata-preview` gets `overflow: visible !important`
 *    in print so a multi-page document is not silently truncated; the photo is
 *    the single exception, because Chrome paints the whole image at its natural
 *    aspect scaled to the box height and relies on the crop. Without the class
 *    a 400×225 photo prints 142px wide inside an 80px frame, across the
 *    candidate's own name.
 *  - `object-fit: cover` inside a fixed portrait box.
 *  - The alt-text convention. A biodata photo is content, not decoration, so it
 *    is never `alt=""`.
 */
export function Photo({ src, name, className, style }: PhotoProps) {
  return (
    <div className={`photo-frame overflow-hidden shrink-0 ${className ?? ""}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name ? `Photograph of ${name}` : "Photograph"}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface OrnamentProps {
  /** One dingbat. Repeated three times — the One Glyph Rule. */
  glyph: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The three-glyph ornament row.
 *
 * `aria-hidden` is the load-bearing part: unhidden, a screen reader opens every
 * biodata with "snowflake snowflake snowflake" before reaching the title. The
 * three-fold repeat lives here too so a template cannot quietly print four.
 *
 * Plain passes no ornament at all and never renders this. The One Glyph Rule
 * is a ceiling on decoration, not a floor.
 */
export function Ornament({ glyph, className, style }: OrnamentProps) {
  return (
    <div aria-hidden="true" className={className} style={style}>
      {`${glyph} ${glyph} ${glyph}`}
    </div>
  );
}
```

- [ ] **Step 2: Check whether the eslint disable comment is needed**

Run: `npm run lint`

If eslint does **not** complain about `<img>` in this repo (the four existing templates use bare `<img>` with no disable comment, so it probably does not), delete the `eslint-disable-next-line` line from `kit.tsx` and re-run. Do not leave a disable comment that suppresses nothing.

- [ ] **Step 3: Migrate ClassicTemplate**

> **Trap — read before touching any glyph.** The existing templates write their ornaments as numeric entities (`&#10053;`), and **DESIGN.md's prose names the wrong characters for two of them**: it says "`❀` (U+273F) Elegant" and "`❁` (U+2740)" for Royal's header, but U+273F is `✿` and U+2740 is `❀`. The *code* is correct and the prose is off by one. Migrate from the entity in the code, never from DESIGN.md, or Elegant and Royal will silently change glyph. The authoritative mapping:
>
> | Template | Entity in code | Codepoint | Character |
> |---|---|---|---|
> | Classic (both) | `&#10053;` | U+2745 | `❅` |
> | Elegant (both) | `&#10047;` | U+273F | `✿` |
> | Modern (both) | `&#10043;` | U+273B | `✻` |
> | Royal header | `&#10048;` | U+2740 | `❀` |
> | Royal footer + section mark | `&#10022;` | U+2726 | `✦` |
>
> Fixing DESIGN.md's prose is Task 8's job, not this one.

In `src/components/preview/ClassicTemplate.tsx`, add the import:

```tsx
import { Ornament, Photo } from "./kit";
```

Replace the header ornament (currently the `div` with `&#10053; &#10053; &#10053;` and its two-line comment) with:

```tsx
<Ornament glyph={"❅"} className="text-emerald-600 text-[12px] leading-none mb-1" />
```

Replace the footer ornament with:

```tsx
<Ornament glyph={"❅"} className="text-emerald-600/40 text-[10px]" />
```

Replace the photo block:

```tsx
{personal.photo && (
  <Photo
    src={personal.photo}
    name={personal.fullName}
    className="w-[80px] h-[100px] rounded-md ml-3 ring-1 ring-emerald-800/20"
  />
)}
```

(`photo-frame`, `overflow-hidden` and `shrink-0` now come from `Photo`; everything else is unchanged, in the same order.)

- [ ] **Step 4: Migrate ElegantTemplate**

Add `import { Ornament, Photo } from "./kit";`.

Header ornament → `<Ornament glyph={"✿"} className="text-[12px] leading-none mb-1" style={{ color: GOLD }} />`

Footer ornament → `<Ornament glyph={"✿"} className="text-[10px]" style={{ color: `${GOLD}80` }} />`

Photo →

```tsx
{personal.photo && (
  <Photo
    src={personal.photo}
    name={personal.fullName}
    className="w-[80px] h-[100px] rounded-md"
    style={{ boxShadow: `0 0 0 2px ${GOLD}80` }}
  />
)}
```

Leave `CORNER_BRACKETS` and its comment exactly as they are.

- [ ] **Step 5: Migrate ModernTemplate**

Add `import { Ornament, Photo } from "./kit";`.

Header ornament → `<Ornament glyph={"✻"} className="text-violet-400 text-[12px] leading-none mb-1" />`

Footer ornament → `<Ornament glyph={"✻"} className="text-violet-300 text-[10px]" />`

Photo →

```tsx
{personal.photo && (
  <Photo
    src={personal.photo}
    name={personal.fullName}
    className="w-[75px] h-[90px] rounded-lg ring-2 ring-violet-200"
  />
)}
```

- [ ] **Step 6: Migrate RoyalTemplate**

Add `import { Ornament, Photo } from "./kit";`.

Header ornament → `<Ornament glyph={"❀"} className="text-[14px] leading-none mb-1" style={{ color: CRIMSON }} />`

Footer ornament → `<Ornament glyph={"✦"} className="text-[10px]" style={{ color: `${CRIMSON}66` }} />`

Royal's **section marker** is a single `✦`, not a three-glyph row. Leave it exactly as it is:

```tsx
<span aria-hidden="true" className="text-[10px]" style={{ color: CRIMSON }}>&#10022;</span>
```

Photo →

```tsx
{personal.photo && (
  <Photo
    src={personal.photo}
    name={personal.fullName}
    className="w-20 h-20 rounded-md"
    style={{ boxShadow: `0 0 0 1px ${OXBLOOD}4d` }}
  />
)}
```

- [ ] **Step 7: Verify nothing broke**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean. The existing suite does not render components, so it should be untouched.

- [ ] **Step 8: Verify visually that nothing changed**

Run: `npm run dev`, open `http://localhost:3000/builder`, click "Fill with an example", and step through all four templates. Then open `http://localhost:3000/patrir-biodata` and confirm the worked sample still renders.

Each template must be pixel-identical to before. If a photo shifted, a class was dropped in the `className` hand-off — compare against `git diff`.

- [ ] **Step 9: Commit**

```bash
git add src/components/preview/kit.tsx src/components/preview/ClassicTemplate.tsx src/components/preview/ElegantTemplate.tsx src/components/preview/ModernTemplate.tsx src/components/preview/RoyalTemplate.tsx
git commit -m "refactor: share Photo and Ornament across templates via preview/kit"
```

---

## Task 2: `layout` on TemplateOption, and a guard against half-registered templates

Adding a template touches three places — `templates`, `TEMPLATES`, and (from Task 7) the wireframe. At eight templates, forgetting one is a matter of time. This task makes that a test failure instead of a blank preview.

**Files:**
- Modify: `src/types/templates.ts`
- Modify: `src/components/preview/BiodataPreview.tsx:26-31`
- Test: `src/components/preview/templateRegistry.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type TemplateLayout = "stacked" | "panel" | "two-column" | "banner" | "plain"` — exported from `@/types/templates`.
  - `TemplateOption.layout: TemplateLayout` — a required field.
  - `TEMPLATES` — a **named export** from `@/components/preview/BiodataPreview`, typed `Record<TemplateName, (props: TemplateProps) => React.ReactElement>`.

  Tasks 3–6 add one entry to `templates` and one to `TEMPLATES`. Task 7 switches on `TemplateOption.layout`.

- [ ] **Step 1: Write the failing test**

Create `src/components/preview/templateRegistry.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { templates, TemplateLayout, TemplateName } from "@/types/templates";
import { TEMPLATES } from "@/components/preview/BiodataPreview";

/**
 * A template lives in two places that have to agree: `templates` is what the
 * chooser offers, and `TEMPLATES` is what the preview can actually render. A
 * template present in one and missing from the other is either an unreachable
 * component or a chip that falls back to Classic without saying so — and the
 * fallback is what makes the second case silent.
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
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run src/components/preview/templateRegistry.test.ts`
Expected: FAIL — `TEMPLATES` is not exported from `BiodataPreview`, and `TemplateLayout` / `layout` do not exist.

If instead it fails with a *runtime* error about `React is not defined` or a JSX transform, that is the real risk in this task: vitest is transforming `BiodataPreview.tsx` without the React plugin. It should not happen, because no JSX is evaluated at module scope — `TEMPLATES` is a map of function references and the JSX lives inside function bodies that this test never calls. If it does happen, do **not** add jsdom or a React plugin; instead set `esbuild: { jsx: "automatic" }` in `vitest.config.mts` and note why in a comment.

- [ ] **Step 3: Add `TemplateLayout` and `layout` to the four existing entries**

In `src/types/templates.ts`, above `TemplateOption`:

```ts
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
```

Add the field to the interface, immediately after `description`:

```ts
  /** Which wireframe the chooser draws for this template. */
  layout: TemplateLayout;
```

Add `layout: "stacked",` to each of the four existing entries, after `description`.

- [ ] **Step 4: Export `TEMPLATES`**

In `src/components/preview/BiodataPreview.tsx`, change line 26 from `const TEMPLATES` to:

```tsx
/**
 * Every template the preview can render, keyed by the id the chooser hands it.
 *
 * Exported so `templateRegistry.test.ts` can assert this map and the chooser's
 * `templates` list agree. The `?? ClassicTemplate` fallback below is what makes
 * a mismatch silent — a chip that renders someone else's document rather than
 * an error — so the agreement is worth a test.
 */
export const TEMPLATES: Record<TemplateName, (props: TemplateProps) => React.ReactElement> = {
```

- [ ] **Step 5: Run the test and watch it pass**

Run: `npx vitest run src/components/preview/templateRegistry.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 6: Full verification**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 7: Commit**

```bash
git add src/types/templates.ts src/components/preview/BiodataPreview.tsx src/components/preview/templateRegistry.test.ts
git commit -m "feat: add layout to TemplateOption and guard template registration"
```

---

## Task 3: Panel

A 52mm teal panel floated left holding the photo, name, headline facts and the contact section. The remaining sections wrap beside it, then run full width below it.

**Why a float and not a flex column:** the panel ends with its content, and page two runs full width. An empty 52mm colour band down every page reads as broken, and now that `print-color-adjust: exact` forces fills to print, it would lay a strip of ink down every sheet at a print shop. A float gives that for free. This was confirmed in a two-page PDF before the spec was written — do not "improve" it into a grid.

**Files:**
- Create: `src/components/preview/PanelTemplate.tsx`
- Modify: `src/types/templates.ts`
- Modify: `src/components/preview/BiodataPreview.tsx`

**Interfaces:**
- Consumes: `Photo`, `Ornament` from `./kit` (Task 1); `TemplateLayout` and the `layout` field (Task 2); `TEMPLATES` (Task 2).
- Produces: `PanelTemplate` as the default export of `PanelTemplate.tsx`, signature `(props: TemplateProps) => React.ReactElement`.

**Two decisions worth stating before the code:**

1. **Panel flattens paired rows into single lines.** The wrap zone beside the panel is ~472px against the full width's ~684px. A four-cell paired row (120/125/100/…) leaves the second value ~127px there and ~236px below the panel, so the same row type would look like two different rows depending on which side of the float boundary it landed on. One label/value line at 120px is uniform either side. Parity is untouched — both halves still print.

2. **Inside the teal panel, both label and value are white.** The Neutral Value Rule wants a coloured label and an `ink-body` value, and `#374151` on `#0f766e` is unreadable. On this one reversed surface the two are separated by weight and size instead. The rule's substance — nothing about a candidate is tinted, highlighted or emphasised over anything else — holds exactly. Task 8 writes this into DESIGN.md.

- [ ] **Step 1: Write the component**

Create `src/components/preview/PanelTemplate.tsx`:

```tsx
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
 * `#5eead4` is 3.74:1 on teal — fine for a hairline or a photo ring on the
 * panel — and 1.48:1 on white, where it is invisible. So it never appears
 * outside the coloured band. Everything on white is teal, at 5.47:1 for text
 * and at reduced alpha for rules.
 */
const RULE = `${TEAL}33`;

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
  const flat = rows.flatMap((row) =>
    row.kind === "single"
      ? [{ label: row.label, value: row.value }]
      : [
          { label: row.l1, value: row.v1 },
          { label: row.l2, value: row.v2 },
        ],
  );
  return (
    <>
      {flat.map((row, i) => (
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
  const flat = rows.flatMap((row) =>
    row.kind === "single"
      ? [{ label: row.label, value: row.value }]
      : [
          { label: row.l1, value: row.v1 },
          { label: row.l2, value: row.v2 },
        ],
  );
  return (
    <>
      {flat.map((row, i) => (
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
            without a clearfix and without letting it escape past the footer. */}
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

          {body.map((section) => (
            <div key={section.id} className="mt-3 first:mt-0 break-inside-avoid">
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
```

- [ ] **Step 2: Register it**

In `src/types/templates.ts`, append to `templates`:

```ts
  {
    id: "panel",
    name: "Panel",
    description: "Teal side panel, sections beside",
    layout: "panel",
    colors: { primary: "#0f766e", accent: "#5eead4" },
  },
```

Add `"panel"` to the `TemplateName` union.

In `src/components/preview/BiodataPreview.tsx`, add `import PanelTemplate from "./PanelTemplate";` and `panel: PanelTemplate,` to `TEMPLATES`.

- [ ] **Step 3: Run the registration guard**

Run: `npx vitest run src/components/preview/templateRegistry.test.ts`
Expected: PASS. (It would fail if either half of Step 2 were missed — that is the point of Task 2.)

- [ ] **Step 4: Verify types, lint and the whole suite**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Print-verify, two-page and one-page, with a photo**

Run `npm run dev`, open `/builder`, "Fill with an example", upload a **deliberately wide photo** (e.g. 400×225 — this is the case that used to spill across the name), select Panel, then Ctrl/Cmd-P and inspect the PDF:

- The teal panel appears on page one only. Page two is full width with no orphaned colour band.
- The teal frame closes on all four sides of **both** pages.
- The photo is clipped to its 34×42mm box; it does not spill.
- No row touches the frame border on either page.
- The contact section is inside the panel and appears nowhere else.
- Switch Document Language to বাংলা and confirm no Bengali heading is letter-spaced.

- [ ] **Step 6: Commit**

```bash
git add src/components/preview/PanelTemplate.tsx src/types/templates.ts src/components/preview/BiodataPreview.tsx
git commit -m "feat: add the Panel template"
```

---

## Task 4: Compact

An ochre header band, then every section flowing through two 90mm columns at 10px. This is the one that answers a complaint the current set cannot: a filled-in biodata runs past one page.

**Compact is the only template exempt from The 11px Record Rule.** The exemption is conditional on a legibility check that has already been done: at 4×, মাত্রা stays continuous and `ক্ত`, `ক্ষ`, `শ্ব`, `স্থ্য`, `প্র` all form correctly at 10px in Hind Siliguri, tested on `স্নাতকোত্তর`, `রক্তের গ্রুপ`, `ব্যক্তিগত` and `বিশ্ববিদ্যালয়` — the same words that settled 11px originally. Do not extend the exemption to any other template.

**Files:**
- Create: `src/components/preview/CompactTemplate.tsx`
- Modify: `src/types/templates.ts`
- Modify: `src/components/preview/BiodataPreview.tsx`

**Interfaces:**
- Consumes: `Photo`, `Ornament` from `./kit`; `layout` (Task 2); `TEMPLATES` (Task 2).
- Produces: `CompactTemplate` as the default export of `CompactTemplate.tsx`.

**Column arithmetic — do not round it away.** 190mm sheet, frame padding `p-[3mm]` a side, a 1px border a side, `column-gap: 4mm`: (190 − 6 − ~0.5 − 4) / 2 ≈ **89.7mm** per column. That is the spec's 90mm. Larger frame padding does not reach it; this is why the padding is 3mm rather than the 12px the other templates use in print.

- [ ] **Step 1: Write the component**

Create `src/components/preview/CompactTemplate.tsx`:

```tsx
"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Ornament, Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

const OCHRE = "#92400e";
const AMBER = "#d97706";

/**
 * Compact's accent goes the other way from Panel's and Banner's.
 *
 * `#d97706` is 3.20:1 on white and only 2.21:1 on the ochre band, so it lives
 * on the paper — section rules and the footer ornament — and the band's own
 * ornament is white at 70% instead. It is never text anywhere: ochre carries
 * every label, at 7.09:1.
 */

/**
 * One label, one value, always — a 90mm column has no room for four cells.
 *
 * Both halves of a `pair` still print, as consecutive lines. Content Parity is
 * about every field appearing, not about how many cells a line has.
 */
function Rows({ rows }: { rows: DocRow[] }) {
  const flat = rows.flatMap((row) =>
    row.kind === "single"
      ? [{ label: row.label, value: row.value }]
      : [
          { label: row.l1, value: row.v1 },
          { label: row.l2, value: row.v2 },
        ],
  );
  return (
    <>
      {flat.map((row, i) => (
        /* 10px, and only here. The 11px Record Rule holds everywhere else; this
           exemption is Compact's alone and was bought with a 4× legibility
           check on Bengali conjuncts in Hind Siliguri. */
        <div key={i} className="flex py-[1.5px] text-[10px] leading-snug break-inside-avoid">
          <span className="w-[104px] shrink-0 font-semibold" style={{ color: OCHRE }}>
            {row.label}
          </span>
          <span className="text-gray-700">{row.value}</span>
        </div>
      ))}
    </>
  );
}

export default function CompactTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      {/* 3mm frame padding, not the usual 12px: it is what leaves two true 90mm
          columns inside a 190mm sheet once the 4mm gutter is taken. The inset
          sits on the frame itself so `box-decoration-break: clone` repeats it
          on every fragment. */}
      <div
        className="sheet-frame border p-[3mm] min-h-[277mm] flex flex-col"
        style={{ borderColor: OCHRE }}
      >
        <header
          className="flex items-center gap-3 px-3 py-2 mb-3 break-inside-avoid"
          style={{ backgroundColor: OCHRE }}
        >
          {personal.photo && (
            <Photo
              src={personal.photo}
              name={personal.fullName}
              className="w-[54px] h-[68px]"
              style={{ boxShadow: `0 0 0 1px #ffffff66` }}
            />
          )}
          <div className="flex-1 min-w-0">
            <Ornament
              glyph={"✤"}
              className="text-[10px] leading-none mb-[2px] text-white/70"
            />
            <Title className="text-[16px] font-bold uppercase tracking-[.18em] text-white">
              {documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}
            </Title>
            {/* 15px, the ramp's document-name step, even in the dense
                template — the band has ~600px and the four px it saves are not
                worth an undocumented deviation. The 16px Title above is a
                deliberate tightening, with Royal's 16px/0.2em as precedent. */}
            {personal.fullName && (
              <Name className="text-[15px] font-bold text-white mt-[2px]">
                {personal.fullName}
              </Name>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-0 mt-[2px] text-[9px] text-white">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </header>

        {/* Two columns, `break-inside-avoid` on every section, default
            `column-fill: balance`. Prototyped in a real print PDF: no section
            split across a column boundary, the frame closed on all sides, and a
            document with three times the real section count still fit one
            sheet. */}
        <div className="flex-1 [column-count:2] [column-gap:4mm]">
          {sections.map((section) => (
            <div key={section.id} className="mb-3 break-inside-avoid">
              <Section
                className="text-[10px] font-bold uppercase tracking-[.14em] pb-[2px] mb-1 border-b"
                style={{ color: OCHRE, borderColor: AMBER }}
              >
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Ornament glyph={"✤"} className="text-[10px]" style={{ color: `${AMBER}99` }} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Register it**

In `src/types/templates.ts`, add `"compact"` to `TemplateName` and append:

```ts
  {
    id: "compact",
    name: "Compact",
    description: "Ochre, two columns, one page",
    layout: "two-column",
    colors: { primary: "#92400e", accent: "#d97706" },
  },
```

In `BiodataPreview.tsx`, add `import CompactTemplate from "./CompactTemplate";` and `compact: CompactTemplate,`.

- [ ] **Step 3: Run the registration guard**

Run: `npx vitest run src/components/preview/templateRegistry.test.ts`
Expected: PASS.

- [ ] **Step 4: Verify types, lint and the whole suite**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Print-verify, one-page and overflowed, with a photo**

Run `npm run dev`, `/builder`, "Fill with an example", upload a 400×225 photo, select Compact, print:

- The full sample biodata fits **one** A4 sheet. This is the template's reason for existing; if it does not fit, say so rather than shrinking type below 10px.
- The two columns are visibly equal and roughly 90mm each.
- No section is split across the column boundary.
- The ochre frame closes on all four sides.
- The photo is clipped to 54×68px.
- Now force a second page: add several long siblings and a long Present Address, print again, and confirm the frame closes on page two and no section straddles a column or page boundary.
- Switch to বাংলা and read the 10px Bengali rows on a printed sheet or at 400% zoom: মাত্রা continuous, conjuncts formed. If they are not, the exemption does not hold and Compact goes to 11px — report that rather than shipping it.

- [ ] **Step 6: Commit**

```bash
git add src/components/preview/CompactTemplate.tsx src/types/templates.ts src/components/preview/BiodataPreview.tsx
git commit -m "feat: add the Compact template"
```

---

## Task 5: Banner

A full-bleed indigo header carrying photo, title, name and facts, with clerical rows below.

**Banner has no frame**, so it has no frame inset. The `@page { margin: 10mm }` is its inset, and page two starting at the page margin is the correct behaviour for an unframed sheet — that is why there is no `.sheet-frame` here and no vertical padding on the outer box. The banner is full-bleed within the page box: it spans the whole 190mm live area, edge to edge. It appears on page one only; a banner repeated on every page would lay indigo down every sheet at a print shop, the same argument that makes Panel a float.

**Files:**
- Create: `src/components/preview/BannerTemplate.tsx`
- Modify: `src/types/templates.ts`
- Modify: `src/components/preview/BiodataPreview.tsx`

**Interfaces:**
- Consumes: `Photo`, `Ornament` from `./kit`; `layout` (Task 2); `TEMPLATES` (Task 2).
- Produces: `BannerTemplate` as the default export of `BannerTemplate.tsx`.

Banner is the one new template that **keeps paired rows** — it has the full 684px, so 120 / 130 / 110 / rest fits comfortably, which is Classic's anatomy at Classic's widths.

- [ ] **Step 1: Write the component**

Create `src/components/preview/BannerTemplate.tsx`:

```tsx
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
          is this template's inset, so page two begins at the page edge, which
          is the right behaviour for an unframed sheet. */}
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
```

- [ ] **Step 2: Register it**

In `src/types/templates.ts`, add `"banner"` to `TemplateName` and append:

```ts
  {
    id: "banner",
    name: "Banner",
    description: "Indigo banner, clerical rows",
    layout: "banner",
    colors: { primary: "#312e81", accent: "#818cf8" },
  },
```

In `BiodataPreview.tsx`, add `import BannerTemplate from "./BannerTemplate";` and `banner: BannerTemplate,`.

- [ ] **Step 3: Run the registration guard**

Run: `npx vitest run src/components/preview/templateRegistry.test.ts`
Expected: PASS.

- [ ] **Step 4: Verify types, lint and the whole suite**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Print-verify, two-page and one-page, with a photo**

Run `npm run dev`, `/builder`, "Fill with an example", upload a 400×225 photo, select Banner, print:

- The indigo band spans the full width of the page box with no white gutter at left or right — it must reach both edges of the 190mm live area.
- The band appears on page one only.
- The band is never split across a page break.
- The photo is clipped to 80×100px inside the band.
- Page two's rows start at the page margin with nothing overlapping.
- Uncheck "Background graphics" in the print dialog and confirm the band still prints — `print-color-adjust: exact` on `#biodata-preview` covers it. If the band vanishes, the fill is outside `#biodata-preview` and something is wrong.
- Switch to বাংলা and confirm no Bengali heading is letter-spaced.

- [ ] **Step 6: Commit**

```bash
git add src/components/preview/BannerTemplate.tsx src/types/templates.ts src/components/preview/BiodataPreview.tsx
git commit -m "feat: add the Banner template"
```

---

## Task 6: Plain

No frame, no ornament. 22mm margins, one rule under the head, hierarchy from whitespace alone.

Plain carrying no glyph is the point. The One Glyph Rule sets a ceiling on ornament, not a floor, and "no ornament at all" is the whole of Plain's identity. Plain is also the template closest to the résumé line — no skill bars, no rings, no timelines, no rating dots. It stays clerical.

**Files:**
- Create: `src/components/preview/PlainTemplate.tsx`
- Modify: `src/types/templates.ts`
- Modify: `src/components/preview/BiodataPreview.tsx`

**Interfaces:**
- Consumes: `Photo` from `./kit` (not `Ornament` — Plain has no glyph); `layout` (Task 2); `TEMPLATES` (Task 2).
- Produces: `PlainTemplate` as the default export of `PlainTemplate.tsx`.

**`#9ca3af` is 2.51:1 on white and therefore never carries text.** Its one job in this document is the single hairline under the head. Section headings and row labels are `#111827` at 17.74:1; hierarchy comes from size, tracking, weight and space, which is Plain's entire argument.

- [ ] **Step 1: Write the component**

Create `src/components/preview/PlainTemplate.tsx`:

```tsx
"use client";

import { documentContent, headlineFacts, DocRow } from "@/lib/documentContent";
import { documentTitle } from "@/lib/documentStrings";
import { docHeadings } from "./headings";
import { Photo } from "./kit";
import type { TemplateProps } from "./BiodataPreview";

const INK = "#111827";
const HAIRLINE = "#9ca3af";

/**
 * The wider measure buys a 130px label column — the widest in the set. The
 * widest label anyone can produce is "Permanent Address" at 108px at 11px, so
 * this clears it with room for a longer translation later.
 */
function Rows({ rows }: { rows: DocRow[] }) {
  return (
    <>
      {rows.map((row, i) =>
        row.kind === "single" ? (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[130px] shrink-0 font-semibold" style={{ color: INK }}>
              {row.label}
            </span>
            <span className="text-gray-700">{row.value}</span>
          </div>
        ) : (
          <div key={i} className="flex py-[2px] text-[11px] leading-snug break-inside-avoid">
            <span className="w-[130px] shrink-0 font-semibold" style={{ color: INK }}>
              {row.l1}
            </span>
            <span className="w-[140px] shrink-0 text-gray-700">{row.v1}</span>
            {row.v2 && (
              <>
                <span className="w-[110px] shrink-0 font-semibold" style={{ color: INK }}>
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

export default function PlainTemplate({ data, headingLevel }: TemplateProps) {
  const { personal } = data;
  const sections = documentContent(data);
  const { Title, Name, Section } = docHeadings(headingLevel);

  return (
    <div className="bg-white p-5 w-[190mm] mx-auto print:p-0">
      {/* `.sheet-frame` here is for the padding, not for a border — there is no
          border. `box-decoration-break: clone` repeats the 22mm inset on every
          fragment, so page two keeps the margin instead of dropping to the 10mm
          `@page` edge. */}
      <div className="sheet-frame p-[22mm] min-h-[277mm] flex flex-col">
        {/* The one rule in the document. Everything below it is separated by
            space alone. */}
        <header
          className="flex items-start justify-between gap-6 pb-4 mb-6 border-b break-inside-avoid"
          style={{ borderColor: HAIRLINE }}
        >
          <div className="min-w-0">
            <Title
              className="text-[18px] font-bold uppercase tracking-[.15em]"
              style={{ color: INK }}
            >
              {documentTitle(data.meta.candidateKind, data.meta.documentLanguage)}
            </Title>
            {personal.fullName && (
              <Name className="text-[15px] font-bold mt-2" style={{ color: INK }}>
                {personal.fullName}
              </Name>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-[10px] text-gray-600">
              {headlineFacts(data).map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
          {personal.photo && (
            <Photo src={personal.photo} name={personal.fullName} className="w-[80px] h-[100px]" />
          )}
        </header>

        <div className="flex-1">
          {sections.map((section) => (
            <div key={section.id} className="mb-5 last:mb-0 break-inside-avoid">
              <Section
                className="text-[10px] font-bold uppercase tracking-[.15em] mb-2"
                style={{ color: INK }}
              >
                {section.title}
              </Section>
              <Rows rows={section.rows} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Register it**

In `src/types/templates.ts`, add `"plain"` to `TemplateName` and append:

```ts
  {
    id: "plain",
    name: "Plain",
    description: "No frame, no ornament",
    layout: "plain",
    colors: { primary: "#111827", accent: "#9ca3af" },
  },
```

In `BiodataPreview.tsx`, add `import PlainTemplate from "./PlainTemplate";` and `plain: PlainTemplate,`.

- [ ] **Step 3: Run the registration guard**

Run: `npx vitest run src/components/preview/templateRegistry.test.ts`
Expected: PASS. All eight templates registered, all with a layout.

- [ ] **Step 4: Verify types, lint and the whole suite**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Print-verify, two-page and one-page, with a photo**

Run `npm run dev`, `/builder`, "Fill with an example", upload a 400×225 photo, select Plain, print:

- 22mm of white on all four sides of page one, and **22mm on page two as well** — this is what `.sheet-frame` is doing here. If page two drops to 10mm, `box-decoration-break: clone` is not applying and the class is missing or the padding moved to an inner wrapper.
- Exactly one rule in the whole document, under the head.
- No glyph anywhere.
- The photo is clipped to 80×100px.
- No section heading is separated from its rows across the page break.
- Switch to বাংলা and confirm no Bengali heading is letter-spaced.

- [ ] **Step 6: Commit**

```bash
git add src/components/preview/PlainTemplate.tsx src/types/templates.ts src/components/preview/BiodataPreview.tsx
git commit -m "feat: add the Plain template"
```

---

## Task 7: A layout-first template chooser

Eight chips in the existing two-up grid is four rows, roughly 250px above the sheet. **That stays a grid.** It is not going back to a horizontal scroller — that hid a quarter of the templates and was fixed for that reason.

Each chip gains a ~20×26px CSS wireframe of the template's actual shape, drawn from `layout` with plain divs. No per-template artwork, no SVG assets, nothing a new template has to remember to supply beyond picking one of five names. The two colour swatches stay as a secondary cue.

**Files:**
- Modify: `src/components/ui/TemplateSelector.tsx`

**Interfaces:**
- Consumes: `TemplateLayout` and `TemplateOption.layout` from `@/types/templates` (Task 2).
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Rewrite TemplateSelector**

Replace `src/components/ui/TemplateSelector.tsx` in full:

```tsx
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
```

Note two deliberate changes beyond adding the wireframe: `px-3` drops to `px-2` and the two swatches stack vertically instead of sitting side by side. Both buy horizontal room for the wireframe so the descriptions do not wrap to three lines in a 604px column. The stacked pair is also 12px wide against the wireframe's 20px, which keeps the wireframe the dominant cue — which is the point of the change.

- [ ] **Step 2: Verify types, lint and the suite**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 3: Verify in the browser**

Run `npm run dev`, open `/builder`:

- Eight chips in a two-up grid, four rows. No horizontal scrolling anywhere.
- Each wireframe visibly matches its template: Panel shows a filled left column, Compact a band over two text columns, Banner a thick top band, Plain a frameless head with one rule, and the four originals a centred title bar over full-width lines.
- Descriptions do not wrap past two lines.
- Tab into the group once: only the selected chip is in the tab order. Arrow keys move focus **and** selection through all eight and wrap at both ends. Home and End jump to Classic and Plain.
- Selecting each chip switches the sheet to the right document.
- Narrow the window below 1024px, switch to the Preview pane, and confirm the grid still fits.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/TemplateSelector.tsx
git commit -m "feat: draw each template's layout in the chooser"
```

---

## Task 8: Documentation and the eight-template claim

**Files:**
- Modify: `DESIGN.md`
- Modify: `src/lib/structuredData.ts:30`

**Interfaces:**
- Consumes: everything above.
- Produces: nothing.

- [ ] **Step 1: Fix the structured-data claim**

In `src/lib/structuredData.ts`, change the `featureList` entry:

```ts
    "Eight document templates",
```

- [ ] **Step 2: Add the four new inks to the DESIGN.md front-matter**

In the `colors:` block, after the Royal group, add:

```yaml
  # Document inks — Panel
  panel-primary: "#0f766e"
  panel-accent: "#5eead4"
  # Document inks — Compact
  compact-primary: "#92400e"
  compact-accent: "#d97706"
  # Document inks — Banner
  banner-primary: "#312e81"
  banner-accent: "#818cf8"
  # Document inks — Plain
  plain-primary: "#111827"
  plain-accent: "#9ca3af"
```

- [ ] **Step 3: Describe the four new voices**

In the **Colors → Secondary** section, after the Royal bullet, add:

```markdown
- **Panel — Register Teal** (`panel-primary` / `panel-accent`): a 52mm teal panel floated left carrying the photo, name, headline facts and the contact section; the remaining sections wrap beside it and then run full width beneath it.
- **Compact — Ledger Ochre** (`compact-primary` / `compact-accent`): a filled header band over two 90mm columns at 10px. The only template that fits a full biodata on one sheet.
- **Banner — Ministry Indigo** (`banner-primary` / `banner-accent`): a full-bleed indigo header carrying the photo, title, name and facts, with clerical rows below. No frame.
- **Plain — Unadorned Ink** (`plain-primary` / `plain-accent`): no frame, no ornament, 22mm margins and one hairline under the head. Hierarchy from whitespace alone.
```

Then add this paragraph immediately after the existing "Each template declares a `primary` / `accent` pair…" paragraph:

```markdown
**The accent lives on the filled surface.** Three of the four new templates put a large area of their primary ink on the page, and their accent is chosen to work *on that fill*, not on paper — Panel's `#5eead4` is 3.74:1 on teal and 1.48:1 on white, Banner's `#818cf8` is 3.83:1 on indigo and 2.98:1 on white. So each accent stays inside its band (photo rings, panel hairlines, the header ornament) and everything on white is the primary, at full strength for text and at reduced alpha for rules. Compact inverts it deliberately: `#d97706` is 3.20:1 on white and only 2.21:1 on its own ochre band, so its accent lives on the paper and the band's ornament is white at 70% instead. In no template is an accent ever text.
```

- [ ] **Step 4: Record Compact's 10px exemption**

In **Typography → Named Rules**, replace the parenthetical at the end of **The 11px Record Rule** so the rule reads:

```markdown
**The 11px Record Rule.** Document body text is 11px. Not 10, not 12. It is the smallest size that holds the row rhythm and stays comfortably readable on a printed sheet a stranger will study closely, and every template is tuned around it — in both scripts, per the Bengali verification above. Changing it re-paginates everything. (It once also served a one-page budget; that constraint is gone, see The Clean Break Rule. The size survives on legibility alone.)

**Compact is the single exemption, at 10px.** Two 90mm columns is the only composition in the set that fits a full biodata on one sheet, and it does not fit at 11px. The exemption was bought, not assumed: at 4× magnification মাত্রা stays continuous and `ক্ত`, `ক্ষ`, `শ্ব`, `স্থ্য` and `প্র` all form correctly at 10px in Hind Siliguri, tested on `স্নাতকোত্তর`, `রক্তের গ্রুপ`, `ব্যক্তিগত` and `বিশ্ববিদ্যালয়` — the same words that settled 11px originally. This is Compact's own rule and not a general relaxation: every other template stays at 11px, and a ninth template does not inherit it.
```

- [ ] **Step 5: Record the label-column widths**

In **Layout**, replace the sentence "Row label columns are fixed-width (115–120px for the first label, 100–110px for the second, 125–130px for the first value)…" with:

```markdown
Row label columns are fixed-width so that every row aligns into columns down the page regardless of content length. The first label is 115–130px, the second 100–110px, the first value 125–140px — the exact figures vary with the measure each template gives itself: Compact 104px at 10px in a 90mm column, Classic / Panel / Banner 120px, Plain 130px on its 146mm measure. The widths were measured rather than estimated, and against English rather than Bengali: Document Language is the user's choice, so a column must hold the wider of the two scripts, and English is wider at every size measured — "Permanent Address" is 99px at 10px and 108px at 11px, against 81px and 89px for `পারিবারিক মূল্যবোধ`.
```

- [ ] **Step 6: Record Panel's reversed surface**

In **Colors → Named Rules**, extend **The Neutral Value Rule**:

```markdown
**The Neutral Value Rule.** In every document row, the label is colored and the value is neutral (`ink-body`). Color marks the field name, never the person's data. Nothing about a candidate is ever highlighted, tinted, or emphasized over anything else.

*On a reversed surface the tint comes off the label instead.* Panel's contact rows sit on solid teal, where `ink-body` grey is unreadable, so both label and value are white and are separated by weight and size. The rule's substance is untouched — no value is tinted, and nothing about the candidate is emphasized over anything else. This applies to filled panels only; on paper the rule is literal.
```

- [ ] **Step 7: Update the Four Voices Rule and the counts**

**The Four Voices Rule** is now eight voices. In **Components → Named Rules**, rename and rewrite the opening:

```markdown
**The Four Voices Rule.** Each template is an independent design, not a recolor. It may reinvent its layout completely — sidebar, split columns, banner header, repositioned photo — and it owns its own row and section primitives. What it inherits and may not change: the 190mm frame with its 277mm floor, the full field vocabulary and its order of meaning, the 11px type floor (Compact excepted, above), the heading levels it is handed, and the flat-paper rule. The name is kept for the rule it names, not the count: there are eight templates now, and the first four proved the point badly — all four were a single column with a different ink. Panel floats a coloured sidebar, Compact flows two columns, Banner runs a full-bleed header, and Plain removes the frame entirely. A ninth voice should differ in shape, not in hue.
```

Then sweep the document for stale counts. Update at minimum:

- Overview, "The one place the system permits character… where four templates each speak in their own ink — emerald, navy and gold, violet, burgundy" → name all eight and their inks.
- Colors intro, "four self-contained document inks" → "eight".
- The Document Row, "Two variants, shared by all four templates" → "shared by most templates; Panel and Compact flatten a paired row into two single lines, because neither a 52mm wrap zone nor a 90mm column has room for four cells."
- The Document Section, "Each template renders the heading differently — Classic fills a solid band, …" → add the four new treatments.
- The Borrowed Outline Rule, "put a second `h1` on all four prerendered guide pages".
- Shapes → the document bullet list: add Panel, Compact, Banner and Plain, and note that Plain has no frame at all.
- Ornament paragraph: add `❖` (U+2756) Panel, `✤` (U+2724) Compact, `❈` (U+2748) Banner, and state that Plain carries none. **Also fix the two existing pairs that are wrong**: the paragraph currently reads "`❀` (U+273F) Elegant" and "`❁` (U+2740) in the header" for Royal. U+273F is `✿` and U+2740 is `❀` — the codepoints match the shipped code and the characters do not. Correct the characters, not the codepoints.
- **The One Glyph Rule**: append "*Plain carries none.* The rule is a ceiling on ornament, not a floor, and 'no ornament at all' is the whole of Plain's identity."
- Chips: "a horizontally scrolling row of bordered white tiles" is already wrong (it is a grid) — fix it, and describe the wireframe.

- [ ] **Step 8: Record the kit**

At the end of **Components → The Document Row**, replace the closing note with:

```markdown
Note that `Row`, `TwoCol`, and `Section` are **redeclared privately inside each template file**, not imported from a shared module. That is deliberate under the eight-voices doctrine below: a template that wants a sidebar, a two-column body, or a different row anatomy changes its own copies and touches nothing else.

What *is* shared is `preview/kit.tsx`, holding exactly two components: `<Photo>`, which owns `.photo-frame`, `object-fit: cover` and the alt-text convention, and `<Ornament>`, which owns `aria-hidden` and the three-glyph repeat. These are the record's obligations rather than a voice's decisions, and the case for sharing them is concrete: in one session the photo-clipping fix had to be applied in four separate files, `.sheet-frame` in five, and Classic's section heading had silently drifted to a `<div>` while the other three used `<h3>`. At eight templates every such fix doubles. Sizing, rounding, ring colour and placement still arrive from the template — the kit carries no visual decision, exactly as `preview/headings.ts` carries no visual decision.
```

- [ ] **Step 9: Record the chooser change**

In **Components → Chips**, after the "Template chip" bullet, add:

```markdown
- **Layout wireframe:** a ~20×26px drawing of the template's actual shape, left of the swatches and the name. Drawn from `TemplateOption.layout` — one of `stacked`, `panel`, `two-column`, `banner`, `plain` — with plain divs. No per-template artwork and no SVG assets; a new template picks one of the five names and nothing else.

**The Show What Differs Rule.** The chooser leads with layout because layout is what differs. The eight inks now sit close together in RGB terms — Panel teal is 47 from Classic emerald, Compact ochre 43 from Royal oxblood, Banner indigo 41 from Elegant navy — and none of those distances is visible in a 12px swatch. The swatch pair stays as a secondary cue. Eight chips is four rows of two in the existing grid, and it stays a grid: the horizontal scroller it replaced hid a quarter of the templates behind an `overflow-x-auto` with no fade, no arrows and no wrap.
```

- [ ] **Step 10: Verify**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: all clean.

Then re-read the changed DESIGN.md sections against the eight components as built. Every ink, glyph, label width and layout claim in the document must match what is actually in the code — the point of this file is that it is true.

- [ ] **Step 11: Commit**

```bash
git add DESIGN.md src/lib/structuredData.ts
git commit -m "docs: document the eight voices, Compact's 10px exemption and the layout-first chooser"
```

---

## Task 9: Whole-set verification

The spec asks for manual print verification per template, two-page and one-page, with a photo. Tasks 3–6 each did their own; this is the pass over all eight together, which is where cross-template regressions from the Task 1 migration would show up.

**Files:** none — this task changes nothing unless it finds something.

- [ ] **Step 1: Full automated check**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: all clean. The build matters: the four guide pages prerender a worked sample and a template error there is a build error.

- [ ] **Step 2: Print all eight, one page**

`npm run dev`, `/builder`, "Fill with an example", upload a 400×225 photo. For each of the eight templates, print to PDF and confirm:

- The frame (where the template has one) closes on all four sides.
- The photo is clipped to its box and does not spill.
- No content touches a border.
- Nothing inside the frame casts a blurred shadow.
- The section order matches `documentContent`: personal, religious, education, career, family, address, lifestyle, partner, contact.

- [ ] **Step 3: Print all eight, two pages**

Extend the sample until it overflows — add four or five siblings with long occupations and a long Present Address and Permanent Address. For each of the eight, confirm:

- The frame closes on **both** pages (this is `.sheet-frame` doing its job).
- No section heading is separated from its rows.
- No label/value line is split.
- Panel's teal band and Banner's indigo band appear on page one only.
- Plain keeps its 22mm margin on page two.

- [ ] **Step 4: Print with "Background graphics" unchecked**

In Chrome's print dialog, uncheck Background graphics and print Classic, Panel, Compact and Banner. All four fills must still print — `print-color-adjust: exact` on `#biodata-preview` is what makes that true, and a fill that lives outside that element would silently vanish.

- [ ] **Step 5: Bengali pass**

Switch Document Language to বাংলা and repeat Step 2 for all eight:

- No Bengali heading is letter-spaced anywhere.
- Compact's 10px Bengali rows are legible on paper.
- Dates read as `11 মার্চ, 1997` — Bengali month, Latin numerals.

- [ ] **Step 6: Guide pages**

Open all four of `/patrir-biodata`, `/patror-biodata`, `/muslim-biodata`, `/hindu-biodata`. The worked sample still renders (they are pinned to `template="classic"`, so this is a Task 1 regression check). Confirm each page still has exactly one `h1` and the sample's headings start at `h3`.

- [ ] **Step 7: Report**

Report what was verified and what, if anything, failed — with the actual output. Do not claim a print check passed that was not run.
