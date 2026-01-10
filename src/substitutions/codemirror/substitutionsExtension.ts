import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {SwapDef} from "../../libraries/types/savedata/swapDef";
import {backwardDeleteHandler} from "./extension/backwardDeleteHandler";
import {textSubstitutionsField} from "./extension/textSubstitutionsField";
import {stateUpdater} from "./extension/stateUpdater";

export function substitutionsExtension(swapDefinitions: SwapDef[]): Extension {
    const textSubstitutions = textSubstitutionsField(swapDefinitions);

    return [
        textSubstitutions,
        stateUpdater(),
        characterInputHandler(textSubstitutions),
        backwardDeleteHandler(textSubstitutions),
    ];
}
