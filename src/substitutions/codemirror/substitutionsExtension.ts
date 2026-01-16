import {Extension} from "@codemirror/state";
import {characterInputHandler} from "./extension/characterInputHandler";
import {backwardDeleteHandler} from "./extension/backwardDeleteHandler";
import {textSubstitutionsField} from "./extension/textSubstitutionsField";
import {stateUpdater} from "./extension/stateUpdater";
import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";
import {REGEX_LITERAL_PATTERN} from "../../libraries/helpers/createRegex";
import {Notice} from "obsidian";

export function substitutionsExtension(savedSwaps: SavedSwapDefinition[]): Extension {
    const enabledSwaps = savedSwaps
        .filter(swap => swap.enabled)
        .sort((a, b) => a.id - b.id);

    /* Duplicate detection since we  */
    const invalidRegExPatterns = enabledSwaps
        .filter(swap => swap.kind === "regex" && !REGEX_LITERAL_PATTERN.test(swap.source))
        .map(swap => swap.source);

    const validEnabledSwaps = enabledSwaps
        .filter(swap => swap.kind !== "regex" || REGEX_LITERAL_PATTERN.test(swap.source));

    if (invalidRegExPatterns.length > 0) {
        new Notice(
            `Substitutions plugin detected invalid Regular Expression patterns (${invalidRegExPatterns.length})` +
            `which will be ignored.` +
            `\nYou can fix them within the settings menu.`,
            5 * 10000,
        )
    }

    const textSubstitutions = textSubstitutionsField(validEnabledSwaps);

    return [
        textSubstitutions,
        stateUpdater(),
        characterInputHandler(textSubstitutions),
        backwardDeleteHandler(textSubstitutions),
    ];
}
