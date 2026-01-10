import {App, Plugin, PluginManifest} from "obsidian";
import {SettingTab} from "./components/settingTab";
import {RootPluginDataStorage} from "./services/impl/rootPluginDataStorage";
import {NewDataInitializer} from "./services/impl/newDataInitializer";

import {UserSwapDefStorage} from "./services/impl/userSwapDefStorage";
import {Extension} from "@codemirror/state";
import {ExtensionHandler} from "./extensionHandler";
import {AddSwapDefModal} from "./components/addSwapDefModal";

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

        const userSwapStorage = new UserSwapDefStorage(
            dataStore,
            (swaps) => ExtensionHandler.replaceAndUpdate(
                this.extensions,
                swaps,
                this.app.workspace
            )
        );

        await initializer.initializeData();

        console.info("Adding editor extension");

        const currentSwaps = await userSwapStorage.getDefinedSwaps();
        ExtensionHandler.replaceAndRegister(this.extensions, currentSwaps, this);

        console.info("Adding UI elements");

        this.addSettingTab(new SettingTab(
            this.app,
            this,
            userSwapStorage,
        ));

        this.addCommand({
            id: "add-substitution",
            name: "Add Substitution",
            editorCallback: (editor, _) => {
                new AddSwapDefModal(
                    this.app,
                    userSwapStorage,
                    editor.getSelection()
                ).open();
            },
        });

        console.timeEnd("Plugin load time");
        console.groupEnd();
    }
}
