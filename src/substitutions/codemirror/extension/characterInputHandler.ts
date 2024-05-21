import {EditorView} from "@codemirror/view";
import {Extension, StateField} from "@codemirror/state";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {defaultState} from "../constants/defaultState";
import {sliceText} from "../../../libraries/helpers/sliceText";
import {recordText} from "../transaction/recordText";
import {replaceText} from "../transaction/replaceText";

export function characterInputHandler(
    substitutionField: StateField<SubstitutionState>
): Extension {
    return EditorView.inputHandler.of((view, from, to, text, insert) => {
        const viewReadyForInput = !(view.compositionStarted || view.state.readOnly);

        if (!viewReadyForInput) {
            return false;
        }

        console.assert(text.length === 1, "Registered more than one character, this shouldn't happen");

        const primarySelection = view.state.selection.main
        const multipleChars = text.length !== 1;
        const selectionMatch = from === primarySelection.from && to === primarySelection.to;

        if (multipleChars || !selectionMatch) {
            return false;
        }

        const field = view.state.field(substitutionField, false) ?? defaultState();
        const targetString = sliceText(field, text);

        const match = field.matches
            .find(m => targetString.endsWith(m.from));

        const transactions = match == null ? [
            insert(),
            recordText(view.state, text),
        ] : [
            replaceText(view.state, match.from, match.to),
        ];

        view.dispatch(...transactions);

        return true;
    });
}
