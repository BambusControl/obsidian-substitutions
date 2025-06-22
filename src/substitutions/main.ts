import {App, Plugin, PluginManifest} from "obsidian";
import {SettingTab} from "./components/settingTab";
import {RootPluginDataStorage} from "./services/impl/rootPluginDataStorage";
import {NewDataInitializer} from "./services/impl/newDataInitializer";

import {SubstitutionsStorage} from "./services/impl/substitutionsStorage";
import {Extension} from "@codemirror/state";
import {ExtensionHandler} from "./extensionHandler";
import { AddSubstitutionModal } from "./components/addSubstitutionModal";

/* Used by Obsidian */
// noinspection JSUnusedGlobalSymbols
export default class SubstitutionsPlugin extends Plugin {
    private readonly extensions: Extension[];

    constructor(
        app: App,
        manifest: PluginManifest,
    ) {
        super(app, manifest);
        this.extensions = [];
    }

    override async onload(): Promise<void> {
        console.group("Loading Substitutions plugin");
        console.time("Plugin load time");

        console.info("Creating services");

        const dataStore = new RootPluginDataStorage(this);
        const initializer = new NewDataInitializer(dataStore);

        const substitutionStorage = new SubstitutionsStorage(
            dataStore,
            (records) => ExtensionHandler.replaceAndUpdate(
                this.extensions,
                records,
                this.app.workspace
            )
        );

        await initializer.initializeData();

        console.info("Adding editor extension");

        const records = await substitutionStorage.getSubstitutionRecords();
        ExtensionHandler.replaceAndRegister(this.extensions, records, this)

        console.info("Adding UI elements");

        this.addSettingTab(new SettingTab(
            this.app,
            this,
            substitutionStorage,
        ));

        this.addCommand({
            id: "add-substitution",
            name: "Add Substitution",
            editorCallback: (editor, _) => {
                new AddSubstitutionModal(
                    this.app,
                    substitutionStorage,
                    editor.getSelection()
                ).open();
            },
        });

        console.timeEnd("Plugin load time");
        console.groupEnd();
    }
}
