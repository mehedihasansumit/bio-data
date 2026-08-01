/**
 * The document's heading levels, resolved from where the document is embedded.
 *
 * A biodata is a record with real internal structure — nine sections a screen
 * reader should be able to jump between — so its headings are headings. But it
 * is also a thing rendered *inside* other pages, and it cannot know its own
 * depth: in the builder the sheet is a top-level region beside the form, while
 * on a guide page it sits inside a "নমুনা" section that already owns an `h2`.
 *
 * Rendering a fixed `h1` for the document title, as every template used to,
 * put a second `h1` on all four prerendered guide pages and folded the sample
 * record's internals into the page outline. The level travels with the render
 * instead, so the document contributes a well-formed subtree wherever it lands.
 *
 * This is shared rather than redeclared per template, unlike `Row`/`Section`.
 * The Four Voices Rule gives a template its own visual primitives; it does not
 * give it its own document outline, any more than it gives it its own field
 * list. Semantics belong with `documentContent.ts`, not with the ink.
 */
export type HeadingTag = "h2" | "h3" | "h4" | "h5";

export interface DocHeadings {
  /** The document's self-declaration — "পাত্রীর বায়োডাটা". */
  Title: HeadingTag;
  /** The candidate's name. */
  Name: HeadingTag;
  /** A section heading — "ব্যক্তিগত তথ্য". */
  Section: HeadingTag;
}

/**
 * `2` when the document is a top-level region (the builder's preview column).
 * `3` when it is nested inside a section that already has an `h2` (a guide's
 * worked example).
 */
export type DocHeadingLevel = 2 | 3;

/** Written out rather than computed, so both supported embeddings are legible. */
export function docHeadings(level: DocHeadingLevel): DocHeadings {
  return level === 2
    ? { Title: "h2", Name: "h3", Section: "h4" }
    : { Title: "h3", Name: "h4", Section: "h5" };
}
