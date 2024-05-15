import {App, Plugin, PluginManifest} from "obsidian";
import {ChangeSpec, EditorState, StateEffect, StateField} from "@codemirror/state";
import {EditorView, ViewUpdate} from "@codemirror/view";

export default class UnicodeSearchPlugin extends Plugin {

    constructor(
        app: App,
        manifest: PluginManifest,
    ) {
        super(app, manifest);
    }

    override onload() {
        console.debug("Loading `substitutions` plugin.")

        type ViewUpdater = (viewUpdate: ViewUpdate) => void
        const stateFieldUpdater = StateField.define<ViewUpdater>({
            create: (state) => {
                return (viewUpdate: ViewUpdate) => {
                    console.log("viewUpdate create")
                };
            },
            update: (value, tx) => {
                return inputGetter(0)
            },
            provide: (field) => {
                return EditorView.updateListener.from(field);
            }
        })

        console.log("Registering substitution")
        this.registerEditorExtension([
            stateFieldUpdater,
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
