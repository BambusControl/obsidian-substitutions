import {App, Modal, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {newModifiableSubstitutionRecord} from "../../libraries/helpers/newModifiableSubstitutionRecord";
import {createNewSettingInputs} from "../../libraries/helpers/settings/createNewSettingInputs";
import {AddSubstitutionRecordSetting} from "./addSubstitutionRecordSetting";

export class AddSubstitutionModal extends Modal {
    private readonly newRecords: SubstitutionRecordSetting[] = [];

    constructor(
        app: App,
        private readonly dataStore: SubstitutionsStore,
        private readonly placeholderValue: string,
    ) {
        super(app);
        this.display();
    }

    display(): void {
        const fragment = new DocumentFragment();
        const container = fragment.createDiv();

        const substitutionRecordSetting = new AddSubstitutionRecordSetting(
            {
                ...newModifiableSubstitutionRecord(),
                to: this.placeholderValue,
            },
            container,
            () => {
                // try to assert that same substitution does not exist
            }
        );
        // TODO save
        substitutionRecordSetting.display();

        this.setTitle("Add new substitution");
        this.setContent(fragment);
    }

    override onClose(): void {
    }
}
