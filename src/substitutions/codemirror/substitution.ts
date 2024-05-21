import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./characterInputHandler";
import {textSubstitutionField} from "./textSubstitutionField";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";

export function substitution(substitutionRecords: SubstitutionRecords): Extension {
    const textSubstitution = textSubstitutionField(substitutionRecords);

    return [
        textSubstitution,
        characterInputHandler(textSubstitution),
    ];
}
