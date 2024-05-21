import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {newModifiableSubstitutionRecord} from "../../libraries/helpers/newModifiableSubstitutionRecord";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedRecords: SubstitutionRecordSetting[] = [];
    private newRecords: SubstitutionRecordSetting[] = [];

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

        this.newRecords.push(
            SettingTab.newSubstitutionRecord(newSubstitutionsContainer, this.newRecords)
        )

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

    private static newSubstitutionRecord(
        container: HTMLDivElement,
        recordSettings: SubstitutionRecordSetting[],
    ): SubstitutionRecordSetting {
        return new SubstitutionRecordSetting(
            newModifiableSubstitutionRecord(),
            container,
            () => {
                const setting = SettingTab.newSubstitutionRecord(container, recordSettings)
                setting.display();
                recordSettings.unshift(
                    /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
                    SettingTab.newSubstitutionRecord(container, recordSettings)
                )
            }
        );
    }
}

