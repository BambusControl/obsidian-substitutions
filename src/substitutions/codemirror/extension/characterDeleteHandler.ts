import {EditorState, Extension, StateField, TransactionSpec} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {substitutionEffect} from "../constants/substitutionEffect";
import {defaultState} from "../constants/defaultState";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {replaceText} from "../transaction/replaceText";
import {TextReplacement} from "../../../libraries/types/textReplacement";
import {recordText} from "../transaction/recordText";

export function characterDeleteHandler(
    substitutionField: StateField<SubstitutionState>
): Extension {
    return EditorView.updateListener.of((view) => {
        const is_delete = view.transactions.some(t => t.isUserEvent("delete"));
        const is_backspace = view.transactions.some(t => t.isUserEvent("delete.backward"));

        if (!is_delete) {
            return;
        }

        const state = view.state;

        if (is_delete && !is_backspace) {
            view.view.dispatch(recordText(state))
            return;
        }

        const selection = state.selection.main;

        if (selection.from !== selection.to) {
            return;
        }

        const field = state.field(substitutionField, false) ?? defaultState();

        const transactions = selection.to === field.substitution?.endPosition
            ? revertSubstitution(state, field.substitution)
            : [recordText(state)];

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
