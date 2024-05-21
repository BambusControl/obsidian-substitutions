import {Extension, StateField} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {substitutionEffect} from "../constants/substitutionEffect";
import {defaultState} from "../constants/defaultState";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {replaceText} from "../transaction/replaceText";

export function characterDeleteHandler(
    substitutionField: StateField<SubstitutionState>
): Extension {
    return EditorView.updateListener.of((view) => {
        const backspace = view.transactions.some(t => t.isUserEvent("delete.backward"))

        if (!backspace) {
            return;
        }

        const field = view.state.field(substitutionField, false) ?? defaultState();

        if (field.substitution == null) {
            return;
        }

        const revertText = replaceText(view.state, field.substitution.to, field.substitution.from);
        const revertEffect = view.state.update({
            effects: [
                substitutionEffect.revert.of(null),
            ]
        })

        view.view.dispatch(
            revertText,
            revertEffect,
        );
    });
}
