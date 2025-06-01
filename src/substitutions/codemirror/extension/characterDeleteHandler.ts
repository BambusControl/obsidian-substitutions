import {EditorState, Extension, StateField, TransactionSpec} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {substitutionEffect} from "../constants/substitutionEffect";
import {defaultState} from "../constants/defaultState";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {replaceText} from "../transaction/replaceText";
import {TextReplacement} from "../../../libraries/types/textReplacement";

export function characterDeleteHandler(
    substitutionField: StateField<SubstitutionState>
): Extension {
    return EditorView.updateListener.of((view) => {
        const backspace = view.transactions.some(t => t.isUserEvent("delete.backward"))

        if (!backspace) {
            return;
        }

        const state = view.state;
        const selection = state.selection.main;

        if (selection.from !== selection.to) {
            return;
        }

        const field = state.field(substitutionField, false) ?? defaultState();

        const transactions = selection.to === field.substitution?.endPosition
            ? revertSubstitution(state, field.substitution)
            : updateStateWithDelete(state);

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

function updateStateWithDelete(state: EditorState): TransactionSpec[] {
    return [
        state.update({
            effects: [
                substitutionEffect.update.of(null)
            ]
        })
    ];
}
