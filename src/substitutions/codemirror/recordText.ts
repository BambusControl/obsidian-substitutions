import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";

import {effects} from "./effects";

export function recordText(state: EditorState, text: string): TransactionSpec {
    const cursorPosition = state.selection.main.head;

    return state.update({
        selection: EditorSelection.cursor(cursorPosition + 1),
        changes: [
            {
                insert: text,
                from: cursorPosition,
                to: cursorPosition,
            }
        ],
        userEvent: "input.type",
        effects: [
            effects.record.of(text),
        ],
    });
}
