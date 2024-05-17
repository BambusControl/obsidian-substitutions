import {App, Plugin, PluginManifest} from "obsidian";
import {substitution} from "./codemirror/substitution";
import {SettingTab} from "./components/settingTab";
import {RootPluginDataStorage} from "./services/impl/rootPluginDataStorage";
import {NewDataInitializer} from "./services/impl/newDataInitializer";

import {SubstitutionsStorage} from "./services/impl/substitutionsStorage";

/* Used by Obsidian */
// noinspection JSUnusedGlobalSymbols
export default class SubstitutionsPlugin extends Plugin {

    constructor(
        app: App,
        manifest: PluginManifest,
    ) {
        super(app, manifest);
    }

    override async onload(): Promise<void> {
        console.group("Loading Substitutions plugin");
        console.time("Substitutions load time");

        console.info("Creating services");

        const dataStore = new RootPluginDataStorage(this);
        const initializer = new NewDataInitializer(dataStore);
        const substitutionStorage = new SubstitutionsStorage(dataStore);

        await initializer.initializeData();

        console.info("Adding editor extension");

        /* TODO: Settings Pane with substitution configuration */
        this.registerEditorExtension([
            substitution(),
        ]);

        console.info("Adding UI elements");

        this.addSettingTab(new SettingTab(
            this.app,
            this,
            substitutionStorage,
        ))

        console.timeEnd("Substitutions load time");
        console.groupEnd();
    }
}
