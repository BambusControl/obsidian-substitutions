import {EditorView} from "@codemirror/view";

import {createTransaction} from "./createTransaction";

export const inputHandler = EditorView.inputHandler.of(handler)

function handler(view: EditorView, from: number, to: number, text: string) {
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

    console.log("Before", view.state)
    const transaction = createTransaction(view.state, text);
    console.log("After", transaction)

    view.dispatch(transaction);

    return true;
}
