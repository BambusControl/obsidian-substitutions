import {EditorView} from "@codemirror/view";
import {Extension, StateField} from "@codemirror/state";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {defaultState} from "../constants/defaultState";
import {replaceText} from "../transaction/replaceText";

export function characterInputHandler(
    substitutionField: StateField<SubstitutionState>
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

        const field = view.state.field(substitutionField, false) ?? defaultState();
        const targetString = (field.cache + text).slice(-field.length);

        const match = field.matches
            .find(m => targetString.endsWith(m.from));

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
