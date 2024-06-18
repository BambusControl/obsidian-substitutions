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

        const state = view.state;
        const selection = state.selection.main;

        if (selection.from !== selection.to) {
            return;
        }

        const cursorPos = selection.to;
        const field = state.field(substitutionField, false) ?? defaultState();
        const lastSubPos = field.substitution?.endPosition;

        if (field.substitution == null || cursorPos !== lastSubPos) {
            return;
        }

        const revertText = replaceText(state, field.substitution.to, field.substitution.from);
        const revertEffect = state.update({
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
