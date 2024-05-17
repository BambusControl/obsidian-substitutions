import {App, Plugin, PluginManifest} from "obsidian";
import {substitution} from "./codemirror/substitution";
import {SettingTab} from "./components/settingTab";

export default class UnicodeSearchPlugin extends Plugin {

    constructor(
        app: App,
        manifest: PluginManifest,
    ) {
        super(app, manifest);
    }

    override onload() {
        console.debug("Loading `substitutions` plugin.")

        /* TODO: Settings Pane with substitution configuration */
        this.registerEditorExtension([
            substitution(),
        ]);

        this.addSettingTab(new SettingTab(
            this.app,
            this,
        ))
    }
}
