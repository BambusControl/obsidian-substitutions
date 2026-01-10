import {Extension} from "@codemirror/state";
import {SwapDef} from "../libraries/types/savedata/swapDef";
import {Plugin, Workspace} from "obsidian";
import {substitutionsExtension} from "./codemirror/substitutionsExtension";

export class ExtensionHandler {

    static replaceAndUpdate(
        extensions: Extension[],
        swapDefinitions: SwapDef[],
        workspace: Workspace
    ) {
        ExtensionHandler.replaceExtensions(extensions, swapDefinitions);

        console.info("Reloading CodeMirror extensions");

        workspace.updateOptions();
    }

    static replaceAndRegister(
        extensions: Extension[],
        records: SwapDef[],
        plugin: Plugin
    ) {
        ExtensionHandler.replaceExtensions(extensions, records);

        console.info("Registering CodeMirror extensions");

        plugin.registerEditorExtension(extensions);
    }

    private static replaceExtensions(
        extensions: Extension[],
        swapDefinitions: SwapDef[]
    ) {
        while (extensions.length > 0) {
            extensions.pop();
        }

        extensions.push(substitutionsExtension(swapDefinitions));
    }
}
