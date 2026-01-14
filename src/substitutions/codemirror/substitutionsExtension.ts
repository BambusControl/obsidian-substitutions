import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {backwardDeleteHandler} from "./extension/backwardDeleteHandler";
import {textSubstitutionsField} from "./extension/textSubstitutionsField";
import {stateUpdater} from "./extension/stateUpdater";
import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";

export function substitutionsExtension(savedSwaps: SavedSwapDefinition[]): Extension {
    const enabledSwaps = savedSwaps.filter(swap => swap.enabled).sort((a, b) => a.id - b.id);
    const textSubstitutions = textSubstitutionsField(enabledSwaps);

    return [
        textSubstitutions,
        stateUpdater(),
        characterInputHandler(textSubstitutions),
        backwardDeleteHandler(textSubstitutions),
    ];
}
