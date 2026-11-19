import { describe, it, expect } from "vitest";
import { describeNoteDraft } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("describeNoteDraft", () => {
  it("is empty and unsaveable before the Student writes anything", () => {
    expect(describeNoteDraft("", "")).toEqual({
      length: 0,
      limit: MAX_NOTE_LENGTH,
      tooLong: false,
      status: "empty",
      canSave: false,
    });
  });

  it("is unsaved and saveable once the Student types a new note", () => {
    const draft = describeNoteDraft("Narrow with `in`", "");
    expect(draft.status).toBe("unsaved");
    expect(draft.canSave).toBe(true);
    expect(draft.length).toBe(16);
  });

  it("is saved and not saveable again when the box matches the saved note", () => {
    const draft = describeNoteDraft("Result types", "Result types");
    expect(draft.status).toBe("saved");
    expect(draft.canSave).toBe(false);
  });

  it("is unsaved when the Student edits a saved note", () => {
    const draft = describeNoteDraft("Result types!", "Result types");
    expect(draft.status).toBe("unsaved");
    expect(draft.canSave).toBe(true);
  });

  it("cannot save a blank draft, since the save action rejects it", () => {
    const draft = describeNoteDraft("   \n", "Result types");
    expect(draft.status).toBe("unsaved");
    expect(draft.canSave).toBe(false);
  });

  it("allows a draft exactly at the limit", () => {
    const draft = describeNoteDraft("abcde", "", 5);
    expect(draft.tooLong).toBe(false);
    expect(draft.canSave).toBe(true);
  });

  it("flags a draft over the limit and refuses to save it", () => {
    const draft = describeNoteDraft("abcdef", "", 5);
    expect(draft).toMatchObject({ length: 6, limit: 5, tooLong: true });
    expect(draft.canSave).toBe(false);
  });

  it("defaults the limit to the note length the server accepts", () => {
    const draft = describeNoteDraft("x".repeat(MAX_NOTE_LENGTH + 1), "");
    expect(draft.tooLong).toBe(true);
  });
});
