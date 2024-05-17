import {SubstitutionRecord} from "../types/savedata/substitutionRecord";
import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {Action} from "../types/savedata/action";

export function toModifiable(value: SubstitutionRecord, index: number): ModifiableSubstitutionRecord {
    return {
        ...value,
        id: index,
        action: Action.None,
    };
}
