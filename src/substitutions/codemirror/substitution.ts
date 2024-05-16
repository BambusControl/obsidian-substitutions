import {
    ChangeDesc,
    EditorSelection,
    EditorState,
    Extension,
    StateEffect,
    StateField, Transaction,
    TransactionSpec
} from "@codemirror/state";
import {EditorView} from "@codemirror/view"

/* TODO: recording text also grabs it and doesn't write it down. */

export function substitution(): Extension {
    return [
        inputHandler,
        sf,
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

    console.log("Before", view.state)
    const tx = createTx(view.state, text);
    console.log("After", tx)

    view.dispatch(tx);

    return true;
})

function createTx(state: EditorState, text: string): TransactionSpec {
    const sfv = state.field(sf, false) ?? {...sfTypeDefault};

    return SUBS.from === sfv.cache
        ? replaceText(state, SUBS.from, SUBS.to)
        : recordText(state, text);
}

function recordText(state: EditorState, text: string): TransactionSpec {
    const from = state.selection.main.head;

    return state.update({
        selection: EditorSelection.cursor(from + 1),
        changes: [
            {
                insert: text,
                from: from,
                to: from,
            }
        ],
        userEvent: "input.type",
        effects: [
            fx.record.of(text),
        ],
    });
}

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
            effects: [
                fx.replace.of({
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

type FxType = object;
type SfType = {
    cache: string,
    replaced: boolean,
    subs: SubstitutionString | null,
};

const sfTypeDefault: SfType = {
    cache: "",
    replaced: false,
    subs: null,
}

const fx = {
    record: StateEffect.define<string>(),
    replace: StateEffect.define<SubstitutionString>(),
    revert: StateEffect.define(),
}

const sf = StateField.define<SfType>({
    create(state) {
        return {...sfTypeDefault};
    },
    update(value, transaction) {
        for (const eff of transaction.effects) {
            if (eff.is(fx.record)) {
                console.debug("fx.record:", value.cache, "+=", eff.value)
                return {
                    ...sfTypeDefault,
                    cache: (value.cache + eff.value).slice(-3),
                }
            } else if (eff.is(fx.replace)) {
                console.debug("fx.replace")
                return {
                    ...sfTypeDefault,
                    subs: {
                        from: eff.value.from,
                        to: eff.value.to,
                    }
                }
            } else if (eff.is(fx.revert)) {
                console.debug("fx.revert")
                return {
                    ...sfTypeDefault
                }
            }
        }

        return value;
    },
})

type SubstitutionString = {
    from: string,
    to: string,
}

type StringRecord = {
    position: number,
    text: string,
}

const SUBS = {
    from: "-->",
    to: "→",
    // from: "(r)",
    // to: "→",
}
