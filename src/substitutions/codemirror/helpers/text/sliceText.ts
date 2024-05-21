import {SubstitutionState} from "../../type/substitutionState";

export function sliceText(
    field: SubstitutionState,
    newCharacter: string,
): string {
    return (field.cache + newCharacter).slice(-field.length)
}
