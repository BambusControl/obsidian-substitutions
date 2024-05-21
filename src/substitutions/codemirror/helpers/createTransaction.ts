import {EditorState, StateField, TransactionSpec} from "@codemirror/state";
import {recordText} from "./text/recordText";
import {replaceText} from "./text/replaceText";
import {defaultState} from "../constants/defaultState";
import {SubstitutionState} from "../type/substitutionState";
import {sliceText} from "./text/sliceText";

export function createTransaction(
    state: EditorState,
    text: string,
    substitutionField: StateField<SubstitutionState>,
): TransactionSpec {
    const field = state.field(substitutionField, false) ?? defaultState();
    const targetString = sliceText(field, text);

    const match = field.matches
        .find(m => {
            const replme = targetString.endsWith(m.from);
            console.log(
                targetString,
                replme ? "(ends with)" : "x",
                m.from,
            )
            return replme
        });

    return match == null
        ? recordText(state, text)
        : replaceText(state, match.from, match.to);
}
