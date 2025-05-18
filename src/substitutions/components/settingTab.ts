import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {registerNewSubstitutionRecordSetting} from "./registerNewSubstitutionRecordSetting";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedRecords: SubstitutionRecordSetting[] = [];
    private readonly newRecords: SubstitutionRecordSetting[] = [];

    constructor(
        app: App,
        plugin: Plugin,
        private readonly dataStore: SubstitutionsStore,
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "substitutions", "settings-tab")
    }

    override async display(): Promise<void> {
        if (this.rendered) {
            return;
        }

        const headingContainer = this.containerEl.createDiv({cls: "heading"});

        new Setting(headingContainer)
            .setHeading()
            .setName("Substitutions")
            .setDesc(
                "Here you can set and enable automatic text substitutions. " +
                "Auto paired characters, like brackets, currently do not work."
            )
        ;

        const newSubstitutionsContainer = this.containerEl.createDiv({cls: ["substitutions-list", "new"]});
        const substitutionsContainer = this.containerEl.createDiv({cls: "substitutions-list"});

        this.storedRecords = (await this.dataStore.getModifiableSubstitutionRecords())
            .map(sr => new SubstitutionRecordSetting(sr, substitutionsContainer));

        registerNewSubstitutionRecordSetting(newSubstitutionsContainer, this.newRecords)

        for (const recordSetting of this.records) {
            recordSetting.display();
        }

        this.rendered = true;
    }

    override async hide(): Promise<void> {
        await this.dataStore.overwriteSubstitutionRecords(
            this.records.map(sr => sr.record)
        )
    }

    private get records(): SubstitutionRecordSetting[] {
        return [
            ...this.newRecords,
            ...this.storedRecords,
        ];
    }
}
