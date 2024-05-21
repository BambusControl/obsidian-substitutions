import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../../constants/substitutionEffect";
import * as repl from "node:repl";

export function replaceText(state: EditorState, source: string, replacement: string): TransactionSpec {
    /* TODO: replacement doesn't place the cursor well when "capital" was typed */
    const changes = state.changeByRange((range) => {
        const sourceRange = EditorSelection.range(
            range.anchor - (source.length - 1),
            range.head
        );

        const replacementCursor = EditorSelection.cursor(sourceRange.anchor + replacement.length);

        return {
            range: replacementCursor,
            changes: [
                {
                    insert: replacement,
                    from: sourceRange.from,
                    to: sourceRange.to,
                },
            ],
            effects: [
                substitutionEffect.replace.of({
                    from: source,
                    to: replacement,
                }),
            ]
        }
    })

    return state.update(
        changes,
        {
            scrollIntoView: true,
        }
    );
}
