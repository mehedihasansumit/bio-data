# Biodata Export / Import — Design

**Date:** 2026-08-01
**Status:** Implemented

## Problem

The project author's real biodata was shipped as `sampleBiodata` and was therefore the
default state of the deployed builder. That was removed as a P0 privacy defect. The author
still wants to reload their own data on any device, in a way nobody else can.

## Constraint that decides the design

The app is a fully static, client-side Next.js site. **Anything in the bundle is public.**
A passphrase prompt in React over plaintext data is security theatre: the data is readable
via devtools, view-source, or by fetching the chunk directly.

Two designs survive that constraint:

- **A — Encrypted blob committed, unlocked with a passphrase.** AES-GCM-256 + PBKDF2-SHA256.
  Real security, but the ciphertext is permanently public (bundle and git history), safety
  rests entirely on passphrase strength, there is no revocation, and every data change
  requires re-encrypt and redeploy.
- **B — Nothing sensitive in the repo; the user carries the data.** Generic export/import;
  the data lives in the user's password manager.

**Chosen: B.** In A the user carries a secret (the passphrase) in a password manager in order
to unlock public ciphertext. In B they carry the data in the same password manager. Same
secret store, same devices — but B has no permanently public artifact, no brute-force
surface, no crypto to get subtly wrong, and no redeploy on every edit. A's only advantage is
typing a word instead of pasting a blob. B is also a real feature for every user, not just
the author.

## Components

### `src/lib/biodataFile.ts` — pure, no React, no DOM

- `serializeBiodata(data, exportedAt?)` → versioned envelope
  `{ format: "biyerbiodata", version: 1, exportedAt, data }`, pretty-printed.
- `parseBiodata(text)` → `{ ok: true, data, warning? } | { ok: false, error }`. Never throws.
- `exportFilename(data, today)` → `biodata-<slug>-<date>.json`.

The envelope is load-bearing: without `format`/`version`, a future field rename would import
silently as a half-empty biodata with no error.

`parseBiodata` merges the payload over `initialBiodata`, keeping only keys that exist in the
canonical shape and only string-ish values. An old export missing new fields, a newer export
carrying unknown fields, and a hand-edited file containing a number all import cleanly rather
than corrupting form state. A `version` above the current one imports with a warning rather
than failing.

### `src/components/ui/DataTransfer.tsx` — UI

Collapsed disclosure below the form card, outside the tabpanel so it is reachable from every
tab. Closed by default; it is an occasional action and must not compete with Previous/Next.

- Export: "Copy biodata" (primary — the password-manager path) and "Download file".
- Import: "Open a file" and a paste textarea with "Restore from text".

### Wiring

`BuilderClient` passes `data` and an `onImport` that sets state and returns to the Personal
tab. Existing autosave then persists it; no new storage path is introduced.

## Error handling

All inline, `role="alert"` on failure and `role="status"` on success. No native dialogs, with
one exception: importing over a non-empty form asks for confirmation, because import is
destructive.

| Case | Behaviour |
|---|---|
| Empty input | "Nothing to import — paste your biodata file first." |
| Malformed JSON | "That doesn't look like a biodata file — make sure you copied all of it." |
| Valid JSON, wrong envelope | "This isn't a biodata export." |
| `version` > 1 | Imports, with a warning that some fields may be missing |
| Clipboard unavailable | Falls back to filling and selecting the textarea for manual copy |
| Unreadable file | "That file could not be read. Try pasting instead." |

The clipboard fallback is not hypothetical: `navigator.clipboard` is unavailable on
non-HTTPS origins and when permission is denied.

## Testing

Vitest (`node` environment; nothing under test touches the DOM). 18 tests over
`biodataFile.ts`: round trip, malformed input, non-envelope JSON, arrays, bare biodata
objects, missing fields, unknown sections and fields, number/boolean coercion, null and
nested-object junk, version drift, missing payload, non-mutation of `initialBiodata`, and
filename slugification including punctuation and non-Latin names.

The recovered personal export was additionally verified end-to-end through the real parser
(49 fields, no warning) with a temporary test that was removed afterwards.

## Consequences

- **The Local Data Rule** added to DESIGN.md: no personal data in the repo or bundle, ever.
- The author's recovered biodata lives at `~/biyerbiodata-my-data.json`, outside the repo.
  It is to be moved into a password manager and the file deleted.
- Git history still contains the original PII in commit `04d9b95`. Removing it requires a
  history rewrite and force-push; not done, and out of scope for this change.
