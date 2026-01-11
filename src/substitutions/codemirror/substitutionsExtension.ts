import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {PlainSwap, RegexSwap} from "../../libraries/types/savedata/swapDef";
import {backwardDeleteHandler} from "./extension/backwardDeleteHandler";
import {textSubstitutionsField} from "./extension/textSubstitutionsField";
import {stateUpdater} from "./extension/stateUpdater";

export function substitutionsExtension(plainSwaps: PlainSwap[], regexSwaps: RegexSwap[]): Extension {
    const textSubstitutions = textSubstitutionsField(plainSwaps, regexSwaps);

    return [
        textSubstitutions,
        stateUpdater(),
        characterInputHandler(textSubstitutions),
        backwardDeleteHandler(textSubstitutions),
    ];
}
