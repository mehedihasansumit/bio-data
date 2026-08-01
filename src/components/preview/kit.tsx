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
 * placement arrive as `className`/`style`, so adopting the kit changes no pixel
 * in any template.
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
 *    Everything inside `#biodata-preview` gets `overflow: visible !important` in
 *    print so a multi-page document is not silently truncated; the photo is the
 *    single exception, because Chrome paints the whole image at its natural
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
 * three-fold repeat lives here too, so a template cannot quietly print four.
 *
 * Plain passes no ornament at all and never renders this. The One Glyph Rule is
 * a ceiling on decoration, not a floor.
 */
export function Ornament({ glyph, className, style }: OrnamentProps) {
  return (
    <div aria-hidden="true" className={className} style={style}>
      {`${glyph} ${glyph} ${glyph}`}
    </div>
  );
}
