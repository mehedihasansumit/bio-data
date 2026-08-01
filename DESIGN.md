---
name: BiyerBiodata
description: A marriage biodata maker for Bangladeshi and Indian families — fill a form, watch an A4 document compose itself, print it.
colors:
  # Chrome — Deep Ceremonial Emerald (Tailwind `emerald-*` scale)
  ink-emerald: "#064e3b"
  chrome-emerald: "#065f46"
  action-emerald: "#047857"
  signal-emerald: "#059669"
  focus-emerald: "#10b981"
  edge-emerald: "#6ee7b7"
  rule-emerald: "#a7f3d0"
  wash-emerald: "#d1fae5"
  paper-emerald: "#ecfdf5"
  # Neutrals
  ink-black: "#171717"
  ink-strong: "#111827"
  ink-body: "#374151"
  ink-muted: "#6b7280"
  ink-faint: "#9ca3af"
  stroke-default: "#d1d5db"
  stroke-subtle: "#e5e7eb"
  surface-workspace: "#f9fafb"
  surface-paper: "#ffffff"
  # Destructive
  alert-red: "#ef4444"
  alert-red-deep: "#b91c1c"
  # Document inks — Classic
  classic-primary: "#065f46"
  classic-accent: "#10b981"
  classic-bg: "#ecfdf5"
  # Document inks — Elegant
  elegant-primary: "#1e3a5f"
  elegant-accent: "#d4a853"
  elegant-bg: "#f0f4f8"
  # Document inks — Modern
  modern-primary: "#6d28d9"
  modern-heading: "#7c3aed"
  modern-accent: "#a78bfa"
  modern-bg: "#f5f3ff"
  # Document inks — Royal
  royal-primary: "#7f1d1d"
  royal-accent: "#b91c1c"
  royal-bg: "#fef2f2"
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
typography:
  display:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  headline:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.15em"
  headline-compact:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  title:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  name:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.15em"
  meta:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  micro:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  ornament:
    fontFamily: "Geist, Geist Fallback, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "64px"
components:
  button-cta:
    backgroundColor: "{colors.action-emerald}"
    textColor: "{colors.surface-paper}"
    rounded: "{rounded.lg}"
    padding: "14px 32px"
  button-cta-hover:
    backgroundColor: "{colors.chrome-emerald}"
  button-primary:
    backgroundColor: "{colors.action-emerald}"
    textColor: "{colors.surface-paper}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.chrome-emerald}"
  button-secondary:
    backgroundColor: "{colors.paper-emerald}"
    textColor: "{colors.action-emerald}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.wash-emerald}"
  button-inverse:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.chrome-emerald}"
    rounded: "{rounded.lg}"
    padding: "8px 20px"
  button-inverse-hover:
    backgroundColor: "{colors.paper-emerald}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  tab-hover:
    backgroundColor: "{colors.paper-emerald}"
  tab-active:
    backgroundColor: "{colors.action-emerald}"
    textColor: "{colors.surface-paper}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  input:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.ink-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  input-readonly:
    backgroundColor: "{colors.surface-workspace}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.surface-paper}"
    rounded: "{rounded.lg}"
    padding: "24px"
  template-chip:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  template-chip-selected:
    backgroundColor: "{colors.surface-workspace}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  photo-dropzone:
    backgroundColor: "{colors.paper-emerald}"
    textColor: "{colors.chrome-emerald}"
    rounded: "{rounded.lg}"
    width: "128px"
    height: "160px"
  section-band:
    backgroundColor: "{colors.chrome-emerald}"
    textColor: "{colors.surface-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "3px 12px"
  document-frame:
    backgroundColor: "{colors.surface-paper}"
    width: "190mm"
    height: "277mm"
    padding: "16px"
---

# Design System: BiyerBiodata

## Overview

**Creative North Star: "The Registrar's Desk"**

This product has two visual worlds, and confusing them is the fastest way to break it. The first is the **desk**: an emerald-headed workspace where someone fills in a long form about themselves. The second is the **record**: an A4 sheet that composes itself in real time beside the form, and which will be printed, folded, and handed between two families. The desk is furniture. The record is the product. Every design decision follows from which of the two you are touching.

The register-office reading is deliberate. A marriage biodata is a document of consequence — it gets read closely by people deciding something serious, and its credibility comes from looking like a record rather than a poster. So the system leans clerical: fixed label columns, uppercase section headings at 10px with wide tracking, hairline rules, values stated flatly in 11px with no emphasis, no visualization of anything. Deep Ceremonial Emerald carries the civic register — it is the green of Bangladeshi official life, formal and a little solemn, and it earns its authority by never being decorative.

The desk is intentionally plain so the record can be looked at. White panels float on a gray workspace, buttons are unornamented rounded rectangles, and the entire interface is built from about six primitives repeated without variation. The one place the system permits character is inside the document frame, where eight templates each speak in their own ink — emerald, navy and gold, violet, burgundy, teal, ochre, indigo, and plain black — with their own border language and their own ornamental glyph, or in one case none of either. Templates are treated as **distinct voices, not skins**, and since the second four they have earned that: one floats a coloured sidebar, one flows the record through two columns, one runs a full-bleed banner and drops the frame, one strips the ornament entirely. What a template may not reinvent is the record's obligations — the A4 frame, the field vocabulary, and the clerical register.

**Key Characteristics:**

- Two worlds: lifted app chrome, flat printed record. The shadow boundary is the paper boundary.
- Emerald belongs to the chrome; document color belongs to the chosen template.
- A4 geometry (190mm × 277mm live area) is the governing grid of the output, not a screen breakpoint.
- Label/value rows at 11px with fixed-width label columns — the core visual unit of the record.
- Uppercase, wide-tracked 10px section headings; no icons, no illustration, no data visualization.
- Ornament is limited to a single repeated Unicode dingbat, three of them, centered.
- Light theme only, permanently.

## Colors

Two palettes that must not be mixed: an emerald chrome palette for the application, and eight self-contained document inks selected by the user at print time.

### Primary

- **Deep Ceremonial Emerald** — the chrome identity, used across nine steps. `chrome-emerald` fills the app header bar and the Classic template's section bands; `action-emerald` carries every primary action (CTA, active tab, Next button, link hover); `ink-emerald` is reserved for document headings in the Classic template. The deep end reads as institutional ink, not brand color.
- The light end is surface work only: `paper-emerald` tints hover states, the photo dropzone, and the landing hero's background wash; `wash-emerald` is its pressed/hover step; `rule-emerald` draws the underline beneath form section headings and carries secondary text on the emerald header bar.
- `focus-emerald` exists for exactly one job: the 2px focus ring on inputs. `edge-emerald` draws the dashed dropzone border. `signal-emerald` appears only on the Classic template's ornament row.

### Secondary

The eight **document inks** are not brand colors — they are user-selected paper stocks, declared as a `primary` / `accent` pair per template in `src/types/templates.ts` and rendered as literal hex inside each template component.

- **Classic — Register Green** (`classic-primary`): the only template that reuses the chrome emerald. Solid section bands, double border, snowflake ornaments.
- **Elegant — Deep Naval Navy with Antique Gold** (`elegant-primary` / `elegant-accent`): navy carries every label and heading; gold is structural only — corner brackets, rule segments, ornaments, photo ring.
- **Modern — Clean Violet** (`modern-primary`): the only template with rounded corners and pill-shaped meta chips. `modern-heading` is the actual section-heading value and sits one step lighter than the declared primary.
- **Royal — Deep Oxblood with Signal Crimson** (`royal-primary` / `royal-accent`): oxblood for text and the outer frame, crimson for the inner hairline, section markers, and the fading gradient rule.
- **Panel — Register Teal** (`panel-primary` / `panel-accent`): a 52mm teal panel floated left carrying the photo, name, headline facts and the contact section; the remaining sections wrap beside it and then run full width beneath it.
- **Compact — Ledger Ochre** (`compact-primary` / `compact-accent`): a filled header band over two 90mm columns at 10px. The only template that fits a full biodata on one sheet.
- **Banner — Ministry Indigo** (`banner-primary` / `banner-accent`): a full-bleed indigo header carrying the photo, title, name and facts, with clerical rows below. No frame.
- **Plain — Unadorned Ink** (`plain-primary` / `plain-accent`): no frame, no ornament, 22mm margins and one hairline under the head. Hierarchy from whitespace alone.

Each template declares a `primary` / `accent` pair, and that pair is only what the chooser puts in its two swatches — a template's real inks live in its own component. There was a third `bg` value, described here as reserved for future tinted stocks; nothing ever read it, and four unused hex values that look authoritative are worse than none, so it is gone. The document always sits on `surface-paper`. Add `bg` back alongside the feature that needs it.

**The accent lives on the filled surface.** Three of the four new templates put a large area of their primary ink on the page, and their accent is chosen to work *on that fill*, not on paper — Panel's `#5eead4` is 3.74:1 on teal and 1.48:1 on white, Banner's `#818cf8` is 3.83:1 on indigo and 2.98:1 on white. So each accent stays inside its band (photo rings, panel hairlines, the header ornament) and everything on white is the primary, at full strength for text and at reduced alpha for rules. Compact inverts it deliberately: `#d97706` is 3.20:1 on white and only 2.21:1 on its own ochre band, so its accent lives on the paper and the band's ornament is white at 70% instead. In no template is an accent ever text.

All four new inks were measured against white, and white against the two filled surfaces: Panel teal 5.47:1, Compact ochre 7.09:1, Banner indigo 11.42:1, Plain ink 17.74:1 — every one of them passing AA in both directions.

### Neutral

- `ink-black` — the root `--foreground` token; the default text color set on `body`.
- `ink-strong` — headings and hard values (hero h1, person's name in every template, template chip names).
- `ink-body` — every value in a document row. This is the workhorse: labels are colored by template, values are always neutral.
- `ink-muted` — inactive tab labels, supporting copy, footer text, the "Choose Template" eyebrow.
- `ink-faint` — Modern's row labels (the one template that uses a neutral label instead of its own ink) and template chip descriptions.
- `stroke-default` — input borders. `stroke-subtle` — unselected template chip borders.
- `surface-workspace` — the builder's page background and the landing footer; the gray the white panels float on.
- `surface-paper` — every panel, every card, and every document. Paper is always white.

### Named Rules

**The Two Palettes Rule.** Emerald is the application's voice; the document's voice is whichever template is selected. An emerald never appears inside a non-Classic document, and a template ink never appears in the app chrome. The template chooser's swatch pairs are the only place the two worlds are allowed to touch.

**The Neutral Value Rule.** In every document row, the label is colored and the value is neutral (`ink-body`). Color marks the field name, never the person's data. Nothing about a candidate is ever highlighted, tinted, or emphasized over anything else.

*On a reversed surface the tint comes off the label instead.* Panel's contact rows sit on solid teal, where `ink-body` grey is unreadable, so both label and value are white and are separated by weight and size. The rule's substance is untouched — no value is tinted, and nothing about the candidate is emphasized over anything else. This applies to filled panels only; on paper the rule is literal.

**The Rare Red Rule.** Red appears in exactly two places: the "Remove Photo" control and the photo-upload error message, both in `alert-red-deep` (`alert-red` itself fails contrast on white at body size and is not used for text). Red is never used for required-field marks or emphasis; the required marker is a plain `*` in the label, unstyled.

## Typography

**Display Font:** Geist (with Geist Fallback, sans-serif)
**Body Font:** Geist (with Geist Fallback, sans-serif)
**Bengali Font:** Hind Siliguri (400/500/600/700) — the Bengali half of the same stack, never a second voice.
**Label/Mono Font:** none — the system is single-family per script.

**Character:** Deliberately anonymous. A single grotesque at every size, distinguished only by weight, tracking, and case. Nothing in the type says "designed" — which is the point, because a record that looks styled looks less true. All expression comes from spacing and rule work, none from letterforms.

Geist is self-hosted through `next/font/google` in `src/app/layout.tsx`, exposed as `--font-geist-sans`, mapped to `--font-sans` in the `@theme inline` block, and applied on `body`. Next emits a metric-matched `Geist Fallback` (derived from local Arial) so there is no layout shift while the face loads.

**Bengali coverage — closed.** Hind Siliguri sits behind Geist in `--font-sans`, loaded from `next/font/google` as `--font-hind-siliguri`. The two never compete for a glyph: Geist carries all Latin, and Bengali codepoints find nothing in Geist — nor in the Arial-derived `Geist Fallback`, which has no Bengali — so they fall through. One stack, two scripts, no conditional logic anywhere in the components.

Only the `bengali` subset is requested, since Latin never reaches this face. Hind Siliguri was chosen over Noto Sans Bengali for its larger effective x-height, which is what the 11px Record Rule below depends on; it is fractionally warmer than "deliberately anonymous" asks for, and that was the price of legibility at document size.

**Preload — closed.** The face now carries Next's default `preload: true`. That gap was correct only while the site's own copy was English and Bengali appeared solely in what a user typed; the site is now Bengali-first, so Hind Siliguri draws the largest contentful paint on every page and deferring it to first-glyph discovery would delay exactly the metric it feeds.

**Bengali at 11px — verified.** The 11px Record Rule was tuned on Latin, and Bengali needs more vertical room for মাত্রা and stacked যুক্তাক্ষর, so the rule was held only provisionally when Hind Siliguri landed. It has since been checked the only way that settles it: a full sample biodata rendered in Bengali and inspected at 4× (`ব্যক্তিগত`, `স্বাস্থ্য`, `রক্তের গ্রুপ`, `স্নাতকোত্তর`). Conjuncts form correctly, the মাত্রা stays continuous, and the labels hold their own beside 11px Latin values. **The rule stands at 11px for both scripts.** Re-check it before adopting any face other than Hind Siliguri — the margin here is the reason that face was chosen over Noto Sans Bengali.

**Numerals are always Latin.** In a Bengali document the month name translates but the digits do not: `11 মার্চ, 1997`, never `১১ মার্চ, ১৯৯৭`. Every other number on the page — age, height, income, phone — was typed by the user in Latin and is printed verbatim, so a Bengali-numeral date is the only one of its kind on the sheet and collides with the Latin age three characters later inside the same cell. Enforced by the `-u-nu-latn` extension on the locale in `documentStrings.ts`.

### Hierarchy

- **Display** (700, 36px → 48px at ≥640px, leading 1.25): the landing hero headline, and nothing else. One per site.
- **Headline** (700, 18px, uppercase, tracking 0.15em): the document's self-declaration at the top of every template. Not a fixed string — `documentTitle()` resolves it from Candidate Kind and Document Language, so it reads "পাত্রীর বায়োডাটা", "পাত্রের বায়োডাটা", or "Marriage Biodata" rather than the generic heading every other tool prints. Royal tightens to 16px and opens tracking to 0.2em; Elegant holds 18px at 0.18em. Tracking applies to the Latin forms only — see The Bengali-Is-Never-Tracked Rule.
- **Title** (700, 20px): the app wordmark in both headers. At 18px/600 it also serves the form's section headings ("Personal Information") and at 15px/700 the candidate's name inside every document.
- **Body** (400, 14px, leading 1.5): all interface copy, inputs, and buttons. Landing supporting copy steps up to 18px and is capped at `max-w-lg` (32rem) for line length.
- **Label** (700, 10px, uppercase, tracking 0.12–0.15em): document section headings in all eight templates, and the "Choose Template" eyebrow at 14px/600. Form field labels are the exception — 14px/500, sentence case, neutral.
- **Data** (400, 11px, leading 1.25–1.375): every label/value row inside a document. Labels within the row step up to 600–700 weight and take the template's ink; values stay 400 and neutral.

### Named Rules

**The 11px Record Rule.** Document body text is 11px. Not 10, not 12. It is the smallest size that holds the row rhythm and stays comfortably readable on a printed sheet a stranger will study closely, and every template is tuned around it — in both scripts, per the Bengali verification above. Changing it re-paginates everything. (It once also served a one-page budget; that constraint is gone, see The Clean Break Rule. The size survives on legibility alone.)

**Compact is the single exemption, at 10px.** Two 90mm columns is the only composition in the set that fits a full biodata on one sheet, and it does not fit at 11px. The exemption was bought, not assumed: at 4× magnification the মাত্রা stays continuous and `ক্ত`, `ক্ষ`, `শ্ব`, `স্থ্য` and `প্র` all form correctly at 10px in Hind Siliguri, tested on `স্নাতকোত্তর`, `রক্তের গ্রুপ`, `ব্যক্তিগত` and `বিশ্ববিদ্যালয়` — the same words that settled 11px originally. This is Compact's own rule and not a general relaxation: every other template stays at 11px, and a ninth template does not inherit it.

**The Uppercase-Is-Structural Rule.** Uppercase plus wide tracking marks a section boundary and nothing else. Never uppercase a value, a name, a button, or a form label. **Latin only** — see the next rule.

**The Bengali-Is-Never-Tracked Rule.** Bengali carries no letter-spacing anywhere, at any size. Bengali has no case, so `uppercase` is inert on it, but tracking is destructive: it severs the মাত্রা — the horizontal headline stroke that joins the letters of a word — and pulls যুক্তাক্ষর apart into their components. A tracked Bengali heading does not read as emphasis, it reads as broken text. In Bengali a section boundary is carried by ink and rule work alone. Enforced centrally rather than per template: `BiodataPreview` stamps the Document Language onto `#biodata-preview[lang]`, and an unlayered rule in `globals.css` resets `letter-spacing` beneath it. Unlayered beats Tailwind's `@layer utilities`, so this wins over `tracking-*` on the element without `!important`, and a new template cannot reintroduce the problem by accident.

**The Single Family Rule.** One font family per script across the whole product, chrome and documents alike: Geist for Latin, Hind Siliguri for Bengali. A second face is admissible only to cover glyphs the first one lacks — never for expression. A template differentiates itself with ink, border, and ornament, never by introducing a serif, a script, or a display face.

**The Our Words, Their Data Rule.** The app translates its own words and never the user's. A label is ours, so it changes with Document Language. A value the user typed — a name, "5 ft 8 in", "৳1,00,000+", a company, a phone number — is theirs, and prints exactly as entered, in whatever script they entered it. A Bengali document with an English-typed employer is correct; "translating" it would be the app editing someone's biodata. This is why the words rule and the numerals rule differ: words only ever come from one side, numerals come from both and sit adjacent.

**The Two Languages Are Two Concepts Rule.** Interface Language and Document Language are independent and must never be collapsed into one site-wide locale (ADR `docs/adr/0001`). The builder may be bilingual; the finished document must not be — a formal record that labels all ~60 of its rows twice reads as an untranslated template rather than a considered artifact. Document Language is stored on the biodata itself, so an exported and re-imported record keeps the language it was authored in, and one person can produce both an English and a Bengali version of themselves. Because it lives in the data and not the URL, the marketing routes need no `[locale]` segment, no hreflang, and no duplicated content set.

**The One Seam Rule.** Every translated string in a document resolves in `documentContent.ts` via `documentStrings.ts`. A template never receives a language and never learns one exists — it renders whatever words it is handed. String keys are semantic (`personal.fullName`), not English-derived, so rewording an English label is a copy change and not a schema change.

## Layout

**The application** is a centered, capped column on a gray workspace. The landing page holds its header and footer to `max-w-5xl` (1024px) and its hero content to `max-w-2xl` (672px), centered, with the main region flex-grown so the footer sits at the bottom of short viewports. The builder widens to `max-w-7xl` (1280px) with 16px padding, stepping to 24px at ≥1024px.

The builder's core is a **50/50 split**: form on the left, live document preview on the right, 24px gutter, each side `lg:w-1/2`. The preview column is `sticky top-4` so the document stays in view while the form scrolls. Below 1024px the split collapses to a single column and a full-width two-button segmented control ("Form" / "Preview") swaps between them — only one is mounted visible at a time.

**Breakpoints in use:** `sm` 640px (form grid goes two-up, hero buttons go horizontal, hero type steps up), `lg` 1024px (split view appears, mobile toggle disappears, padding increases), plus a `print` variant that does most of the real work.

**Form density:** fields sit on a `grid-cols-1 sm:grid-cols-2` grid with a 16px gap. Wide fields (address, hometown, photo) opt into full width with `sm:col-span-2`. Section headings span the grid and carry a 2px `rule-emerald` underline with 8px of space beneath.

**The document** is governed by print geometry, not screen breakpoints: `w-[190mm]` wide, `min-h-[277mm]` tall — exactly A4 (210 × 297mm) minus the 10mm `@page` margin on all four sides. Both figures are load-bearing: 190 = 210 − 2 × 10, and 277 = 297 − 2 × 10. The outer wrapper drops its screen padding in print (`print:p-0`) so the frame occupies the page box precisely, and no `100vh` calc is used in a paged context. It never reflows responsively.

**The width is `w-`, not `max-w-`, and the difference was a real defect.** A max-width lets the sheet take the column instead of the page: the builder's preview column resolves to 604px and is capped there by `max-w-7xl`, so the document laid out ~16% narrower than A4 while keeping a full 277mm height — an aspect of 0.567 against A4's 0.686, and lines that wrapped on screen where they didn't on paper. A live preview may do many things; disagreeing with the print output is not one of them.

**Fitting is done by zoom, in `.sheet-fit`.** The sheet always lays out at a true 190mm and is scaled down to whatever the column allows: `container-type: inline-size` on the wrapper, `zoom: min(1, 100cqi / 190mm)` on the document. `zoom` rather than `transform: scale()` because zoom reflows its parent — a scaled sheet keeps its unscaled layout box and leaves a dead gap beneath itself. No JavaScript, because the guide pages render their sample on the server and a measured-then-scaled sheet would arrive only after hydration. Where `zoom` or CSS length division is unsupported the declaration is dropped and the surrounding `overflow-x-auto` pans a full-size sheet instead — the old behavior, now the fallback.

Both halves come off in print (`container-type: normal`, `zoom: 1`). The containment reset is not cosmetic: `container-type: inline-size` carries layout containment, which makes a box monolithic in paged media and would hold a multi-page biodata to one page, silently clipping the rest.

Internal padding is 20px on screen, 12px in print — except Compact, whose frame padding is 3mm because that is what leaves two true 90mm columns inside a 190mm sheet once the 4mm gutter is taken, and Plain, whose 22mm margin *is* its design.

Row label columns are fixed-width so that every row aligns into columns down the page regardless of content length. The first label is 104–130px, the second 100–110px, the first value 125–140px — the exact figures vary with the measure each template gives itself: Compact 104px at 10px in a 90mm column, Elegant and Modern 115px, Classic / Panel / Banner 120px, Plain 130px on its 146mm measure. The widths were measured rather than estimated, and against English rather than Bengali: Document Language is the user's choice, so a column must hold the wider of the two scripts, and English is wider at every size measured — "Permanent Address" is 99px at 10px and 108px at 11px, against 81px and 89px for `পারিবারিক মূল্যবোধ`. Compact's column was 78px in the mockup and overflowed; `ভাই-বোনের বিবরণ` collided with its own value.

### Named Rules

**The A4 Constant Rule.** The document *lays out* at 190mm wide at every viewport — phone, laptop, and 4K alike — and is fitted to its column by scale alone. It is not responsive, it does not stack, it does not gain or lose fields on small screens, and it never takes the width it happens to be given. Its line breaks are therefore identical on a 390px phone and on paper. What you see is what prints, at a different size.

*(This rule was documentation-only until the `max-w-` → `w-` + `.sheet-fit` change above; the sheet had never actually been 190mm on screen.)*

**The Clean Break Rule.** A biodata runs to as many A4 pages as its content needs — the schema now carries itemised siblings, five education levels, and religion-specific fields, and forcing that onto one sheet would mean either 8px type or dropping real information. What is *not* negotiable is where it breaks: a section heading never separates from its rows, and a label/value line never splits across a page. Every section and every row carries `break-inside-avoid`. A page may end early; it may not end mid-thought.

*(This replaces the former One Sheet Rule, which held while the schema was 55 fields. It no longer is.)*

**The Fixed Column Rule.** Label columns are fixed pixel widths, never `auto` or fractional. Ragged label columns are what makes a form-filled document look homemade.

## Elevation & Depth

Hybrid, split cleanly along the world boundary. **The application uses shadows; the document does not.** White panels lift off `surface-workspace` with soft, neutral shadows to read as objects on a desk. Inside the A4 frame, depth comes exclusively from borders, hairline rules, and tonal bands — because paper has no shadow, and the moment the record picks one up it stops reading as a printable document and starts reading as a UI card.

Print styles enforce this: `#biodata-preview` has `box-shadow: none !important`, and `.sticky` is reset to `position: static`.

### Shadow Vocabulary

- **Panel** (Tailwind `shadow-sm` — `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): the tab strip, the form card, and the selected template chip. The default lift for anything that is a surface.
- **Stage** (Tailwind `shadow-lg` — `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): the preview container only. This is the shadow that says "a sheet is lying on this desk." Stripped in print.
- **Accent glow** (`shadow-lg` tinted with `rule-emerald`): the landing CTA alone. The only colored shadow in the system.
- **Modal** (Tailwind `shadow-xl`): the confirmation dialog only. One step above Stage because it sits above everything, over its own scrim.
- **Focus ring** (`0 0 0 2px` `focus-emerald`, with the border made transparent): every input, select, and textarea. Non-negotiable and never removed.
- **Photo ring** (1–2px inset ring at 20–50% opacity, tinted per template): frames the candidate's photo inside the document.

**Resolved.** Photo frames formerly carried `shadow-md`/`shadow-lg` inside the A4 frame. Every one is now ring-only: Classic `ring-1` emerald at 20%, Elegant `ring-2` gold at 50%, Modern `ring-2` violet, Royal `ring-1` oxblood at 30%, Panel 1px accent teal, Compact 1px white at 40%, Banner 2px accent indigo, and Plain no ring at all. A `box-shadow: 0 0 0 Npx` with no blur and no offset is a ring, not a shadow, and is how the templates that need a literal hex draw one. No blurred or offset shadow exists inside a document frame, so the rule below holds without exception.

### Named Rules

**The Flat Paper Rule.** Nothing inside the document frame casts a shadow. Depth inside the record is made from borders, rules, and filled bands only. If an element inside the A4 frame needs to separate from its surroundings, give it a hairline — not a shadow.

**The Shadow Boundary Rule.** The outermost shadow in the preview column marks the edge of the paper. Everything inside it is print; everything outside it is screen.

## Shapes

Two form languages, again split by world.

**The application** is uniformly soft-rectangular. `rounded-lg` (8px) is the default for buttons, inputs, cards, panels, the photo dropzone, and template chips; `rounded-md` (6px) for the smaller tab pills; `rounded-full` for nothing in the chrome. Borders are 1px `stroke-default` on inputs and 1px `stroke-subtle` on unselected chips. There are no gradients anywhere except one background wash on the landing hero (`paper-emerald` → white, top-left to bottom-right). Nothing is clipped, angled, or asymmetric.

**The document** is square-cornered and frame-driven — each template's identity lives mostly in its border:

- **Classic** — a single 3px `border-double` frame in `classic-primary`. Section headings are solid filled bands with `rounded-sm` (4px) corners, the only rounding inside any document.
- **Elegant** — a 1px navy frame with four 3px gold L-brackets pinned to the corners (20px legs). Sections are marked by a short 2px gold dash, the heading, then a 2px gold rule fading to 40% opacity across the remaining width.
- **Modern** — the outlier: a 2px `modern-accent`-tinted frame with `rounded-lg` (8px) corners and `overflow-hidden`. Sections are underlined with a 1px violet hairline. Meta facts appear as `rounded-full` pills — the only pills in the system.
- **Royal** — a doubled frame: 2px oxblood outer with 4px of white gutter, then a 1px crimson inner at 30% opacity. Sections lead with a ✦ glyph and close with a 1px rule that gradients from 30% crimson to transparent.
- **Panel** — a 1px teal frame around a 52mm teal panel floated to the left. Sections are underlined with a teal hairline at 20% and each is a `display: flow-root` block, so a section sits wholly beside the panel or wholly below it rather than straddling the float's bottom edge.
- **Compact** — a 1px ochre frame at 3mm padding, a filled ochre header band, and section headings underlined in amber inside two 90mm columns.
- **Banner** — **no frame at all.** A full-bleed indigo band across the whole live area, then sections underlined with indigo at 20%. The 10mm `@page` margin is its only inset.
- **Plain** — no frame and no section rules. One `#9ca3af` hairline under the head, 22mm margins, and whitespace for everything else.

**Ornament** is a single repeated dingbat, three of them, at the head and foot of the document — `❅` (U+2745) Classic, `✿` (U+273F) Elegant, `✻` (U+273B) Modern, `❖` (U+2756) Panel, `✤` (U+2724) Compact, `❈` (U+2748) Banner, and Royal alone splits its pair: `❀` (U+2740) in the header, `✦` (U+2726) as both section marker and footer. **Plain carries none.** Footer glyphs run at 20–60% opacity.

*(Two of those pairs used to name the wrong character: this list said "`❀` (U+273F)" for Elegant and "`❁` (U+2740)" for Royal, when U+273F is `✿` and U+2740 is `❀`. The codepoints always matched the shipped entities and the characters never did, which is a trap for anyone migrating a glyph from this document instead of from the code. Corrected in favour of the code.)*

Centering is the four originals' habit, not a rule: Panel's ornament and title are left-aligned in the column beside its panel, and Banner's sit inside the band. The two-rule flourish beneath the header ornament — a 144px rule, then a 96px rule at reduced opacity, both centered — likewise belongs to the original four. Panel rules the full column width, Banner runs a 96px rule inside the band, and Plain and Compact have no flourish at all.

### Named Rules

**The One Glyph Rule.** A template gets exactly one ornamental character, repeated three times, used twice (header and footer). No mixing, no clip art, no SVG flourishes, no borders made of repeated symbols.

*Plain carries none.* The rule is a ceiling on ornament, not a floor, and "no ornament at all" is the whole of Plain's identity — a biodata for someone who wants the record and nothing around it. Enforced structurally rather than by discipline: `<Ornament>` in `preview/kit.tsx` owns the three-fold repeat and the `aria-hidden`, so a template can decline to render it but cannot quietly print four.

**The Square Paper Rule.** Document frames are square-cornered. Modern's 8px radius is a deliberate, single exception that defines its identity — no other template copies it, and none of the four added since does.

## Components

### Buttons

- **Shape:** softly rounded rectangles, 8px radius (`rounded-lg`), no border, no icon. Tab pills step down to 6px (`rounded-md`).
- **CTA:** `action-emerald` fill, white text, 18px/600, 32px horizontal and 14px vertical padding, carrying the accent glow shadow. One per page.
- **Primary:** `action-emerald` fill, white text, 14px/500, 16px × 8px padding. The "Next" control.
- **Secondary:** `paper-emerald` fill, `action-emerald` text, same metrics as primary. The "Previous" control — a tinted-surface variant, not an outlined one. There are no outlined buttons in this system.
- **Inverse:** white fill, `chrome-emerald` text, 20px × 8px padding. Lives only on the emerald header bar, where a filled emerald button would disappear.
- **Ghost:** text-only, `rule-emerald` → white on hover. Header utilities ("Load Sample", "Clear All").
- **Hover / Focus:** every button transitions `background-color` only, at Tailwind's default 150ms. No lift, no scale, no shadow change.
- **Disabled:** 40% opacity plus `cursor: not-allowed`. The color does not change — the control stays recognizably itself.

### Chips

- **Template chip:** a two-up grid of bordered white tiles, each carrying a layout wireframe, then a stacked two-swatch color pair (12px squares, 2px apart, 2px radius), then the template name at 12px/600 over its description at 11px. Eight templates make four rows.
- **Layout wireframe:** a ~20×26px drawing of the template's actual shape, leftmost in the chip. Drawn from `TemplateOption.layout` — one of `stacked`, `panel`, `two-column`, `banner`, `plain` — with plain divs. No per-template artwork and no SVG assets; a new template picks one of the five names and nothing else. Plain's wireframe carries a transparent border rather than none, so all five drawings are the same size while only Plain reads as frameless.
- **State:** selected takes an `ink-strong`-adjacent dark border plus a 1px ring and `surface-workspace` fill; unselected sits on white with a `stroke-subtle` border that darkens on hover. This is the one control in the app that uses neutral rather than emerald for its selected state — correct, because it is choosing a document ink and must not bias toward Classic.

**The Show What Differs Rule.** The chooser leads with layout because layout is what differs. The eight inks now sit close together in RGB terms — Panel teal is 47 from Classic emerald, Compact ochre 43 from Royal oxblood, Banner indigo 41 from Elegant navy — and none of those distances is visible in a 12px swatch. Colour has stopped being the thing that tells these templates apart, so the swatch pair drops to a secondary cue and the wireframe leads. Eight chips is four rows of two, roughly 250px above the sheet, and it stays a grid: the horizontal scroller it replaced hid a quarter of the templates behind an `overflow-x-auto` with no fade, no arrows and no wrap.
- **Meta pill (Modern template only):** `modern-bg` fill, `modern-primary` text, 9px, fully rounded, 8px × 1px padding.

### Document Settings

Two segmented radio groups above the template chips, holding everything that describes the *document* rather than the person in it: Candidate Kind (পাত্রী / পাত্র / not specified) and Document Language (বাংলা / ইংরেজি). Together with the template chips they form one cluster — the three questions about the artifact, asked in one place.

- **Shape:** the two-line chip, 8px radius, matching the template chip's metrics — Bengali at 12px/600 on the first line, English at 10px on the second.
- **Bengali leads, English supports.** These are the two controls a Bengali user most needs to recognise instantly, and the product is Bengali-first. The English line is a gloss, not a translation of record.
- **State:** selected fills `action-emerald` with white text and an `emerald-100` sub-label; unselected sits on white with a `stroke-subtle` border that darkens on hover. Emerald here, *not* the neutral used by the template chips — the neutral treatment exists so template selection does not bias toward Classic's green ink, and that reasoning does not apply to a question about language or about whose biodata this is.
- **Headings:** sentence case, not tracked, because they carry Bengali. Weight and colour mark them instead.

### Cards / Containers

- **Corner Style:** 8px (`rounded-lg`).
- **Background:** always `surface-paper` on a `surface-workspace` page.
- **Shadow Strategy:** Panel shadow (see Elevation). The preview container takes Stage.
- **Border:** none. Cards separate by shadow and fill, not by stroke.
- **Internal Padding:** 24px for the form card; 4px for the tab strip, which is a container of controls rather than of content.

### Inputs / Fields

- **Style:** white fill, 1px `stroke-default` border, 8px radius, 12px × 8px padding, 14px text. Full width of its grid cell. Selects and textareas share the identical class string — the system has exactly one field appearance.
- **Label:** 14px/500 `ink-body`, sentence case, 4px above the field. Required fields are marked with a trailing `*` in the label, unstyled.
- **Focus:** the border goes transparent and a 2px `focus-emerald` ring takes its place, so the field's outer dimensions never shift. Outline is suppressed in favor of the ring.
- **Read-only:** `surface-workspace` fill, everything else unchanged (the auto-calculated Age field, which also carries `aria-live` so its recalculation is announced).
- **Error:** inline only, never a dialog of any kind — the modal is reserved for destructive confirmation, not for messages. The message sits directly beneath the control in `alert-red-deep` at 14px, carries `role="alert"`, and is wired to the input via `aria-describedby`. It names the actual problem and the recovery — the photo-size error reports the file's real size and suggests cropping — rather than restating the rule.
- **Minimum height:** every control is at least 44px (`min-h-11`), including selects and textareas.

### Navigation

- **Header:** a full-bleed `chrome-emerald` bar, 24px horizontal and 16px vertical padding, wordmark at 20px/700 white on the left, utilities right-aligned with a 12px gap. Secondary actions use `rule-emerald` text lifting to white on hover.
- **Section tabs:** six pills in a white, shadowed strip. Active takes an `action-emerald` fill with white text; inactive is `ink-muted` text on transparent, tinting to `paper-emerald` on hover. They wrap rather than scroll.
- **Mobile toggle:** a two-button full-width segmented control on white with a bottom border. The active side takes `action-emerald` text and a 2px `action-emerald` bottom border; the inactive side is `ink-muted` with no border.
- **Sequential nav:** Previous (secondary) and Next (primary) pinned to opposite ends of a row separated from the form by a top border, 16px above and below.

### Backup & Restore

A collapsed disclosure below the form card, outside the tabpanel so it is reachable from every section. Closed by default — this is a deliberate, occasional action, not part of the filling flow, and it must not compete with Previous/Next.

- **Trigger:** a full-width 44px row reading "Back up or restore", with `aria-expanded` / `aria-controls` and a `+` / `−` affordance. Neutral, not emerald: it is not a step in the task.
- **Actions:** "Copy biodata" takes the primary emerald fill (it is the intended path — the clipboard feeds a password manager); "Download file" and "Open a file" are `paper-emerald` secondaries. A paste textarea plus "Restore from text" covers the return trip.
- **Feedback:** one status line beneath, `role="alert"` on failure and `role="status"` on success, in `alert-red-deep` or `chrome-emerald`. Never a native dialog: restoring over a form that already has content raises the app's own Confirmation Dialog, and restoring into an empty form raises nothing at all.

**The Local Data Rule.** No personal data is ever committed to the repository or shipped in the bundle. The app persists to `localStorage` and exchanges data through user-initiated export and import. If a real biodata needs to travel between devices, it travels through the user's own storage, never through the codebase.

### Confirmation Dialog

The one modal in the product, and the only place the app interrupts. It exists because two actions discard work that cannot be recovered — "Clear All" and restoring over a filled form — and it appears for nothing else. `src/components/ui/ConfirmDialog.tsx`, built on the native `<dialog>` element so the focus trap, Escape, background inertness, and focus restoration come from the platform rather than from hand-written listeners.

- **Panel:** `surface-paper`, 8px radius, 24px padding, capped at 28rem, 16px viewport gutters below that. Scrim is `ink-strong` at 45%.
- **Type:** title 18px/700 `ink-strong`; body 14px/400 `ink-muted` at leading-relaxed. No icon, no illustration, no colored header band — the words carry it, as everywhere else in this system.
- **Actions:** cancel first in the DOM so the platform focuses the safe choice on open. Cancel is a neutral tinted surface (`gray-100`); confirm is a solid fill — `alert-red-deep` for `danger`, `action-emerald` for `primary`. Stacked on mobile with the confirm on top (`flex-col-reverse`), right-aligned in a row from 640px.
- **Copy:** the title asks the question, the body names what is destroyed *and* what survives, and both buttons name their outcome. Never "Are you sure?" / "OK" / "Cancel".
- **Dismissal:** Escape, the cancel button, or a click on the scrim. All three route through `onCancel`, so `open` stays the only source of truth.
- **Motion:** 180ms exponential ease-out, 8px rise and a 0.98 → 1 scale, with the scrim fading alongside. Requires `@starting-style` plus `transition-behavior: allow-discrete` on `display`/`overlay`, since a top-layer element gets no transition otherwise. Reduced to 1ms under `prefers-reduced-motion`.
- **Print:** carries `print:hidden`, and `html:has(dialog[open])` locks page scroll, which `showModal()` does not do on its own.

**The Earned Interruption Rule.** A modal is permitted only when the alternative is silent, unrecoverable data loss. Never for confirmation of something reversible, never for a message, never for a form, never for onboarding. When there is nothing to lose — clearing an already-empty form, restoring into an empty form — the action just happens. A confirmation that guards nothing trains people to dismiss the one that guards something.

**The Rare Red Rule, extended.** Red now has a third home: the confirm button of a `danger` dialog, in `alert-red-deep`. It remains the only filled red in the product, and it is still barred from validation, required marks, and emphasis. Red means *this destroys something*, in all three places it appears.

### Loading State

The builder is client-only (it restores a local draft during its first render, which a prerendered page would contradict at hydration), so `BuilderLoader.tsx` shows a skeleton first. The skeleton is the real emerald header bar at its true height with the mark in place, plus one line of Bengali status text carrying `role="status"` — not a spinner and not a grey block. The header does not move when the app arrives, so the load reads as the page filling in rather than swapping.

**The One Mark Rule.** Every surface wears the same header identity: the `icon.svg` mark beside the wordmark **BiyerBiodata**, white on `chrome-emerald`. The builder previously called itself "Biodata Builder" and dropped the mark entirely, so entering the tool silently renamed the product. A surface may change what sits to the *right* of the mark — the guides offer a CTA, the builder offers document actions — but never the mark itself.

Because the skeleton and the live header both render that mark, the two must stay byte-identical. A skeleton that differs from the component it precedes defeats its own purpose: the user watches the title bar rewrite itself.

### Guide Pages

Four prerendered Bengali guides at the site root — `patrir-biodata`, `patror-biodata`, `muslim-biodata`, `hindu-biodata` — each explaining a biodata format and offering a worked sample. Content lives in `lib/landingPages.ts`; `landing/PageShell.tsx` supplies the chrome.

This is the product's **third mode**. The landing page persuades and the builder operates; these read. That changes what wins: comprehension outranks conversion, so the measure is capped at `max-w-3xl` (768px) rather than the 1024px the marketing header uses, body copy runs at 16–18px with relaxed leading instead of the interface's 14px, and headings step up to 30–36px. A single emerald CTA sits after the introduction and is not repeated between every section.

- **Shell:** the emerald header bar from the landing page, with the wordmark left and one white inverse CTA right; a `surface-workspace` footer carrying the guide links and attribution.
- **Wayfinding:** a text breadcrumb above the `h1` in `ink-muted`, since these pages are entered from search rather than from the site.
- **Prose:** `ink-body` at `leading-relaxed`, section headings at 20px/700 in `ink-strong`. No cards, no callout boxes, no icons — the clerical register holds here too.

**The Read Mode Rule.** A guide is not a landing page with an article in it. One CTA, one column, generous measure, and no persuasion furniture — no badge rows, no repeated conversion blocks, no testimonial strips. Someone arrived with a question; answer it, then offer the tool once.

### Share Card

One 1200 × 630 card for the whole site, `public/og-card.png`, drawn from `scripts/opengraph-image.html` and wired up through `OG_IMAGE` in `lib/site.ts`. Emerald ground, the letterhead mark and wordmark at the top, a Bengali headline, a supporting line in `rule-emerald`, and a hairline over a facts row in `edge-emerald`.

**It is a rendered image, not a live route, and Satori is why.** `next/og` has no Indic shaper: it lays Bengali codepoints out in logical order, so the i-kar in "বিয়ের" renders after its consonant instead of before it, যুক্তাক্ষর never form, and unattached matras come out as dotted circles. Shipping more font does not help — the glyphs were always present; the reordering is what is missing. A browser has HarfBuzz, so the card is rendered once by headless Chrome and committed. Regenerating is one command, in a comment at the top of the template.

**Its type sizes are deliberately off the ramp** — 30 / 78 / 32 / 26px. The ramp in this document governs surfaces that reflow next to each other at shared breakpoints; a share card is a fixed canvas, usually seen as a thumbnail in a chat list, and it needs sizes that survive being shown at a third of its true dimensions. Read them as this one surface's own scale, not as new global steps.

**The Repeat The Image Rule.** Every route that sets `openGraph` must also set `images: [OG_IMAGE]`. Next merges metadata shallowly, so a segment defining `openGraph` replaces its parent's entire object — which is how `/builder` and all four guides came to ship `twitter:card="summary_large_image"` with no image behind it, losing the card on exactly the pages that get forwarded. The card also lives in `public/` rather than under the `opengraph-image` file convention, because the convention injects a competing entry that outranks the root layout's and carries no alt text.

### The Document Row

The signature component and the smallest meaningful unit of the record. Two variants:

- **Row** — one label, one value. Label at 11px/600–700 in the template's ink, fixed 115–120px wide, non-shrinking; value at 11px/400 in `ink-body`, flowing. 2–3px vertical padding.
- **TwoCol** — two label/value pairs on one line, for short paired facts (Height/Weight, Complexion/Blood Group). First label 115–120px, first value 125–130px, second label 100–110px, second value flowing. The second pair is omitted entirely when its value is empty, and the whole row disappears when both are.

Every row self-suppresses on empty input — `if (!value) return null`. Sections do the same via explicit `has*` guards. An incomplete biodata produces a shorter document, never a document with blanks.

**TwoCol is not universal.** Panel and Compact render a paired row as two consecutive single lines, because neither has room for four cells: Compact's column is 90mm, and Panel's body is two different widths — ~472px beside the float and ~684px below it, so one row type would read as two different rows down a single page. Both halves still print. Which cells a line has is an arrangement decision and belongs to the voice; *whether the field appears* is not, and belongs to `documentContent.ts`.

Note that `Row`, `TwoCol`, and `Section` are **redeclared privately inside each template file**, not imported from a shared module. That is deliberate under the eight-voices doctrine below: a template that wants a sidebar, a two-column body, or a different row anatomy changes its own copies and touches nothing else.

What *is* shared is `preview/kit.tsx`, holding exactly two components: `<Photo>`, which owns `.photo-frame`, `object-fit: cover` and the alt-text convention, and `<Ornament>`, which owns `aria-hidden` and the three-glyph repeat. These are the record's obligations rather than a voice's decisions, and the case for sharing them is concrete: in one session the photo-clipping fix had to be applied in four separate files, `.sheet-frame` in five, and Classic's section heading had silently drifted to a `<div>` while the other three used `<h3>`. At eight templates every such fix doubles. Sizing, rounding, ring colour and placement still arrive from the template — the kit carries no visual decision, exactly as `preview/headings.ts` carries none.

### Named Rules

**The Four Voices Rule.** Each template is an independent design, not a recolor. It may reinvent its layout completely — sidebar, split columns, banner header, repositioned photo — and it owns its own row and section primitives. What it inherits and may not change: the 190mm frame with its 277mm floor, the full field vocabulary and its order of meaning, the 11px type floor (Compact excepted, above), the heading levels it is handed, and the flat-paper rule. Eight voices, one set of obligations.

The name is kept for the rule it names, not for the count. There are eight templates now, and the first four proved the point badly — every one of them was a single column with a different ink, an ornament row over a centred title over label/value rows, which is a skin and not a voice. The four that followed took the right the rule had always granted: **Panel** floats a coloured sidebar and lets sections wrap around it, **Compact** flows the whole record through two columns, **Banner** runs a full-bleed header and drops the frame, and **Plain** removes the ornament as well. A ninth voice should differ in shape, not in hue.

*(The "one-page budget" was listed here as an inherited obligation long after The Clean Break Rule retired it. It is gone; the 277mm floor is a minimum, not a ceiling.)*

**The Content Parity Rule.** Every template renders every field the data model can hold. A template may arrange the record differently; it may never drop a field that another template shows. Someone choosing a look must never lose information by choosing it.

**The Single Content Source Rule.** Content Parity is enforced mechanically, not by discipline. `src/lib/documentContent.ts` decides which sections and rows exist, in what order, with what wording, and prunes anything empty. Templates receive that list and render it in their own visual language — they choose typography, rules, ornament, and spacing, and they choose nothing about *what is said*. The earlier hand-copied approach is exactly how `hometown` went missing from Elegant alone. A new field is added in one file or it is not added.

**The One Line Per Person Rule.** A sibling prints as a single line — *"Tanvir Karim — Elder Brother, Married, Banker (spouse: Schoolteacher), Chattogram"* — not a six-field block. It holds the fixed-column grid, keeps the clerical register, and costs one line per person instead of six. Only the first sibling row carries the "Brothers / Sisters" label; the rest align under it.

### The Document Section

A heading plus its rows, 12px above the previous section, flush at the top of the page. Each template renders the heading differently — Classic fills a solid band, Elegant brackets it in gold rules, Modern underlines it in violet, Royal marks it with a glyph and a fading rule, Panel and Banner underline it in their own ink at 20%, Compact underlines it in amber inside a 90mm column, and Plain gives it no rule at all and lets space do the work — but all eight use the same 10px uppercase wide-tracked label type and all eight wrap the identical row set.

**The Borrowed Outline Rule.** A biodata has real internal structure and its section headings are headings, but the document cannot know how deep it sits — so it is handed its levels rather than choosing them. `docHeadings(level)` in `preview/headings.ts` resolves title / name / section to `h2`–`h4` when the sheet is a top-level region (the builder) and `h3`–`h5` when it is nested inside a section that already owns an `h2` (a guide's worked example). Templates previously hard-coded an `h1` for the document title, which put a second `h1` on all four prerendered guide pages and folded the sample's internals into the page outline.

This one helper is shared rather than redeclared per template, unlike `Row` and `Section`. The Four Voices Rule gives a template its own *visual* primitives; it does not give it its own document outline, any more than it gives it its own field list. Semantics sit with `documentContent.ts`, not with the ink — which is also why Classic's section band, formerly a bare `div`, is now a heading like every other template's. `preview/kit.tsx` was added on the same reasoning: a photo's alt text and an ornament's `aria-hidden` are semantics, not ink.

## Do's and Don'ts

### Do:

- **Do** keep the two palettes separate. Emerald for chrome, template ink for documents. See The Two Palettes Rule.
- **Do** set document body copy at 11px and section headings at 10px uppercase with 0.12–0.15em tracking. See The 11px Record Rule.
- **Do** use fixed pixel widths for document label columns so rows align down the page.
- **Do** color the label and leave the value neutral in every document row.
- **Do** self-suppress empty rows and empty sections rather than rendering blank fields or placeholder dashes.
- **Do** hold new document work to a 190mm column, and give every section and row `break-inside-avoid` so pagination never splits a heading from its rows. See The Clean Break Rule.
- **Do** add new document fields to `documentContent.ts`, never to a template. See The Single Content Source Rule.
- **Do** design a new template as its own voice — new ink, new border language, new glyph, and above all a genuinely different composition. Shape is what distinguishes a ninth template; the inks are already crowded. See The Four Voices Rule and The Show What Differs Rule.
- **Do** take a new template's `<Photo>` and `<Ornament>` from `preview/kit.tsx`, and give it one of the five `layout` names so the chooser can draw it.
- **Do** render every field in every template, whatever the layout. See The Content Parity Rule.
- **Do** keep the 2px `focus-emerald` focus ring on every field, and keep the border-to-transparent swap so focus never shifts layout.
- **Do** mark anything that must not print with `print:hidden`, and verify a real print preview before shipping any document change.
- **Do** transition background color only on hover; 150ms, no movement.

### Don't:

- **Don't** put a shadow inside the A4 frame. See The Flat Paper Rule.
- **Don't** add a dark theme. This is a paper-first product — the document is always white paper, and dark chrome around white paper reads as broken. Light only.
- **Don't** let it become matrimonial-site kitsch: no pink/gold gradients, no floral corner clipart, no diya, mandala, or paisley fills, no script or display fonts. The three-dingbat ornament row is the ceiling for decoration.
- **Don't** let it become a generic SaaS landing page: no purple-to-blue hero gradients, no floating 3D screenshots, no "Trusted by 10,000+" badge rows, no gradient text. The landing hero's `paper-emerald`-to-white wash is the only gradient permitted in the chrome.
- **Don't** let it become a résumé template. No skill bars, no progress rings, no timeline rails, no rating dots, no scoring. Fields are stated as facts for a family to read, never visualized.
- **Don't** introduce a second font family, in either world.
- **Don't** uppercase anything that isn't a section heading.
- **Don't** use red for validation, required marks, or emphasis. See The Rare Red Rule.
- **Don't** add outlined buttons. Secondary means a tinted `paper-emerald` surface, not a border.
- **Don't** make the document responsive. It reflows for nobody.
- **Don't** copy Modern's 8px document radius into a new template — it is that template's identity, not a system default.
