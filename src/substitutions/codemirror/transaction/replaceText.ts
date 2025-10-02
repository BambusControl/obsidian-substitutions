import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../constants/substitutionEffect";

export function replaceText(state: EditorState, source: string, replacement: string): TransactionSpec {
    const changes = state.changeByRange((cursor) => {

        /* Selection of the text to be replaced */
        const replacementRange = EditorSelection.range(
            cursor.anchor - (source.length - 1),
            cursor.head
        );

        /* After replacement, the cursor will be placed here */
        const newCursorPosition: number = replacementRange.from + replacement.length;

        console.info(
            "Replacing",
            `\n\t[${replacementRange.from}-${replacementRange.to}] ${JSON.stringify(source)}`,
            `\n\t[${replacementRange.from}-${newCursorPosition - 1}] ${JSON.stringify(replacement)}`,
            `\nCursor moved from ${cursor.from} to ${newCursorPosition}`
        );

        return {
            range: EditorSelection.cursor(newCursorPosition),
            changes: [
                {
                    insert: replacement,
                    from: replacementRange.from,
                    to: replacementRange.to,
                },
            ],
            effects: [
                substitutionEffect.substitute.of({
                    from: source,
                    to: replacement,
                    endPosition: newCursorPosition - 1,
                }),
            ],
        };
    });

    return state.update(
        changes,
    );
}
