import { describe, expect, it } from "vitest";
import {
  BiodataFormData,
  emptySibling,
  initialBiodata,
  sampleBiodata,
} from "@/types/biodata";
import { documentContent, headlineFacts } from "@/lib/documentContent";
import { formatSibling } from "@/lib/documentGuards";

const withPersonal = (patch: Partial<BiodataFormData["personal"]>): BiodataFormData => ({
  ...initialBiodata,
  personal: { ...initialBiodata.personal, ...patch },
});

const ids = (data: BiodataFormData) => documentContent(data).map((s) => s.id);

describe("documentContent pruning", () => {
  it("renders nothing for an empty biodata", () => {
    expect(documentContent(initialBiodata)).toEqual([]);
  });

  it("renders only the sections that have content", () => {
    expect(ids(withPersonal({ fullName: "Rafiul Karim" }))).toEqual(["personal"]);
  });

  it("drops rows whose values are blank", () => {
    const sections = documentContent(withPersonal({ fullName: "A" }));
    const rows = sections[0].rows;
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({ kind: "single", label: "Full Name", value: "A" });
  });

  it("never prints a label without its value", () => {
    // Only the right half is filled: the row must collapse rather than leave
    // "Height" dangling with nothing after it.
    const sections = documentContent(withPersonal({ weight: "66 kg" }));
    expect(sections[0].rows).toEqual([
      { kind: "single", label: "Weight", value: "66 kg" },
    ]);
  });

  it("collapses a pair to its left half when only that is filled", () => {
    const sections = documentContent(withPersonal({ height: "173 cm" }));
    expect(sections[0].rows).toEqual([
      { kind: "single", label: "Height", value: "173 cm" },
    ]);
  });

  it("keeps a pair intact when both halves are filled", () => {
    const sections = documentContent(withPersonal({ height: "173 cm", weight: "66 kg" }));
    expect(sections[0].rows).toEqual([
      { kind: "pair", l1: "Height", v1: "173 cm", l2: "Weight", v2: "66 kg" },
    ]);
  });

  it("leaves no empty label anywhere in a partially filled biodata", () => {
    const data = withPersonal({ fullName: "A", weight: "66 kg", bloodGroup: "O+" });
    for (const section of documentContent(data)) {
      for (const row of section.rows) {
        if (row.kind === "single") {
          expect(row.value).not.toBe("");
        } else {
          expect(row.v1).not.toBe("");
          expect(row.v2).not.toBe("");
        }
      }
    }
  });
});

describe("religion-conditional section", () => {
  const withReligion = (
    religion: string,
    religious: Partial<BiodataFormData["religious"]>,
  ): BiodataFormData => ({
    ...initialBiodata,
    personal: { ...initialBiodata.personal, religion },
    religious: { ...initialBiodata.religious, ...religious },
  });

  it("shows Hindu fields and titles the section for horoscope", () => {
    const sections = documentContent(withReligion("Hinduism", { gotra: "Kashyap" }));
    const religious = sections.find((s) => s.id === "religious");
    expect(religious?.title).toBe("Community & Horoscope");
    expect(JSON.stringify(religious)).toContain("Gotra");
    expect(JSON.stringify(religious)).not.toContain("Maslak");
  });

  it("shows Muslim fields and never Hindu ones", () => {
    const sections = documentContent(withReligion("Islam", { maslak: "Sunni" }));
    const religious = sections.find((s) => s.id === "religious");
    expect(religious?.title).toBe("Religious Details");
    expect(JSON.stringify(religious)).toContain("Maslak");
    expect(JSON.stringify(religious)).not.toContain("Gotra");
  });

  it("hides Hindu data entirely when the religion is Islam", () => {
    // Data left over from switching religion must not leak into the document.
    const sections = documentContent(withReligion("Islam", { gotra: "Kashyap" }));
    expect(sections.find((s) => s.id === "religious")).toBeUndefined();
  });

  it("shows no religious section when religion is unset", () => {
    expect(ids(withReligion("", { gotra: "Kashyap", maslak: "Sunni" }))).not.toContain("religious");
  });
});

describe("siblings in the document", () => {
  const withSiblings = (siblings: BiodataFormData["family"]["siblings"]): BiodataFormData => ({
    ...initialBiodata,
    family: { ...initialBiodata.family, siblings },
  });

  it("prints one line per sibling and labels only the first", () => {
    const data = withSiblings([
      { ...emptySibling, name: "Tanvir", relation: "Brother", order: "Elder", occupation: "Banker" },
      { ...emptySibling, name: "Nusrat", relation: "Sister", order: "Younger", occupation: "Student" },
    ]);
    const family = documentContent(data).find((s) => s.id === "family");
    expect(family?.rows).toHaveLength(2);
    expect(family?.rows[0]).toMatchObject({ label: "Brothers / Sisters" });
    expect(family?.rows[1]).toMatchObject({ label: "" });
  });

  it("skips blank sibling rows", () => {
    const data = withSiblings([{ ...emptySibling }, { ...emptySibling, name: "Tanvir" }]);
    const family = documentContent(data).find((s) => s.id === "family");
    expect(family?.rows).toHaveLength(1);
  });
});

describe("formatSibling", () => {
  it("reads as one clerical line", () => {
    expect(
      formatSibling({
        name: "Tanvir Karim",
        relation: "Brother",
        order: "Elder",
        maritalStatus: "Married",
        occupation: "Banker",
        spouseOccupation: "Schoolteacher",
        location: "Chattogram",
      }),
    ).toBe("Tanvir Karim — Elder Brother, Married, Banker (spouse: Schoolteacher), Chattogram");
  });

  it("omits the spouse clause when there is no spouse occupation", () => {
    expect(
      formatSibling({ ...emptySibling, name: "Nusrat", relation: "Sister", order: "Younger", occupation: "Student" }),
    ).toBe("Nusrat — Younger Sister, Student");
  });

  it("still reads sensibly with no name", () => {
    expect(formatSibling({ ...emptySibling, occupation: "Doctor" })).toBe("Younger Brother, Doctor");
  });
});

describe("headlineFacts", () => {
  it("lists only the facts that exist", () => {
    expect(headlineFacts(withPersonal({ age: "29", religion: "Islam" }))).toEqual([
      "29 Years",
      "Islam",
    ]);
  });

  it("strips the parenthetical from height", () => {
    expect(headlineFacts(withPersonal({ height: "5 ft 8 in (173 cm)" }))).toEqual(["5 ft 8 in"]);
  });
});

describe("the full sample", () => {
  it("produces every section", () => {
    expect(ids(sampleBiodata)).toEqual([
      "personal",
      "religious",
      "education",
      "career",
      "family",
      "address",
      "lifestyle",
      "partner",
      "contact",
    ]);
  });

  it("formats an education line with institution, year and result", () => {
    const education = documentContent(sampleBiodata).find((s) => s.id === "education");
    expect(education?.rows[0]).toEqual({
      kind: "single",
      label: "Master's",
      value: "M.Sc – Computer Science, Example University of Bangladesh (2022) — CGPA 3.71 / 4.00",
    });
  });
});
