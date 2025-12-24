import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {registerNewSubstitutionRecordSetting} from "./registerNewSubstitutionRecordSetting";
import {ExternalApi} from "../externalApi";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedRecords: SubstitutionRecordSetting[] = [];
    private readonly newRecords: SubstitutionRecordSetting[] = [];

    constructor(
        app: App,
        plugin: Plugin,
        private readonly dataStore: SubstitutionsStore,
        private readonly externalApi: ExternalApi,
    ) {
        super(app, plugin);
    }

    private get records(): SubstitutionRecordSetting[] {
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

        new Setting(headingContainer)
            .setName("Add from Unicode Search")
            .setDesc("Insert a new substitution record from the Unicode Search plugin.")
            .addButton(button => {
                button.setIcon("type-outline")
                    .setTooltip("Open Unicode Search Menu")
                    .onClick(async () => {
                        button.setDisabled(true);
                        const char = await this.externalApi.askForCharacter()
                        console.log("Open Unicode Search Menu", {char});
                        setting.toInput?.setValue(char)
                        button.setDisabled(false);
                    })
            })

        const newSubstitutionsContainer = this.containerEl.createDiv({cls: ["substitutions-list", "new"]});
        const substitutionsContainer = this.containerEl.createDiv({cls: "substitutions-list"});

        this.storedRecords = (await this.dataStore.getModifiableSubstitutionRecords())
            .map(sr => new SubstitutionRecordSetting(sr, substitutionsContainer));

        const setting = registerNewSubstitutionRecordSetting(newSubstitutionsContainer, this.newRecords);

        for (const recordSetting of this.records) {
            recordSetting.display();
        }

        this.rendered = true;
    }

    override async hide(): Promise<void> {
        await this.dataStore.overwriteSubstitutionRecords(
            this.records.map(sr => sr.record)
        );
    }
}
