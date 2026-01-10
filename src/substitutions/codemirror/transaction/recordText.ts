import {EditorState, TransactionSpec} from "@codemirror/state";
import {effects} from "../constants/Effects";

export function recordText(state: EditorState): TransactionSpec {
    return state.update({
        effects: [
            effects.update.of(null),
        ],
    });
}
