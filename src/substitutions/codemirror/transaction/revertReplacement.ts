import {EditorSelection, Transaction, TransactionSpec} from "@codemirror/state";
import {effects} from "../constants/Effects";
import {EditorTextReplacement} from "../../../libraries/types/textReplacement";

/**
 * Build the transaction that restores the replacement's source over what a
 * backspace left of it, or null when the backspace was not a revert.
 * The replacement record is read from the state before the backspace,
 * where it is still whole; the changes are computed against the state after it.
 */
export function revertReplacement(transaction: Transaction, replacement: EditorTextReplacement): TransactionSpec | null {
    if (replacement.to === "") {
        return null;
    }

    const startPosition = replacement.endPosition + 1 - replacement.to.length;
    if (startPosition < 0) {
        return null;
    }

    const selection = transaction.startState.selection.main;
    if (!selection.empty || selection.to !== replacement.endPosition + 1) {
        return null;
    }

    const swappedText = transaction.startState.sliceDoc(startPosition, replacement.endPosition + 1);
    if (swappedText !== replacement.to) {
        return null;
    }

    const from = transaction.changes.mapPos(startPosition);
    const to = transaction.changes.mapPos(replacement.endPosition);

    return {
        changes: {from: from, to: to, insert: replacement.from},
        selection: EditorSelection.cursor(from + replacement.from.length),
        effects: [effects.update.of(null), effects.revert.of(null)],
    };
}
