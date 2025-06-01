import {EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../constants/substitutionEffect";

export function recordText(state: EditorState): TransactionSpec {
    return state.update({
        effects: [
            substitutionEffect.update.of(null),
        ],
    });
}
