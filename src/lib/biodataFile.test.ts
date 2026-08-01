import { describe, expect, it } from "vitest";
import {
  BiodataFormData,
  emptySibling,
  initialBiodata,
  sampleBiodata,
} from "@/types/biodata";
import {
  exportFilename,
  FILE_FORMAT,
  FILE_VERSION,
  parseBiodata,
  serializeBiodata,
} from "@/lib/biodataFile";
import { isBiodataEmpty } from "@/lib/utils";

const AT = "2026-08-01T00:00:00.000Z";

describe("serializeBiodata", () => {
  it("wraps the draft in a versioned envelope", () => {
    const envelope = JSON.parse(serializeBiodata(sampleBiodata, AT));
    expect(envelope.format).toBe(FILE_FORMAT);
    expect(envelope.version).toBe(FILE_VERSION);
    expect(envelope.exportedAt).toBe(AT);
    expect(envelope.data).toEqual(sampleBiodata);
  });
});

describe("round trip", () => {
  it("returns exactly what went in", () => {
    const result = parseBiodata(serializeBiodata(sampleBiodata, AT));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual(sampleBiodata);
  });

  it("survives an empty draft", () => {
    const result = parseBiodata(serializeBiodata(initialBiodata, AT));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual(initialBiodata);
  });
});

describe("parseBiodata rejects bad input", () => {
  it("rejects empty text", () => {
    const result = parseBiodata("   ");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/Nothing to import/);
  });

  it("rejects malformed JSON", () => {
    const result = parseBiodata('{"format":"biyerbiodata",');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/doesn't look like a biodata file/);
  });

  it("rejects valid JSON that is not an envelope", () => {
    const result = parseBiodata('{"hello":"world"}');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/isn't a biodata export/);
  });

  it("rejects a JSON array", () => {
    expect(parseBiodata("[1,2,3]").ok).toBe(false);
  });

  it("rejects a bare biodata object with no envelope", () => {
    expect(parseBiodata(JSON.stringify(sampleBiodata)).ok).toBe(false);
  });
});

describe("parseBiodata tolerates schema drift", () => {
  const envelope = (data: unknown, version = 1) =>
    JSON.stringify({ format: FILE_FORMAT, version, exportedAt: AT, data });

  it("fills missing fields from the canonical shape", () => {
    const result = parseBiodata(
      envelope({ personal: { fullName: "Rafiul Karim" } }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.personal.fullName).toBe("Rafiul Karim");
    // Everything not supplied falls back rather than becoming undefined.
    expect(result.data.personal.height).toBe("");
    expect(result.data.contact.phone).toBe("");
    expect(Object.keys(result.data).sort()).toEqual(Object.keys(initialBiodata).sort());
  });

  it("drops unknown sections and unknown fields", () => {
    const result = parseBiodata(
      envelope({
        personal: { fullName: "A", favouriteColour: "green" },
        astrology: { rashi: "Mesh" },
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data).not.toHaveProperty("astrology");
    expect(result.data.personal).not.toHaveProperty("favouriteColour");
    expect(result.data.personal.fullName).toBe("A");
  });

  it("coerces numbers and booleans to strings", () => {
    const result = parseBiodata(envelope({ personal: { age: 29, fullName: true } }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.personal.age).toBe("29");
    expect(result.data.personal.fullName).toBe("true");
  });

  it("ignores non-string junk like objects and null", () => {
    const result = parseBiodata(
      envelope({ personal: { fullName: { nested: 1 }, height: null } }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.personal.fullName).toBe("");
    expect(result.data.personal.height).toBe("");
  });

  it("warns but still imports a newer version", () => {
    const result = parseBiodata(envelope({ personal: { fullName: "B" } }, 99));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.warning).toMatch(/newer version/);
    expect(result.data.personal.fullName).toBe("B");
  });

  it("accepts a missing data payload without throwing", () => {
    const result = parseBiodata(
      JSON.stringify({ format: FILE_FORMAT, version: 1, exportedAt: AT }),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual(initialBiodata);
  });

  it("does not mutate initialBiodata across calls", () => {
    parseBiodata(envelope({ personal: { fullName: "Mutator" } }));
    expect(initialBiodata.personal.fullName).toBe("");
  });
});

describe("siblings array", () => {
  const envelope = (data: unknown, version = 2) =>
    JSON.stringify({ format: FILE_FORMAT, version, exportedAt: AT, data });

  it("round trips itemised siblings", () => {
    const result = parseBiodata(serializeBiodata(sampleBiodata, AT));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblings).toHaveLength(2);
    expect(result.data.family.siblings[0].occupation).toBe("Banker");
    expect(result.data.family.siblings[1].relation).toBe("Sister");
  });

  it("fills missing sibling fields from the empty template", () => {
    const result = parseBiodata(envelope({ family: { siblings: [{ name: "Tanvir" }] } }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblings[0]).toEqual({
      ...emptySibling,
      name: "Tanvir",
    });
  });

  it("drops non-object entries and unknown sibling keys", () => {
    const result = parseBiodata(
      envelope({ family: { siblings: ["nope", 42, null, { name: "A", nickname: "B" }] } }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblings).toHaveLength(1);
    expect(result.data.family.siblings[0]).not.toHaveProperty("nickname");
  });

  it("treats a non-array siblings value as no siblings", () => {
    const result = parseBiodata(envelope({ family: { siblings: { name: "A" } } }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.family.siblings).toEqual([]);
  });
});

describe("v1 → v2 migration", () => {
  const v1 = (family: Record<string, unknown>) =>
    JSON.stringify({
      format: FILE_FORMAT,
      version: 1,
      exportedAt: AT,
      data: { family },
    });

  it("moves the old siblings string into siblingsNote without losing it", () => {
    const result = parseBiodata(v1({ siblings: "2 Younger Sisters – Students" }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblingsNote).toBe("2 Younger Sisters – Students");
    expect(result.data.family.siblings).toEqual([]);
    expect(result.warning).toMatch(/older version/);
  });

  it("keeps other v1 family fields intact", () => {
    const result = parseBiodata(
      v1({ siblings: "One brother", fatherName: "Abdul Karim" }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.fatherName).toBe("Abdul Karim");
    expect(result.data.family.siblingsNote).toBe("One brother");
  });

  it("handles a v1 file with no siblings key at all", () => {
    const result = parseBiodata(v1({ fatherName: "Abdul Karim" }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblingsNote).toBe("");
    expect(result.data.family.siblings).toEqual([]);
  });

  it("does not run the migration on a v2 file", () => {
    const result = parseBiodata(
      JSON.stringify({
        format: FILE_FORMAT,
        version: 2,
        exportedAt: AT,
        data: { family: { siblings: [{ name: "Tanvir" }], siblingsNote: "kept" } },
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblings).toHaveLength(1);
    expect(result.data.family.siblingsNote).toBe("kept");
    expect(result.warning).toBeUndefined();
  });
});

describe("v2 → v3 migration", () => {
  const v2 = (data: unknown) =>
    JSON.stringify({ format: FILE_FORMAT, version: 2, exportedAt: AT, data });

  it("gives a pre-meta file an English document, not the new Bengali default", () => {
    // Every biodata written before Document Language existed was printed in
    // English. An import is not the moment to silently re-language someone's
    // document, so the new default applies to new biodatas only.
    const result = parseBiodata(v2({ personal: { fullName: "Rafiul Karim" } }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.meta.documentLanguage).toBe("en");
    expect(initialBiodata.meta.documentLanguage).toBe("bn");
  });

  it("leaves the Candidate Kind unspecified rather than guessing", () => {
    const result = parseBiodata(v2({ personal: { fullName: "Rafiul Karim" } }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.meta.candidateKind).toBe("unspecified");
  });

  it("migrates silently — nothing the author sees has changed", () => {
    const result = parseBiodata(v2({ personal: { fullName: "A" } }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.warning).toBeUndefined();
  });

  it("carries a v1 file all the way to v3", () => {
    const result = parseBiodata(
      JSON.stringify({
        format: FILE_FORMAT,
        version: 1,
        exportedAt: AT,
        data: { family: { siblings: "One brother" } },
      }),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.family.siblingsNote).toBe("One brother");
    expect(result.data.meta.documentLanguage).toBe("en");
  });
});

describe("meta is a closed set, unlike every other field", () => {
  const v3 = (meta: unknown) =>
    JSON.stringify({
      format: FILE_FORMAT,
      version: 3,
      exportedAt: AT,
      data: { meta },
    });

  it("round trips valid values", () => {
    const result = parseBiodata(v3({ candidateKind: "bride", documentLanguage: "en" }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.meta).toEqual({ candidateKind: "bride", documentLanguage: "en" });
  });

  it("falls back rather than trusting an unknown language", () => {
    // "fr" would reach docString, resolve to undefined, and print a document
    // of blank labels. Anywhere else an unrecognised string is harmless.
    const result = parseBiodata(v3({ documentLanguage: "fr" }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.meta.documentLanguage).toBe("bn");
  });

  it("falls back rather than trusting an unknown candidate kind", () => {
    const result = parseBiodata(v3({ candidateKind: "spouse" }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.meta.candidateKind).toBe("unspecified");
  });

  it("survives meta being junk", () => {
    for (const junk of [null, "bn", 42, ["bn"]]) {
      const result = parseBiodata(v3(junk));
      expect(result.ok).toBe(true);
      if (result.ok) expect(result.data.meta).toEqual(initialBiodata.meta);
    }
  });
});

describe("isBiodataEmpty with siblings", () => {
  it("treats a draft whose only content is a sibling as non-empty", () => {
    const data = {
      ...initialBiodata,
      family: {
        ...initialBiodata.family,
        siblings: [{ ...emptySibling, name: "Tanvir" }],
      },
    };
    expect(isBiodataEmpty(data)).toBe(false);
  });

  it("treats blank sibling rows as still empty", () => {
    const data = {
      ...initialBiodata,
      family: { ...initialBiodata.family, siblings: [{ ...emptySibling }] },
    };
    expect(isBiodataEmpty(data)).toBe(true);
  });
});

describe("exportFilename", () => {
  const withName = (fullName: string): BiodataFormData => ({
    ...initialBiodata,
    personal: { ...initialBiodata.personal, fullName },
  });

  it("slugifies the full name", () => {
    expect(exportFilename(withName("Rafiul Karim"), "2026-08-01")).toBe(
      "biodata-rafiul-karim-2026-08-01.json",
    );
  });

  it("falls back when there is no name", () => {
    expect(exportFilename(withName(""), "2026-08-01")).toBe("biodata-draft-2026-08-01.json");
  });

  it("does not leave stray separators for punctuation or non-Latin names", () => {
    expect(exportFilename(withName("  Md. Rafiul  Karim!! "), "2026-08-01")).toBe(
      "biodata-md-rafiul-karim-2026-08-01.json",
    );
    expect(exportFilename(withName("মেহেদী হাসান"), "2026-08-01")).toBe(
      "biodata-draft-2026-08-01.json",
    );
  });
});
