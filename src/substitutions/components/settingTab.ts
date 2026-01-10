import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UserSwapDefStore} from "../services/userSwapDefStore";
import {UserFacingSwapSetting} from "./userFacingSwapSetting";
import {addNewUserFacingSwapSetting} from "./addNewUserFacingSwapSetting";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedRecords: UserFacingSwapSetting[] = [];
    private readonly newRecords: UserFacingSwapSetting[] = [];

    constructor(
        app: App,
        plugin: Plugin,
        private readonly dataStore: UserSwapDefStore,
    ) {
        super(app, plugin);
    }

    private get userSwapSettings(): UserFacingSwapSetting[] {
        return [
            ...this.newRecords,
            ...this.storedRecords,
        ];
    }

    override async display(): Promise<void> {
        if (this.rendered) {
            return;
        }

        this.containerEl.addClass("plugin", "substitutions", "settings-tab");
        const headingContainer = this.containerEl.createDiv({cls: "heading"});

        new Setting(headingContainer)
            .setHeading()
            .setName("Substitutions")
            .setDesc(
                "Here you can set and enable automatic text substitutions. " +
                "Auto paired characters, like brackets, currently do not work."
            )
        ;

        const newSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "new"]});
        const swapsContainer = this.containerEl.createDiv({cls: "swap-definition-list"});

        this.storedRecords = (await this.dataStore.getModifiableSwaps())
            .map(sr => new UserFacingSwapSetting(sr, swapsContainer));

        addNewUserFacingSwapSetting(newSwapsContainer, this.newRecords);

        for (const recordSetting of this.userSwapSettings) {
            recordSetting.display();
        }

        this.rendered = true;
    }

    override hide(): Promise<void> {
        this.containerEl.empty();
        this.rendered = false;

        return this.dataStore.overwriteDefinedSwaps(
            this.userSwapSettings.map(sr => sr.swapDef)
        );
    }
}
