import {EditorState, Extension, StateField, TransactionSpec} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {effects} from "../constants/Effects";
import {defaultState} from "../constants/defaultState";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {replaceText} from "../transaction/replaceText";
import {TextReplacement} from "../../../libraries/types/textReplacement";

export function backwardDeleteHandler(
    substitutionsField: StateField<SubstitutionsState>
): Extension {
    return EditorView.updateListener.of((view) => {
        const is_backspace = view.transactions.some(t => t.isUserEvent("delete.backward"));

        if (!is_backspace) {
            return;
        }

        const state = view.state;
        const selection = state.selection.main;
        const field = state.field(substitutionsField, false) ?? defaultState();

        if (selection.to !== field.replacement?.endPosition) {
            /* Backspace doesn't match position of last substitution: NOOP */
            return;
        }

        const transactions = revertReplacement(state, field.replacement);
        view.view.dispatch(...transactions);
    });
}

function revertReplacement(state: EditorState, replacement: TextReplacement): TransactionSpec[] {
    /* We could revert of any saved substitution record
     * if we detect revert matches the same way as forward matches.
     * (check the target string with "to" instead of "from")
     * For now, we only revert the last substitution.
     */

    const revertText = replaceText(state, replacement.to, replacement.from, true);
    const revertEffect = state.update({
        effects: [
            effects.revert.of(null),
        ]
    });

    return [revertText, revertEffect];
}
