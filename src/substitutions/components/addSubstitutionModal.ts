import {App, Modal, Plugin, PluginSettingTab, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {newModifiableSubstitutionRecord} from "../../libraries/helpers/newModifiableSubstitutionRecord";

export class AddSubstitutionModal extends Modal {
    private readonly newRecords: SubstitutionRecordSetting[] = [];

    constructor(
        app: App,
        private readonly dataStore: SubstitutionsStore,
    ) {
        super(app);
    }

    override onOpen(): void {
        const fragment = new DocumentFragment();
        const container = fragment.createDiv();

        const substitutionRecordSetting = new SubstitutionRecordSetting(
            newModifiableSubstitutionRecord(),
            container,
            () => {
                // try to assert that same substitution does not exist
            }
        );
        substitutionRecordSetting.display();

        this.setContent(fragment);
    }

    override onClose(): void {
    }
}
