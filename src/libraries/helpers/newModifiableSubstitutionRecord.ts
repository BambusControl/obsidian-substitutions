import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {Action} from "../types/savedata/action";

export function newModifiableSubstitutionRecord(): ModifiableSubstitutionRecord {
    return {
        ...{
            from: "",
            to: "",
            enabled: true,
        },
        ...{
            id: -1,
            action: Action.Create,
        }
    };
}
