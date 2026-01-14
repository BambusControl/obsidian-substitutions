import {EditorView} from "@codemirror/view";
import {Extension, StateField} from "@codemirror/state";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {defaultState} from "../constants/defaultState";
import {replaceText} from "../transaction/replaceText";
import {matchSwapToText} from "./matchSwapToText";

export function characterInputHandler(
    substitutionField: StateField<SubstitutionsState>
): Extension {
    /* This has to be an inputHandler for it to be able to replace text */
    return EditorView.inputHandler.of((view, from, to, text, insert) => {
        const viewReadyForInput = !(view.compositionStarted || view.state.readOnly);

        if (!viewReadyForInput) {
            return false;
        }

        console.assert(text.length === 1, "Registered more than one character, this shouldn't happen");

        const primarySelection = view.state.selection.main;
        const multipleChars = text.length !== 1;
        const selectionMatch = from === primarySelection.from && to === primarySelection.to;
        if (multipleChars || !selectionMatch) {
            return false;
        }

        /*
        * The state handler gives us the last `length` characters at the current cursor
        * We append the just-typed character to check if it will match a substitution record
        */
        const field = view.state.field(substitutionField, false) ?? defaultState();
        const targetString = (field.cache + text)
        const match = field.swaps
            .map(swap => matchSwapToText(targetString, swap))
            .find(m => m != null);

        if (match == null) {
            return false;
        }

        // Run the default behaviour before we do anything to update the state
        view.dispatch(insert());

        /* The recording of the typed character is already handled in the stateUpdater */
        const transaction = replaceText(view.state, match.from, match.to);
        view.dispatch(transaction);

        return true;
    });
}
