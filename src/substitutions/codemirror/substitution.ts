import {EditorSelection, EditorState, Extension, MapMode, StateEffect, TransactionSpec} from "@codemirror/state";
import {EditorView} from "@codemirror/view"

export function substitution(): Extension {
    return [
        inputHandler,
    ]
}

const inputHandler = EditorView.inputHandler.of((view, from, to, text, getTx) => {
    const viewReadyForInput = !(view.compositionStarted || view.state.readOnly);

    if (!viewReadyForInput) {
        return false;
    }

    console.assert(text.length === 1, text);
    const primarySelection = view.state.selection.main

    const multipleChars = text.length !== 1;
    const selectionMatch = from === primarySelection.from && to === primarySelection.to;

    if (multipleChars || !selectionMatch) {
        return false;
    }

    /* TODO: State Logic */
    cac = (cac + text).slice(-3);
    console.log("Process:", text, "; Cache:", cac)

    if (SUBS.from !== cac) {
        console.log(SUBS.from, " !== ", cac)
        return false;
    }

    view.dispatch(
        replaceText(view.state, SUBS.from, SUBS.to)
    )

    return true;
})

function replaceText(state: EditorState, source: string, replacement: string): TransactionSpec {
    const changes = state.changeByRange((range) => {
        const tlen = source.length - 1;

        const replacementRange = EditorSelection.range(range.anchor - tlen, range.head);

        const afterCursorPosition = replacementRange.head - tlen + 1;
        const afterRange = EditorSelection.range(afterCursorPosition, afterCursorPosition);

        console.log("Source:", range, "; Replacement:", replacementRange, "; After:", afterRange)

        return {
            range: afterRange,
            changes: [
                {
                    insert: replacement,
                    from: replacementRange.from,
                    to: replacementRange.to,
                },
            ],
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

// const closeBracketEffect = () => StateEffect.define<number>({
//     map(value, mapping) {
//         let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter)
//         return mapped == null ? undefined : mapped
//     }
// })

let cac = ""

const SUBS = {
    from: "-->",
    to: "→",
    // from: "(r)",
    // to: "→",
}
