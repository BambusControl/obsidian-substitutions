import {Extension} from "@codemirror/state";
import {SubstitutionRecords} from "../libraries/types/savedata/substitutionRecords";
import {Plugin, Workspace} from "obsidian";
import {substitution} from "./codemirror/substitution";

export class ExtensionHandler {


    /**
     * @param extensions in place modification
     */
    static replaceAndUpdate(
        extensions: Extension[],
        records: SubstitutionRecords,
        workspace: Workspace
    ) {
        ExtensionHandler.replaceExtensions(extensions, records);

        console.log("Reloading CodeMirror extensions")

        workspace.updateOptions();
    }

    /**
     * @param extensions in place modification
     */
    static replaceAndRegister(extensions: Extension[], records: SubstitutionRecords, plugin: Plugin) {
        ExtensionHandler.replaceExtensions(extensions, records);

        console.log("Reloading CodeMirror extensions")

        plugin.registerEditorExtension(extensions);
    }

    /**
     * @param extensions in place modification
     */
    private static replaceExtensions(extensions: Extension[], records: SubstitutionRecords) {
        while (extensions.length > 0) {
            extensions.pop();
        }

        extensions.push(substitution(records));
    }
}
