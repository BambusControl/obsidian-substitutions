import {EditorState, Extension, StateField, TransactionSpec} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {substitutionEffect} from "../constants/substitutionEffect";
import {defaultState} from "../constants/defaultState";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {replaceText} from "../transaction/replaceText";
import {TextReplacement} from "../../../libraries/types/textReplacement";

export function backwardDeleteHandler(
    substitutionField: StateField<SubstitutionState>
): Extension {
    return EditorView.updateListener.of((view) => {
        const is_backspace = view.transactions.some(t => t.isUserEvent("delete.backward"));

        if (!is_backspace) {
            return;
        }

        const state = view.state;
        const selection = state.selection.main;
        const field = state.field(substitutionField, false) ?? defaultState();

        if (selection.to !== field.substitution?.endPosition) {
            /* Backspace doesn't match position of last substitution: NOOP */
            return;
        }

        const transactions = revertSubstitution(state, field.substitution);
        view.view.dispatch(...transactions);
    });
}

function revertSubstitution(state: EditorState, replacement: TextReplacement): TransactionSpec[] {
    /* We could revert of any saved substitution record
     * if we detect revert matches the same way as forward matches.
     * (check the target string with "to" instead of "from")
     * For now, we only revert the last substitution.
     */

    const revertText = replaceText(state, replacement.to, replacement.from);
    const revertEffect = state.update({
        effects: [
            substitutionEffect.revert.of(null),
        ]
    });

    return [revertText, revertEffect];
}
