import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {characterDeleteHandler} from "./extension/characterDeleteHandler";
import {textSubstitutionField} from "./extension/textSubstitutionField";
import {otherUserEventHandler} from "./extension/otherUserEventHandler";

export function substitution(substitutionRecords: SubstitutionRecords): Extension {
    const textSubstitution = textSubstitutionField(substitutionRecords);

    return [
        textSubstitution,
        otherUserEventHandler(),
        characterInputHandler(textSubstitution),
        characterDeleteHandler(textSubstitution),
    ];
}
