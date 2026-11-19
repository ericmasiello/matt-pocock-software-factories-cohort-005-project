export type NoteDraftStatus = "empty" | "saved" | "unsaved";

export type NoteDraft = {
  length: number;
  limit: number;
  tooLong: boolean;
  status: NoteDraftStatus;
  canSave: boolean;
};

export function describeDraft(
  draft: string,
  savedBody: string,
  limit: number
): NoteDraft {
  const tooLong = draft.length > limit;
  const status: NoteDraftStatus =
    draft !== savedBody ? "unsaved" : savedBody === "" ? "empty" : "saved";
  // The save action rejects a blank body, so a blank draft cannot be saved.
  const blank = draft.trim() === "";

  return {
    length: draft.length,
    limit,
    tooLong,
    status,
    canSave: status === "unsaved" && !blank && !tooLong,
  };
}
