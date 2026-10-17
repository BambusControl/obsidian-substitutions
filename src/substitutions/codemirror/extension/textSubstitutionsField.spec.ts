import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {effects} from "../constants/Effects";
import {textSubstitutionsField} from "./textSubstitutionsField";
import {EditorTextReplacement} from "../../../libraries/types/textReplacement";

describe("textSubstitutionsField", () => {

    const field = textSubstitutionsField([]);

    /* Doc under test: "x 123 y". The replacement occupies [2,5) and its last
     * character "3" sits at 4 -- the endPosition replaceText records. */
    const REPLACEMENT: EditorTextReplacement = {
        from: "abc",
        to: "123",
        endPosition: 4,
    };

    /* Doc "x aaa y": the replacement occupies [2,5); after deleting the middle
     * "a" the remaining "aa" equals a shortened "aaa". */
    const LOOKALIKE_REPLACEMENT: EditorTextReplacement = {
        from: "ab",
        to: "aaa",
        endPosition: 4,
    };

    function stateWith(doc: string, replacement: EditorTextReplacement = REPLACEMENT): EditorState {
        let state = EditorState.create({doc: doc, extensions: [field]});

        state = state.update({effects: [effects.replace.of(replacement)]}).state;

        return state;
    }

    function afterEdit(state: EditorState, transaction: TransactionSpec): EditorState {
        return state.update(transaction).state;
    }

    function trackedReplacement(state: EditorState): EditorTextReplacement | null {
        return state.field(field).replacement;
    }

    describe("edits before the replacement", () => {

        it("shifts the tracked position after an insertion", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 0, to: 0, insert: "hello "}});

            expect(trackedReplacement(state)).toEqual({...REPLACEMENT, endPosition: 10});
        });

        it("shifts the tracked position after a deletion", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 0, to: 1}});

            expect(trackedReplacement(state)).toEqual({...REPLACEMENT, endPosition: 3});
        });

        it("keeps tracking when text is typed exactly before the replacement", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 2, to: 2, insert: "Q"}});

            expect(trackedReplacement(state)).toEqual({...REPLACEMENT, endPosition: 5});
        });
    });

    describe("edits after the replacement", () => {

        it("keeps the tracked position through an insertion", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 6, to: 6, insert: "!"}});

            expect(trackedReplacement(state)).toEqual(REPLACEMENT);
        });

        it("keeps the tracked position through a deletion", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 6, to: 7}});

            expect(trackedReplacement(state)).toEqual(REPLACEMENT);
        });

        it("keeps the tracked position when text is typed exactly after the replacement", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 5, to: 5, insert: "z"}});

            expect(trackedReplacement(state)).toEqual(REPLACEMENT);
        });
    });

    describe("edits inside the replacement", () => {

        it("forgets the replacement when text is inserted inside it", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 3, to: 3, insert: "X"}});

            expect(trackedReplacement(state)).toBeNull();
        });

        it("forgets the replacement when text inside it is deleted", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 3, to: 4}});

            expect(trackedReplacement(state)).toBeNull();
        });
    });

    describe("backspace removing the last character", () => {

        it("forgets the replacement when the backspace removes its last character", () => {
            const state = afterEdit(stateWith("x 123 y"), {
                changes: {from: 4, to: 5},
                selection: EditorSelection.cursor(4),
            });

            expect(trackedReplacement(state)).toBeNull();
        });

        it("forgets the replacement when the last character is replaced by other text", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 4, to: 5, insert: "Q"}});

            expect(trackedReplacement(state)).toBeNull();
        });

        it("forgets the replacement when an inner character is deleted, even when the rest looks like a shortened replacement", () => {
            const state = afterEdit(stateWith("x aaa y", LOOKALIKE_REPLACEMENT), {changes: {from: 3, to: 4}});

            expect(trackedReplacement(state)).toBeNull();
        });
    });

    describe("edits selecting part of the replacement", () => {

        it("forgets the replacement when part of it is deleted", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 3, to: 5}});

            expect(trackedReplacement(state)).toBeNull();
        });
    });

    describe("edits overwriting the replacement as a whole", () => {

        it("forgets the replacement when it is overwritten by other text", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 2, to: 5, insert: "Q"}});

            expect(trackedReplacement(state)).toBeNull();
        });

        it("forgets the replacement when it is overwritten with its own source", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 2, to: 5, insert: "abc"}});

            expect(trackedReplacement(state)).toBeNull();
        });

        it("forgets the replacement when a deletion covers it entirely", () => {
            const state = afterEdit(stateWith("x 123 y"), {changes: {from: 1, to: 6}});

            expect(trackedReplacement(state)).toBeNull();
        });
    });
});
