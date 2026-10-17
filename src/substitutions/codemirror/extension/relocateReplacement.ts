import {Transaction} from "@codemirror/state";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";

/**
 * Keep the last replacement anchored to the text it replaced as the document shifts around it.
 * Once that text is altered, drop the record: a swap that can no longer be found cannot be undone.
 */
export function relocateReplacement(transaction: Transaction, state: SubstitutionsState): SubstitutionsState {
    if (!transaction.docChanged || state.replacement == null) {
        return state;
    }

    const leftOfInserted = -1;
    const endPosition = transaction.changes.mapPos(state.replacement.endPosition, leftOfInserted);
    const startPosition = endPosition + 1 - state.replacement.to.length;

    const swappedText = startPosition >= 0
        ? transaction.state.sliceDoc(startPosition, endPosition + 1)
        : null;

    const replacement = swappedText === state.replacement.to
        ? {...state.replacement, endPosition: endPosition}
        : null

    return {
        ...state,
        replacement: replacement,
    };
}
