import {EditorState, TransactionSpec} from "@codemirror/state";
import {recordText} from "./text/recordText";
import {replaceText} from "./text/replaceText";
import {defaultState} from "../constants/defaultState";
import {textSubstitutionField} from "../textSubstitutionField";
import {substitutionValue} from "../constants/substitutionValue";
import {sliceText} from "./text/sliceText";
import {SubstitutionRecords} from "../../../libraries/types/savedata/substitutionRecords";

export function createTransaction(
    state: EditorState,
    text: string,
    substitutionRecords: SubstitutionRecords,
): TransactionSpec {
    const sfv = state.field(textSubstitutionField(substitutionRecords), false)
        ?? defaultState();

    const cache = sliceText(sfv.cache, text, sfv.length);

    return substitutionValue.from === cache
        ? replaceText(state, substitutionValue.from, substitutionValue.to)
        : recordText(state, text);
}
