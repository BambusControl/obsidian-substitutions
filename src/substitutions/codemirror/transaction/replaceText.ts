import {EditorSelection, EditorState, TransactionSpec} from "@codemirror/state";
import {substitutionEffect} from "../constants/substitutionEffect";

export function replaceText(state: EditorState, source: string, replacement: string, backspace: boolean = false): TransactionSpec {
    const changes = state.changeByRange((cursor) => {

        /* When handling backspace revert, the backspace removes a character */
        const sourceLength = source.length - (backspace ? 1 : 0);

        /* Selection of the text to be replaced */
        const replacementRange = EditorSelection.range(
            cursor.anchor - sourceLength,
            cursor.head
        );

        /* After replacement, the cursor will be placed here */
        const newCursorPosition: number = replacementRange.from + replacement.length;
        const lastCharacterPosition: number = newCursorPosition - 1;

        console.info(
            "Replacing",
            `\n\t[${replacementRange.from}-${replacementRange.to}] ${JSON.stringify(source)}`,
            `\n\t[${replacementRange.from}-${lastCharacterPosition}] ${JSON.stringify(replacement)}`,
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
                substitutionEffect.update.of(null),
                substitutionEffect.substitute.of({
                    from: source,
                    to: replacement,
                    endPosition: lastCharacterPosition,
                }),
            ],
        };
    });

    return state.update(
        changes,
    );
}
