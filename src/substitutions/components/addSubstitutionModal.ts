import {App, Modal, Setting} from "obsidian";
import {SubstitutionsStore} from "../services/substitutionsStore";
import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {registerNewSubstitutionRecordSetting} from "./registerNewSubstitutionRecordSetting";

export class AddSubstitutionModal extends Modal {
    private readonly newRecords: SubstitutionRecordSetting[] = [];

    constructor(
        app: App,
        private readonly dataStore: SubstitutionsStore,
        private readonly placeholderValue: string,
    ) {
        super(app);
    }

    override async onOpen(): Promise<void> {
        const fragment = new DocumentFragment();

        const container = fragment.createDiv();
        container.addClass("plugin", "substitutions", "add-substitution-modal");

        const headingContainer = container.createDiv({cls: "heading"});
        new Setting(headingContainer)
            .setDesc(
                "Auto paired characters, like brackets, currently do not work."
            )
        ;

        const newSubstitutionsContainer = container.createDiv({cls: ["substitutions-list", "new"]});
        const setting = registerNewSubstitutionRecordSetting(
            newSubstitutionsContainer,
            this.newRecords,
            { from: this.placeholderValue }
        );

        for (const recordSetting of this.newRecords) {
            recordSetting.display();
        }

        this.setTitle("Add new substitution");
        this.setContent(fragment);

        setting.fromInput?.focus();
    }

    override async onClose(): Promise<void> {
        await this.dataStore.addSubstitutionRecords(
            this.newRecords.map(sr => sr.record)
        );
    }
}
