import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {newModifiableSubstitutionRecord} from "../../libraries/helpers/newModifiableSubstitutionRecord";

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
        this.containerEl.addClass("plugin", "substitutions", "setting-tab")
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
                "Changes currently require restart of Obsidian. " +
                "Auto paired characters, like brackets, currently do not work."
            )
        ;

        const newSubstitutionsContainer = this.containerEl.createDiv({cls: ["substitutions", "new"]});
        const substitutionsContainer = this.containerEl.createDiv({cls: "substitutions"});

        this.storedRecords = (await this.dataStore.getModifiableSubstitutionRecords())
            .map(sr => new SubstitutionRecordSetting(sr, substitutionsContainer));

        SettingTab.registerNewSubstitutionRecordSetting(newSubstitutionsContainer, this.newRecords)

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

    private static registerNewSubstitutionRecordSetting(
        container: HTMLDivElement,
        newSettings: SubstitutionRecordSetting[],
    ): SubstitutionRecordSetting {
        const substitutionRecordSetting = new SubstitutionRecordSetting(
            newModifiableSubstitutionRecord(),
            container,
            () => {
                /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
                const setting = SettingTab.registerNewSubstitutionRecordSetting(container, newSettings);
                setting.display();
            }
        );

        newSettings.unshift(substitutionRecordSetting)
        return substitutionRecordSetting;
    }
}

