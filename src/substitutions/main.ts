import {App, Plugin, PluginManifest} from "obsidian";
import {
    ChangeSpec,
    EditorSelection,
    EditorState,
    Extension,
    StateEffect,
    StateField, Text,
    Transaction, TransactionSpec
} from "@codemirror/state";
import {EditorView, ViewUpdate} from "@codemirror/view";
import * as repl from "node:repl";

export default class UnicodeSearchPlugin extends Plugin {

    constructor(
        app: App,
        manifest: PluginManifest,
    ) {
        super(app, manifest);
    }

    override onload() {
        console.debug("Loading `substitutions` plugin.")


        console.log("Registering substitution")
        this.registerEditorExtension([
            fieldCharacterRecorder,
        ]);
    }
}

function inputGetter(value: number): (viewUpdate: ViewUpdate) => void {
    return function (viewUpdate: ViewUpdate) {
        console.log("Change internal", value)
        const changes: ChangeSpec[] = [];

        if (viewUpdate.docChanged) {
            let oldContents = viewUpdate.state.doc.toString();
            let matches = oldContents.matchAll(/ABCDEF/);
            console.debug(matches)
            for (let match of matches) {
                changes.push({
                    from: match.index!,
                    to: match.index! + match[0].length,
                    insert: "bcde"
                });
            }
        }

        if (changes.length > 0) {
            viewUpdate.view.dispatch({
                changes: changes,
            });
        }
    }
}

type CharacterRecord = string
type ViewUpdateEffect = (update: ViewUpdate) => void

type Med = {
    change: TransactionSpec | null
}

const SUBS = {
    from: "-->",
    to: "→"
}

const fieldCharacterRecorder = StateField.define<Med>({
    create(state: EditorState): Med {
        /* Initialize with empty string */
        return {
            change: null,
        }
    },

    update(value: Med, tx: Transaction): Med {
        if (value.change != null) {
            console.log("Value was changed previously, nulling")
            return {
                change: null,
            }
        }

        if (!tx.docChanged) {
            /* Ignore when text wasn't changed */
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
