import {Extension} from "@codemirror/state";
import {Plugin, Workspace} from "obsidian";
import {substitutionsExtension} from "./codemirror/substitutionsExtension";
import {SavedSwapDefinition} from "../libraries/types/savedata/savedSwapDefinition";

export class ExtensionHandler {

    static replaceAndUpdate(
        extensions: Extension[],
        swaps: SavedSwapDefinition[],
        workspace: Workspace,
    ) {
        ExtensionHandler.replaceExtensions(extensions, swaps);

        console.info("Reloading CodeMirror extensions");

        workspace.updateOptions();
    }

    static replaceAndRegister(
        extensions: Extension[],
        swaps: SavedSwapDefinition[],
        plugin: Plugin
    ) {
        ExtensionHandler.replaceExtensions(extensions, swaps);

        console.info("Registering CodeMirror extensions");

        plugin.registerEditorExtension(extensions);
    }

    private static replaceExtensions(
        extensions: Extension[],
        swaps: SavedSwapDefinition[],
    ) {
        while (extensions.length > 0) {
            extensions.pop();
        }

        extensions.push(substitutionsExtension(swaps));
    }
}
