import {EditorState, TransactionSpec} from "@codemirror/state";
import {recordText} from "./recordText";
import {replaceText} from "./replaceText";
import {defaultState} from "./defaultState";
import {stateField} from "./stateField";
import {substitutionValue} from "./SubstitutionValue";

export function createTransaction(state: EditorState, text: string): TransactionSpec {
    const sfv = state.field(stateField, false) ?? defaultState();

    const cache = (sfv.cache + text).slice(-3);

    return substitutionValue.from === cache
        ? replaceText(state, substitutionValue.from, substitutionValue.to)
        : recordText(state, text);
}
