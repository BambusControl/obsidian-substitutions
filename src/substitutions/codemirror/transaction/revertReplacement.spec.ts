import {EditorSelection, EditorState, Transaction, TransactionSpec} from "@codemirror/state";
import {effects} from "../constants/Effects";
import {textSubstitutionsField} from "../extension/textSubstitutionsField";
import {replaceText} from "./replaceText";
import {revertReplacement} from "./revertReplacement";
import {EditorTextReplacement} from "../../../libraries/types/textReplacement";

describe("revertReplacement", () => {

    const field = textSubstitutionsField([]);

    /* The record as replaceText announces it for a swap abc -> 123 applied
     * before the cursor in "x 123 y": the last substituted character sits at 4. */
    const REPLACEMENT: EditorTextReplacement = {
        from: "abc",
        to: "123",
        endPosition: 4,
    };

    function stateSeeded(doc: string, cursor: number, replacement: EditorTextReplacement = REPLACEMENT): EditorState {
        let state = EditorState.create({doc: doc, extensions: [field], selection: {anchor: cursor}});

        state = state.update({effects: [effects.replace.of(replacement)]}).state;

        return state;
    }

    function stateAfterSwap(doc: string, cursor: number): EditorState {
        let state = EditorState.create({doc: doc, extensions: [field], selection: {anchor: cursor}});

        state = state.update(replaceText(state, "abc", "123")).state;

        return state;
    }

    function performBackspace(state: EditorState): Transaction {
        return state.update({
            changes: {from: state.selection.main.head - 1, to: state.selection.main.head},
            selection: EditorSelection.cursor(state.selection.main.head - 1),
        });
    }

    function trackedReplacement(state: EditorState): EditorTextReplacement {
        const replacement = state.field(field).replacement;
        if (replacement == null) {
            throw new Error("expected a tracked replacement");
        }

        return replacement;
    }

    it("restores the source over the shortened replacement", () => {
        const swapped = stateAfterSwap("x abc y", 5);
        const backspaceTransaction = performBackspace(swapped);

        const revert = revertReplacement(backspaceTransaction, trackedReplacement(swapped));
        expect(revert).not.toBeNull();

        const reverted = backspaceTransaction.state.update(revert as TransactionSpec).state;
        expect(reverted.doc.toString()).toBe("x abc y");
        expect(reverted.selection.main.head).toBe(5);
        expect(reverted.field(field).replacement).toBeNull();
    });

    it("clears the tracked replacement and refreshes the cache", () => {
        const swapped = stateAfterSwap("x abc y", 5);
        const backspaceTransaction = performBackspace(swapped);

        const revert = revertReplacement(backspaceTransaction, trackedReplacement(swapped));
        expect(revert).not.toBeNull();

        const reverted = backspaceTransaction.state.update(revert as TransactionSpec);
        expect(reverted.effects.some((effect) => effect.is(effects.revert))).toBe(true);
        expect(reverted.effects.some((effect) => effect.is(effects.update))).toBe(true);
    });

    it("does not revert when the cursor was not at the end of the replacement", () => {
        let state = stateAfterSwap("x abc y", 5);
        state = state.update({changes: {from: 5, to: 5, insert: "z"}, selection: EditorSelection.cursor(6)}).state;
        const backspaceTransaction = performBackspace(state);

        expect(revertReplacement(backspaceTransaction, trackedReplacement(state))).toBeNull();
    });

    it("does not revert when the selection was not empty", () => {
        const state = stateSeeded("x 123 y", 5).update({selection: EditorSelection.range(2, 5)}).state;
        const transaction = state.update({changes: {from: 2, to: 5}, selection: EditorSelection.cursor(2)});

        expect(revertReplacement(transaction, trackedReplacement(state))).toBeNull();
    });

    it("does not revert when the text no longer matches the replacement", () => {
        const state = stateSeeded("x 1q3 y", 5);
        const backspaceTransaction = performBackspace(state);

        expect(revertReplacement(backspaceTransaction, trackedReplacement(state))).toBeNull();
    });

    it("does not revert an empty replacement", () => {
        const state = stateSeeded("x ab y", 5, {from: "abc", to: "", endPosition: 4});
        const backspaceTransaction = performBackspace(state);

        expect(revertReplacement(backspaceTransaction, trackedReplacement(state))).toBeNull();
    });
});
