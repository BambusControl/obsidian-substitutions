import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {backwardDeleteHandler} from "./extension/backwardDeleteHandler";
import {textSubstitutionField} from "./extension/textSubstitutionField";
import {stateUpdater} from "./extension/stateUpdater";

export function substitution(substitutionRecords: SubstitutionRecords): Extension {
    const textSubstitution = textSubstitutionField(substitutionRecords);

    return [
        textSubstitution,
        stateUpdater(),
        characterInputHandler(textSubstitution),
        backwardDeleteHandler(textSubstitution),
    ];
}
