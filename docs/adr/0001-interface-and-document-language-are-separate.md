---
status: accepted
---

# Interface Language and Document Language are separate concepts

The product is Bengali-first for the Bangladeshi market, but "make it Bengali" turned
out to mean two unrelated things: the language the builder speaks to the person filling
in the form, and the language the finished Biodata is printed in. We are modelling them
as two independent concepts rather than one site-wide locale, because they want opposite
answers — the builder is better bilingual, and the document must never be.

## Considered Options

**One site-wide locale.** The obvious approach, and what a reader will assume we did. It
forces the builder and the document to agree, which is wrong in both directions: an urban
Dhaka user who knows the English field names is slowed down by a Bengali-only form, while
a formal document that labels every one of its ~40 rows twice reads as an untranslated
template rather than a considered artifact.

**Bengali everywhere.** Simplest, and the strongest fit for the mass market — but it
forfeits families who specifically want an English biodata for overseas or
corporate-professional matches, which is a real and well-paying segment.

## Consequences

Document Language is stored per Biodata, not per user and not in the URL. It is a property
of the artifact, so an exported and re-imported Biodata keeps the language it was authored
in, and one person can produce both an English and a Bengali version of themselves.

Template headings stop being string literals and become lookups keyed on Document Language.
This is the expensive half of the decision and the reason it is hard to reverse: all four
templates and every section heading are affected.

Marketing routes stay monolingual Bengali at the root. Because Document Language lives
inside the app rather than in the URL, the site needs no `[locale]` segment, no hreflang,
and no duplicated content set — the two audiences are served by one page describing a
product feature, rather than by two translations of one page.
