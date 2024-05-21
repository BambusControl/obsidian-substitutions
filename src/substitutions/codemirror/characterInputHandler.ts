import {EditorView} from "@codemirror/view";
import {createTransaction} from "./helpers/createTransaction";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {Extension} from "@codemirror/state";

export function characterInputHandler(
    substitutionRecords: SubstitutionRecords
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

    const transaction = createTransaction(view.state, text, substitutionRecords);
    view.dispatch(transaction);

    return true;
});
}
