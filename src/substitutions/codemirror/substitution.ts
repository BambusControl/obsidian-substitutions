import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {characterDeleteHandler} from "./extension/characterDeleteHandler";
import {textSubstitutionField} from "./extension/textSubstitutionField";

export function substitution(substitutionRecords: SubstitutionRecords): Extension {
    const textSubstitution = textSubstitutionField(substitutionRecords);

    return [
        textSubstitution,
        characterInputHandler(textSubstitution),
        characterDeleteHandler(textSubstitution),
    ];
}
