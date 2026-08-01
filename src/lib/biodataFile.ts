import {
  BiodataFormData,
  BiodataMeta,
  CandidateKind,
  CANDIDATE_KINDS,
  DocumentLanguage,
  DOCUMENT_LANGUAGES,
  emptySibling,
  initialBiodata,
  Sibling,
} from "@/types/biodata";

export const FILE_FORMAT = "biyerbiodata";
export const FILE_VERSION = 3;

export interface BiodataEnvelope {
  format: typeof FILE_FORMAT;
  version: number;
  exportedAt: string;
  data: BiodataFormData;
}

export type ParseResult =
  | { ok: true; data: BiodataFormData; warning?: string }
  | { ok: false; error: string };

/**
 * Serialize a biodata draft into a portable, versioned envelope.
 *
 * The envelope is not ceremony: without `format` and `version`, a future field
 * rename would import silently as a half-empty biodata with no error shown.
 */
export function serializeBiodata(
  data: BiodataFormData,
  exportedAt: string = new Date().toISOString(),
): string {
  const envelope: BiodataEnvelope = {
    format: FILE_FORMAT,
    version: FILE_VERSION,
    exportedAt,
    data,
  };
  return JSON.stringify(envelope, null, 2) + "\n";
}

/** A filename that is recognisable in a downloads folder a year from now. */
export function exportFilename(data: BiodataFormData, today: string): string {
  const name = data.personal.fullName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `biodata-${name || "draft"}-${today}.json`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return null;
}

function coerceSiblings(value: unknown): Sibling[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).map((raw) => {
    const sibling: Sibling = { ...emptySibling };
    for (const key of Object.keys(sibling) as (keyof Sibling)[]) {
      const next = asString(raw[key]);
      if (next !== null) sibling[key] = next;
    }
    return sibling;
  });
}

/**
 * `meta` is the one section whose fields are closed sets rather than free text.
 *
 * Everywhere else an unrecognised string is harmless — it just prints. Here it
 * would be a `documentLanguage` of "fr" reaching `docString`, which resolves to
 * undefined and renders a document of blank labels. Anything not on the list
 * falls back to the default rather than being trusted.
 */
function coerceMeta(incoming: unknown): BiodataMeta {
  const meta: BiodataMeta = { ...initialBiodata.meta };
  if (!isRecord(incoming)) return meta;

  const kind = asString(incoming.candidateKind);
  if (kind && (CANDIDATE_KINDS as string[]).includes(kind)) {
    meta.candidateKind = kind as CandidateKind;
  }

  const lang = asString(incoming.documentLanguage);
  if (lang && (DOCUMENT_LANGUAGES as string[]).includes(lang)) {
    meta.documentLanguage = lang as DocumentLanguage;
  }

  return meta;
}

/**
 * Merge an untrusted payload over the canonical shape.
 *
 * Only keys that exist in `initialBiodata` survive, and only string-ish values
 * are taken, so an old export missing new fields, a newer one carrying unknown
 * fields, and a hand-edited file with a number in it all import cleanly
 * instead of corrupting form state.
 */
function coerce(payload: unknown): BiodataFormData {
  const result = JSON.parse(JSON.stringify(initialBiodata)) as BiodataFormData;
  if (!isRecord(payload)) return result;

  for (const sectionKey of Object.keys(result) as (keyof BiodataFormData)[]) {
    if (sectionKey === "meta") {
      result.meta = coerceMeta(payload.meta);
      continue;
    }

    const incoming = payload[sectionKey];
    if (!isRecord(incoming)) continue;

    const section = result[sectionKey] as unknown as Record<string, unknown>;
    for (const fieldKey of Object.keys(section)) {
      if (fieldKey === "siblings") {
        section[fieldKey] = coerceSiblings(incoming[fieldKey]);
        continue;
      }
      const next = asString(incoming[fieldKey]);
      if (next !== null) section[fieldKey] = next;
    }
  }

  return result;
}

/**
 * v1 → v2: `family.siblings` was a single free-text line, not a list.
 *
 * That text is a summary ("2 Younger Sisters – Students"), not a person, so
 * folding it into a Sibling row would mangle it. It moves to `siblingsNote`,
 * which still prints, and the itemised list starts empty.
 */
function migrateV1(payload: unknown): unknown {
  if (!isRecord(payload)) return payload;
  const family = payload.family;
  if (!isRecord(family)) return payload;
  if (typeof family.siblings !== "string") return payload;

  return {
    ...payload,
    family: {
      ...family,
      siblingsNote: family.siblings,
      siblings: [],
    },
  };
}

/**
 * v2 → v3: `meta` did not exist, so neither did Document Language.
 *
 * Migrated files get "en", not the new "bn" default. Every biodata written
 * before this field existed was printed in English, and an import is not the
 * moment to silently re-language someone's document — the new default is for
 * new biodatas only.
 */
function migrateV2(payload: unknown): unknown {
  if (!isRecord(payload)) return payload;

  return {
    ...payload,
    meta: {
      candidateKind: "unspecified",
      documentLanguage: "en",
      ...(isRecord(payload.meta) ? payload.meta : {}),
    },
  };
}

export function parseBiodata(text: string): ParseResult {
  if (!text.trim()) {
    return { ok: false, error: "Nothing to import — paste your biodata file first." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: "That doesn't look like a biodata file — make sure you copied all of it.",
    };
  }

  if (!isRecord(parsed) || parsed.format !== FILE_FORMAT) {
    return { ok: false, error: "This isn't a biodata export." };
  }

  const version = typeof parsed.version === "number" ? parsed.version : 0;

  let payload = parsed.data;
  if (version <= 1) payload = migrateV1(payload);
  if (version <= 2) payload = migrateV2(payload);

  const data = coerce(payload);

  if (version > FILE_VERSION) {
    return {
      ok: true,
      data,
      warning:
        "This file was made by a newer version of the app. It imported, but some fields may be missing.",
    };
  }

  if (version <= 1) {
    return {
      ok: true,
      data,
      warning:
        "Imported from an older version. Your brothers and sisters are in the summary line — you can now list them one by one.",
    };
  }

  return { ok: true, data };
}
