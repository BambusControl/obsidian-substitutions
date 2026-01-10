import {Extension} from "@codemirror/state";
import {SubstitutionRecord} from "../libraries/types/savedata/substitutionRecord";
import {Plugin, Workspace} from "obsidian";
import {substitution} from "./codemirror/substitution";

export class ExtensionHandler {

    static replaceAndUpdate(
        extensions: Extension[],
        records: SubstitutionRecord[],
        workspace: Workspace
    ) {
        ExtensionHandler.replaceExtensions(extensions, records);

        console.info("Reloading CodeMirror extensions");

        workspace.updateOptions();
    }

    static replaceAndRegister(
        extensions: Extension[],
        records: SubstitutionRecord[],
        plugin: Plugin
    ) {
        ExtensionHandler.replaceExtensions(extensions, records);

        console.info("Registering CodeMirror extensions");

        plugin.registerEditorExtension(extensions);
    }

    private static replaceExtensions(
        extensions: Extension[],
        records: SubstitutionRecord[]
    ) {
        while (extensions.length > 0) {
            extensions.pop();
        }

        extensions.push(substitution(records));
    }
}
