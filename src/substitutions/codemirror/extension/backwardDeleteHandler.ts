import {Extension, StateField} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {revertReplacement} from "../transaction/revertReplacement";

export function backwardDeleteHandler(
    substitutionsField: StateField<SubstitutionsState>
): Extension {
    return EditorView.updateListener.of((view) => {
        const backspaceTransaction = view.transactions.find(t => t.isUserEvent("delete.backward") && t.docChanged);

        if (backspaceTransaction == null) {
            return;
        }

        const replacement = backspaceTransaction.startState.field(substitutionsField, false)?.replacement;
        if (replacement == null) {
            return;
        }

        const revert = revertReplacement(backspaceTransaction, replacement);
        if (revert != null) {
            view.view.dispatch(revert);
        }
    });
}
