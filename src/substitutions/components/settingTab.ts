import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {substitutionRecord} from "../../libraries/helpers/substitutionRecord";
import {PersistCache} from "../../libraries/types/persistCache";
import {ModifiableSubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {Action} from "../../libraries/types/savedata/action";

function newDude() {
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

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private records: PersistCache<ModifiableSubstitutionRecords>;

    constructor(
        app: App,
        plugin: Plugin,
        dataStore: SubstitutionsStore,
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "substitutions", "setting-tab")

        this.records = new PersistCache(
            () => dataStore.getSubstitutionRecords(),
            (data) => dataStore.overwriteSubstitutionRecords(data)
        );
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

        const substitutionsContainer = this.containerEl.createDiv({cls: "substitutions"});
        const substitutionRecords = await this.records.get();

        substitutionRecords.unshift({
            ...{
                from: "",
                to: "",
                enabled: true,
            },
            ...{
                id: -1,
                action: Action.Create,
            }
        });

        /* TODO: Add new input dynamically, and use flexbox to put it */
        for (const record of substitutionRecords) {
            substitutionRecord(
                substitutionsContainer,
                record,
                /* TODO: callbacks */
                async () => {
                    substitutionRecords.unshift(newDude());

                    await this.redraw();
                },
            );
        }

        this.rendered = true;
    }

    override async hide(): Promise<void> {
        await this.records.persist();
    }

    private async redraw(): Promise<void> {
        this.rendered = false;
        this.containerEl.innerHTML = ""
        await this.display();
    }
}
