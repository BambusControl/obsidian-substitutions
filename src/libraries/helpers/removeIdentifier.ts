import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {SubstitutionRecord} from "../types/savedata/substitutionRecord";

export function removeIdentifier(value: ModifiableSubstitutionRecord): SubstitutionRecord {
    return {
        from: value.from,
        to: value.to,
        enabled: value.enabled
    }
}
