import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {Action} from "../../libraries/types/savedata/action";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {SubstitutionRecord} from "../../libraries/types/savedata/substitutionRecord";
import {ModifiableSubstitutionRecord} from "../../libraries/types/savedata/modifiableSubstitutionRecord";

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
            .setDesc("Here you can set and enable automatic text substitutions.")
        ;

        const newSubstitutionsContainer = this.containerEl.createDiv({cls: ["substitutions", "new"]});
        const substitutionsContainer = this.containerEl.createDiv({cls: "substitutions"});

        this.storedRecords = (await this.dataStore.getSubstitutionRecords())
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
        return [...this.storedRecords, ...this.newRecords]
    }

    private static newSubstitutionRecord(
        container: HTMLDivElement,
        recordSettings: SubstitutionRecordSetting[],
    ): SubstitutionRecordSetting {
        return new SubstitutionRecordSetting(
            newRecord(),
            container,
            () => {
                const setting = SettingTab.newSubstitutionRecord(container, recordSettings)
                setting.display();
                recordSettings.unshift(
                    /* Very peculiar */
                    SettingTab.newSubstitutionRecord(container, recordSettings)
                )
            }
        );
    }
}

function newRecord(): ModifiableSubstitutionRecord {
    return {
        ...{
            from: "",
            to: "",
            enabled: true,
        },
        ...{
            id: -1,
            action: Action.Create,
        }
    };
}
