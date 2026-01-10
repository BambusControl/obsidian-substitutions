import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {SubstitutionRecord} from "../../libraries/types/savedata/substitutionRecord";
import {backwardDeleteHandler} from "./extension/backwardDeleteHandler";
import {textSubstitutionField} from "./extension/textSubstitutionField";
import {stateUpdater} from "./extension/stateUpdater";

export function substitution(substitutionRecords: SubstitutionRecord[]): Extension {
    const textSubstitution = textSubstitutionField(substitutionRecords);

    return [
        textSubstitution,
        stateUpdater(),
        characterInputHandler(textSubstitution),
        backwardDeleteHandler(textSubstitution),
    ];
}
