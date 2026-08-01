# BiyerBiodata

A tool for composing a **Biodata** — the formal one-page profile a family circulates
when arranging a marriage in Bangladesh and India. The product's job is to turn a
filled-in form into a document a family is willing to hand to strangers.

## Language

### The document

**Biodata** (বায়োডাটা):
The marriage profile itself — the artifact that gets printed, shared, and read by a
prospective family. Always the finished document, never the form used to make it.
_Avoid_: CV, resume, profile, bio

**Template**:
One of the fixed visual treatments a Biodata can be rendered in. A choice of
appearance only — it never changes which facts the Biodata contains.
_Avoid_: theme, design, style, skin

**Draft**:
An in-progress Biodata held on the person's own device, not yet a finished document.
_Avoid_: save, session, work-in-progress

### Language

Two distinct languages that the product must not conflate.

**Interface Language**:
The language the builder speaks to the person filling in the form — field labels,
buttons, help text. May be bilingual, because its only job is helping someone find
the right field quickly.
_Avoid_: UI language, app language, locale

**Document Language**:
The language a finished Biodata is printed in — its headings and field names. Chosen
per Biodata by the person creating it, because a family sending a profile to overseas
matches wants a different artifact than one matching locally. Never bilingual: a formal
document that labels every row twice reads as an untranslated template.
_Avoid_: output language, print language, export language

### Content

**Candidate**:
The person a Biodata is about. Distinct from whoever is filling in the form — a
parent or sibling very often composes the Biodata on the Candidate's behalf.
_Avoid_: user, subject, applicant, profile owner

**Candidate Kind**:
Whether the Candidate is a পাত্রী (bride) or a পাত্র (groom). Sets the document's
title and governs which conventions the Biodata follows.
_Avoid_: gender, sex, side, type

**Religion Kind**:
Which religion-specific field set a Biodata carries. Determines what may appear on the
document: a Muslim Biodata never shows gotra or rashi, and a Hindu one never shows
maslak. Showing both is clutter in one direction and offensive in the other.
_Avoid_: faith, religion type, denomination
