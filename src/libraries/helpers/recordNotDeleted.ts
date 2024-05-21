import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {Action} from "../types/savedata/action";

export function recordNotDeleted(record: ModifiableSubstitutionRecord): boolean {
    return record.action != Action.Delete
}
