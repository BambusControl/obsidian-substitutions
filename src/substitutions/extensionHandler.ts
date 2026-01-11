import {Extension} from "@codemirror/state";
import {PlainSwap, RegexSwap} from "../libraries/types/savedata/swapDef";
import {Plugin, Workspace} from "obsidian";
import {substitutionsExtension} from "./codemirror/substitutionsExtension";

export class ExtensionHandler {

    static replaceAndUpdate(
        extensions: Extension[],
        plainSwaps: PlainSwap[],
        regexSwaps: RegexSwap[],
        workspace: Workspace,
    ) {
        ExtensionHandler.replaceExtensions(extensions, plainSwaps, regexSwaps);

        console.info("Reloading CodeMirror extensions");

        workspace.updateOptions();
    }

    static replaceAndRegister(
        extensions: Extension[],
        plainSwaps: PlainSwap[],
        regexSwaps: RegexSwap[],
        plugin: Plugin
    ) {
        ExtensionHandler.replaceExtensions(extensions, plainSwaps, regexSwaps);

        console.info("Registering CodeMirror extensions");

        plugin.registerEditorExtension(extensions);
    }

    private static replaceExtensions(
        extensions: Extension[],
        plainSwaps: PlainSwap[],
        regexSwaps: RegexSwap[],
    ) {
        while (extensions.length > 0) {
            extensions.pop();
        }

        extensions.push(substitutionsExtension(plainSwaps, regexSwaps));
    }
}
