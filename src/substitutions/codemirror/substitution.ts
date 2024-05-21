import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./characterInputHandler";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {characterDeleteHandler} from "./characterDeleteHandler";
import {textSubstitutionField} from "./textSubstitutionField";

export function substitution(substitutionRecords: SubstitutionRecords): Extension {
    const textSubstitution = textSubstitutionField(substitutionRecords);

    return [
        textSubstitution,
        characterInputHandler(textSubstitution),
        characterDeleteHandler(textSubstitution),
    ];
}
