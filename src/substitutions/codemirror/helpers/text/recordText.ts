import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../../constants/substitutionEffect";

export function recordText(state: EditorState, text: string): TransactionSpec {
    return state.update({
        effects: [
            substitutionEffect.update.of(text),
        ],
    });
}
