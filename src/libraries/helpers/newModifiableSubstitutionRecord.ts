import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {Action} from "../types/savedata/action";
import {SubstitutionRecord} from "../types/savedata/substitutionRecord";

export function newModifiableSubstitutionRecord(
    placeholder?: Partial<SubstitutionRecord>,
): ModifiableSubstitutionRecord {
    return {
        ...{
            from: "",
            to: "",
            enabled: true,
        },
        ...placeholder,
        ...{
            id: -1,
            action: Action.Create,
        }
    };
}
