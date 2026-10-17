import {EditorState} from "@codemirror/state";
import {textSubstitutionsField} from "./textSubstitutionsField";
import {effects} from "../constants/Effects";

describe("textSubstitutionsField", () => {
    it("remaps replacement position when text changes before it", () => {
        const field = textSubstitutionsField([]);
        let state = EditorState.create({
            doc: "line one\nline two",
            extensions: [field],
        });

        state = state.update({
            effects: [
                effects.replace.of({
                    from: "abc",
                    to: "123",
                    endPosition: 12,
                }),
            ],
        }).state;

        state = state.update({
            changes: {
                from: 0,
                to: 0,
                insert: "more ",
            },
        }).state;

        expect(state.field(field).replacement?.endPosition).toBe(17);
    });
});
