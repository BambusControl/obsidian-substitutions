import {EditorView} from "@codemirror/view"
import {
    codePointAt,
    codePointSize,
    EditorState,
    Extension,
    RangeSet,
    RangeValue,
    StateField,
    Transaction,
    StateEffect,
    MapMode,
} from "@codemirror/state"

export function bracketMe(): Extension {
    return [
        inputHandler,
        bracketState
    ];
}

const inputHandler = EditorView.inputHandler.of((view, from, to, insert) => {
    /* Go over easy inputs we don't wish to handle */
    if (view.compositionStarted || view.state.readOnly) {
        return false
    }

    const sel = view.state.selection.main

    /* Verify that it is a bracket type codepoint? */
    if (
        insert.length > 2
        ||
        (
            insert.length == 2
            &&
            codePointSize(codePointAt(insert, 0)) == 1
        )
        || from != sel.from
        || to != sel.to
    ) {
        return false
    }

    /* Create a transaction if we wish to do something, otherwise return false */
    const tr = insertBracket(view.state, insert)
    if (!tr) {
        return false
    }

    /* Dispatch created transaction and return true */
    view.dispatch(tr)
    return true
})

export function insertBracket(state: EditorState, insertedBracket: string): Transaction | null {
    /* Return a transaction with the changes or nothing if you wish. */

    // let conf = config(state, state.selection.main.head)
    // let configBrackets = conf.brackets || defaults.brackets

    /* check all configuration brackets to see if it matches one */

    // for (let confBracket of configBrackets) {
    //     const closingBracket = closing(codePointAt(confBracket, 0))
    //
    //     const bracketInConf = insertedBracket == confBracket;
    //     const confBracketIsClosing = closingBracket == confBracket;
    //
    //     if (bracketInConf) {
    //         return confBracketIsClosing
    //             ? handleSame(state, confBracket, configBrackets.indexOf(confBracket + confBracket + confBracket) > -1)
    //             : handleOpen(state, confBracket, closingBracket, conf.before || defaults.before)
    //     }
    //
    //     const insertedClosingBracket = insertedBracket == closingBracket;
    //     const closingBracketExistsAtSelection = closedBracketAt(state, state.selection.main.from);
    //
    //     if (insertedClosingBracket && closingBracketExistsAtSelection) {
    //         return handleClose(state, confBracket, closingBracket)
    //     }
    // }
    //
    return null
}

class ClosedBracketRange extends RangeValue {
    override startSide = 1;
    override endSide = -1;
}

const closeBracketEffect = StateEffect.define<number>({
    map(value, mapping) {
        let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter)
        return mapped == null ? undefined : mapped
    }
})

const skipBracketEffect = StateEffect.define<number>({
    map(value, mapping) {
        return mapping.mapPos(value)
    }
})

const bracketState = StateField.define<RangeSet<ClosedBracketRange>>({
    create() {
        return RangeSet.empty
    },

    update(cbrange, tx) {
        if (tx.selection) {
            /* If a closing bracket is inserted and newline is made, the editor forgets that it inserted it. */

            let lineStart = tx.state.doc.lineAt(tx.selection.main.head).from
            let prevLineStart = tx.startState.doc.lineAt(tx.startState.selection.main.head).from


            if (lineStart != tx.changes.mapPos(prevLineStart, -1)) {
                cbrange = RangeSet.empty
            }
        }

        /* Update the range with changes from the transaction */
        cbrange = cbrange.map(tx.changes)

        /* Find if we should act by closing a bracket, or by skipping a closing bracket we inserted */
        for (let effect of tx.effects) {
            if (effect.is(closeBracketEffect)) {
                cbrange = cbrange.update({
                    add: [
                        new ClosedBracketRange().range(effect.value, effect.value + 1)
                    ]
                })
            }
            else if (effect.is(skipBracketEffect)) {
                cbrange = cbrange.update({
                    filter: from => from != effect.value
                })
            }
        }

        return cbrange
    }
})
