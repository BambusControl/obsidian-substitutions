import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";

import {substitutionEffect} from "../constants/substitutionEffect";

export function replaceText(state: EditorState, source: string, replacement: string): TransactionSpec {
    const changes = state.changeByRange((range) => {
        const textLength = source.length - 1;
        const replacementRange = EditorSelection.range(range.anchor - textLength, range.head);

        const afterCursorPosition = replacementRange.head - textLength + 1;
        const afterRange = EditorSelection.range(afterCursorPosition, afterCursorPosition);

        return {
            range: afterRange,
            changes: [
                {
                    insert: replacement,
                    from: replacementRange.from,
                    to: replacementRange.to,
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
            userEvent: "input.type"
        }
    );
}
