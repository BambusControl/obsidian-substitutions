import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../constants/substitutionEffect";

export function replaceText(state: EditorState, source: string, replacement: string): TransactionSpec {
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
                substitutionEffect.substitute.of({
                    from: source,
                    to: replacement,
                    endPosition: replacementCursor.to - 1,
                }),
            ],
        }
    })

    return state.update(
        changes,
        {
            scrollIntoView: true,
        }
    );
}
