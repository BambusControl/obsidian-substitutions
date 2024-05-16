import {App, Plugin, PluginManifest} from "obsidian";
import {substitution} from "./codemirror/substitution";

export default class UnicodeSearchPlugin extends Plugin {

    constructor(
        app: App,
        manifest: PluginManifest,
    ) {
        super(app, manifest);
    }

    override onload() {
        console.debug("Loading `substitutions` plugin.")

        this.registerEditorExtension([
            substitution(),
        ]);
    }
}

/*
type ViewUpdateEffect = (update: ViewUpdate) => void

type Med = {
    change: TransactionSpec | null
}

const SUBS = {
    // from: "-->",
    // to: "→",
    from: "(r)",
    to: "→",
}

const fieldCharacterRecorder = StateField.define<Med>({
    create(state: EditorState): Med {
        /!* Initialize with empty string *!/
        return {
            change: null,
        }
    },

    update(value: Med, tx: Transaction): Med {
        console.debug(
            tx.docChanged ? "changed" : "-",
            tx.changes.empty ? "empty" : "-",
            tx.isUserEvent("input") ? "user-input" : "-",
        );

        console.dir(tx)

        const eff = tx.effects.length > 0;
        const selIndex = tx.selection?.asSingle().mainIndex
        const selFr = tx.selection?.asSingle().main.from
        const selTo = tx.selection?.asSingle().main.to

        tx.state.facet()

        if (value.change != null) {
            console.log("Value was changed previously, nulling")
            return {
                change: null,
            }
        }

        if (!tx.docChanged) {
            /!* Ignore when text wasn't changed *!/
            return value;
        }

        const type = tx.isUserEvent("input.type") ? "INPUT"
            : tx.isUserEvent("delete.backward") ? "DELETE"
                : null;

        if (type == null) {
            return value;
        }

        const tselection = tx.selection!;
        const cursorPos = tselection?.asSingle().main.head;
        const textBeforeCursor = tx.state.doc.slice(Math.max(0, cursorPos - SUBS.from.length), cursorPos).text[0] as String;

        if (textBeforeCursor === SUBS.from) {
            const ntx = tx.state.update({
                changes: {
                    from: cursorPos - SUBS.from.length,
                    to: cursorPos,
                    insert: SUBS.to,
                }
            })

            return {
                change: ntx,
            };
        }

        return value
    },

    provide(field: StateField<Med>): Extension {
        return EditorView.updateListener.from<Med>(
            field,
            (current) => (update) => {
                if (current.change == null) {
                    return;
                }

                update.view.dispatch(current.change);
            }
        );
    }
})
*/
