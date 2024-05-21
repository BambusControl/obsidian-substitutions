import {SubstitutionState} from "../types/substitutionState";

export function sliceText(
    field: SubstitutionState,
    newCharacter: string,
): string {
    return (field.cache + newCharacter).slice(-field.length)
}
