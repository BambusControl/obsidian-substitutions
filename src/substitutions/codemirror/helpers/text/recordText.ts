import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../../constants/substitutionEffect";

export function recordText(state: EditorState, text: string): TransactionSpec {
    const cursorPosition = state.selection.main.head;

    return state.update({
        /* Without this the typed character isn't inserted into the document */
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
            substitutionEffect.record.of(text),
        ],
    });
}
