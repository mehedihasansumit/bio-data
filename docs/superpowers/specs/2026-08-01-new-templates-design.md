# Four new document templates

**Status:** approved, ready for an implementation plan
**Date:** 2026-08-01

## Why

The product ships four templates that all say they are independent designs and
are in fact one design in four inks. Every one of them is a single column: an
ornament row, a centred title, a name-and-photo block, then label/value rows
under section headings. The Four Voices Rule already grants each template the
right to "reinvent its layout completely — sidebar, split columns, banner
header, repositioned photo". Nothing has used that right.

These four do. Each one is a different *shape* of sheet, and one of them
(Compact) answers a complaint the current set cannot: a filled-in biodata runs
past one page.

## What is being built

Four new templates, taking the set from four to eight.

| Name | Ink (primary / accent) | Glyph | Shape |
|---|---|---|---|
| **Panel** | teal `#0f766e` / `#5eead4` | ❖ | 52mm teal panel floated left holding photo, name, headline facts and contact. Sections wrap beside it, then below it. |
| **Compact** | ochre `#92400e` / `#d97706` | ✤ | Header band, then every section flowing through two 90mm columns. A full biodata on one sheet. |
| **Banner** | indigo `#312e81` / `#818cf8` | ❈ | Full-bleed indigo header carrying photo, title, name and facts. Clerical rows below. |
| **Plain** | ink `#111827` / `#9ca3af` | *none* | No frame, no ornament. 22mm margins, one rule under the head, hierarchy from whitespace alone. |

Plain carrying no glyph is deliberate. The One Glyph Rule sets a ceiling on
ornament, not a floor, and "no ornament at all" is the whole of Plain's
identity.

### Verified measurements

Every number below was measured, not estimated.

**Contrast** — all four inks on white, and white on the two filled surfaces:

| Ink | On white | Verdict |
|---|---|---|
| Panel teal | 5.47:1 | passes AA |
| Compact ochre | 7.09:1 | passes AA |
| Banner indigo | 11.42:1 | passes AA |
| Plain ink | 17.74:1 | passes AA |
| white on Panel teal | 5.47:1 | passes AA |
| white on Banner indigo | 11.42:1 | passes AA |

**Label column widths.** Document Language is the user's choice, so a column
has to hold the wider of the two scripts. English is wider than Bengali at
every size measured:

| Size | Widest Bengali row label | Widest English row label |
|---|---|---|
| 10px | 81px — পারিবারিক মূল্যবোধ | **99px — "Permanent Address"** |
| 11px | 89px — পারিবারিক মূল্যবোধ | **108px — "Permanent Address"** |

Resulting widths:

- **Compact** (10px): label column **104px**. The 78px used in the mockup
  overflowed — `ভাই-বোনের বিবরণ` collided with its own value.
- **Panel, Banner** (11px): label column **120px**, matching Classic.
- **Plain** (11px): label column **130px**, which its wider measure affords.

The existing four were checked at the same time and are safe: the widest
second-position label is 92px ("Notable Relative") against a 100px minimum
column. No change needed there.

## Prototyped risks

Three things could have sunk this. All three were prototyped in a real print
PDF before this spec was written.

**Panel's float survives a page break.** The panel is `float: left`; sections
wrap beside it and then below it, and page two runs full width with no
orphaned colour band. Confirmed in a two-page PDF.

**Compact's two columns survive a page break.** `column-count: 2` with
`break-inside-avoid` on sections held: no section split across a column
boundary, the frame closed on all sides, and a document with three times the
real section count still fit one page.

**Bengali holds at 10px.** Inspected at 4×: মাত্রা stays continuous and
`ক্ত`, `ক্ষ`, `শ্ব`, `স্থ্য`, `প্র` all form correctly at 10px in Hind
Siliguri. `স্নাতকোত্তর`, `রক্তের গ্রুপ`, `ব্যক্তিগত` and `বিশ্ববিদ্যালয়`
were the test words, the same ones that settled 11px originally.

### Panel's second page

The panel ends with its content; page two is full width. An empty 52mm colour
band running down every page reads as broken, and now that
`print-color-adjust: exact` forces fills to print, it would lay a strip of ink
down every sheet at a print shop. A float gives this behaviour for free.

### Compact's 10px exemption

Compact is exempt from The 11px Record Rule. Written into DESIGN.md as
Compact's own rule, not a general relaxation — every other template stays at
11px. The exemption is conditional on the legibility check above, which it
passed.

## Architecture

### `src/components/preview/kit.tsx` (new)

Two components, holding only what must never drift between templates:

- `<Photo>` — owns the `.photo-frame` class, `object-fit: cover`, and the
  alt-text convention (`Photograph of {name}` / `Photograph`).
- `<Ornament>` — owns `aria-hidden="true"` and the three-glyph repeat.

Nothing else moves. Each template keeps its own `Rows`, its own `Section`, and
its entire composition, exactly as the Four Voices Rule requires — what is
shared is semantics and print-safety, not visual decisions. This follows the
precedent set by `preview/headings.ts`.

The four existing templates migrate onto the kit as part of this work. The
motivation is concrete: in one recent session the photo-clipping fix had to be
applied in four separate files, `.sheet-frame` in five, and Classic's section
heading had silently drifted to a `<div>` while the other three used `<h3>`. At
eight templates every such fix doubles. After the migration a print-level fix
lands in one place.

### Template chooser becomes layout-first

`TemplateSelector` gains a ~20×26px CSS wireframe of each template's actual
layout, beside the name. The two colour swatches stay as a secondary cue.

`TemplateOption` gains one field naming the shape to draw:

```ts
layout: "stacked" | "panel" | "two-column" | "banner" | "plain"
```

`stacked` covers the four existing templates. The wireframe is drawn from this
value in `TemplateSelector` with plain divs — no per-template artwork, no SVG
assets, and nothing a new template has to remember to supply beyond picking
one of the five names.

This is necessary rather than cosmetic. The new inks sit close to existing ones
in RGB terms — Panel teal is 47 from Classic emerald, Compact ochre 43 from
Royal oxblood, Banner indigo 41 from Elegant navy — which is not
distinguishable in a 12px swatch. Colour has stopped being the thing that
tells these templates apart; layout is. The chooser should show what actually
differs.

Eight chips in the existing two-up grid is four rows, roughly 250px above the
sheet. That stays a grid. It is not going back to a horizontal scroller —
that hid a quarter of the templates and was fixed for that reason.

## What every new template inherits and may not change

- 190mm width with a 277mm minimum height, via `w-[190mm]` and `min-h-[277mm]`
- Every field from `documentContent(data)`, in order — no template decides
  what is said (The Single Content Source Rule, The Content Parity Rule)
- `docHeadings(headingLevel)` for its title, name and section headings
- `.sheet-frame` on any bordered frame, so it closes on every printed page
- Vertical inset on the frame element itself, never only on an inner wrapper —
  only the frame's own padding is cloned onto each fragment
- `break-inside-avoid` on every section and every row
- No shadow inside the frame (The Flat Paper Rule)
- No letter-spacing on Bengali at any size (The Bengali-Is-Never-Tracked Rule)
- Geist and Hind Siliguri only (The Single Family Rule)
- Square corners; Modern's 8px radius is Modern's alone (The Square Paper Rule)
- No skill bars, rings, timelines or rating dots — Plain is closest to this
  line and must stay clerical

## Out of scope

- Re-inking or re-laying-out the existing four templates. They migrate onto
  the kit; they do not change visually.
- Interface Language for the builder. Still open, still tracked separately.
- Any change to `documentContent.ts`. No new fields.

## Files

| File | Change |
|---|---|
| `src/components/preview/kit.tsx` | new — `<Photo>`, `<Ornament>` |
| `src/components/preview/PanelTemplate.tsx` | new |
| `src/components/preview/CompactTemplate.tsx` | new |
| `src/components/preview/BannerTemplate.tsx` | new |
| `src/components/preview/PlainTemplate.tsx` | new |
| `src/types/templates.ts` | four new entries; add `layout` to `TemplateOption` |
| `src/components/preview/BiodataPreview.tsx` | register four templates |
| `src/components/ui/TemplateSelector.tsx` | layout wireframes |
| `src/components/preview/{Classic,Elegant,Modern,Royal}Template.tsx` | migrate to the kit |
| `DESIGN.md` | four voices documented; Compact's 10px exemption; chooser change |

## Testing

- `documentContent.test.ts` already guards Content Parity at the data layer and
  needs no change.
- Add a test asserting every template in `templates` has an entry in
  `BiodataPreview`'s `TEMPLATES` map and a `layout` for the chooser, so a
  future template cannot be half-registered.
- Manual print verification per template, two-page and one-page, with a photo:
  frame closes on both pages, photo stays clipped, no content against a border.
