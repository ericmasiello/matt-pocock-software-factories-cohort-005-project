import { MAX_NOTE_LENGTH } from "~/lib/notes";
import { describeDraft, type NoteDraft } from "./lib/draft";

export type { NoteDraft, NoteDraftStatus } from "./lib/draft";

/**
 * What the note editor shows for the text in the box, compared with the
 * note the Student last saved (`""` when there is none).
 */
export function describeNoteDraft(
  draft: string,
  savedBody: string,
  limit: number = MAX_NOTE_LENGTH
): NoteDraft {
  return describeDraft(draft, savedBody, limit);
}
