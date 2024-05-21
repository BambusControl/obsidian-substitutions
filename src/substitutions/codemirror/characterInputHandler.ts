import {EditorView} from "@codemirror/view";
import {createTransaction} from "./helpers/createTransaction";
import {Extension, StateField} from "@codemirror/state";
import {SubstitutionState} from "./type/substitutionState";

export function characterInputHandler(
    substitutionField: StateField<SubstitutionState>
): Extension {
    return EditorView.inputHandler.of((view, from, to, text) => {
        const viewReadyForInput = !(view.compositionStarted || view.state.readOnly);

        if (!viewReadyForInput) {
            return false;
        }

        console.assert(text.length === 1, text);
        const primarySelection = view.state.selection.main

        const multipleChars = text.length !== 1;
        const selectionMatch = from === primarySelection.from && to === primarySelection.to;

        if (multipleChars || !selectionMatch) {
            return false;
        }

        const transaction = createTransaction(view.state, text, substitutionField);
        view.dispatch(transaction);

        return true;
    });
}
