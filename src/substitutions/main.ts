import {App, Plugin, PluginManifest} from "obsidian";
import {SettingTab} from "./components/settingTab";
import {Extension} from "@codemirror/state";
import {ExtensionHandler} from "./extensionHandler";
import {AddSwapDefModal} from "./components/addSwapDefModal";
import {MetaDataManager} from "./services/metaDataManager";
import {SwapDataManager} from "./services/swapDataManager";
import {RootDataManager} from "./services/rootDataManager";
import {PersistCache} from "../libraries/types/persistCache";
import {RootPluginDataStorage} from "./services/rootPluginDataStorage";
import {UserSwapStorage} from "./services/userSwapStorage";

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

        const dataLoader = new PersistCache(
            () => this.loadData(),
            (data) => this.saveData(data)
        );

        const dataStore = new RootPluginDataStorage(dataLoader);
        const swapStore = new UserSwapStorage(
            dataStore,
            (swaps) => ExtensionHandler.replaceAndUpdate(
                this.extensions,
                swaps.definitions,
                this.app.workspace
            )
        );

        const metaDm = new MetaDataManager();
        const swapDm = new SwapDataManager();

        const dataManager = new RootDataManager(
            dataLoader,
            metaDm,
            swapDm,
        );

        await dataManager.initializeData();

        console.info("Adding editor extension");

        const savedSwaps = await swapStore.getSwaps();
        ExtensionHandler.replaceAndRegister(this.extensions, savedSwaps, this);

        console.info("Adding UI elements");

        this.addSettingTab(new SettingTab(
            this.app,
            this,
            swapStore,
        ));

        this.addCommand({
            id: "add-substitution",
            name: "Add Substitution",
            editorCallback: (editor, _) => {
                new AddSwapDefModal(
                    this.app,
                    swapStore,
                    editor.getSelection()
                ).open();
            },
        });

        console.timeEnd("Plugin load time");
        console.groupEnd();
    }
}
