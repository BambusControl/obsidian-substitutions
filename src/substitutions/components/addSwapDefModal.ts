import {App, Modal, Setting} from "obsidian";
import {UserSwapDefStore} from "../services/userSwapDefStore";
import {UserFacingSwapSetting} from "./userFacingSwapSetting";
import {addNewUserFacingSwapSetting} from "./addNewUserFacingSwapSetting";

export class AddSwapDefModal extends Modal {
    private readonly newSwaps: UserFacingSwapSetting[] = [];

    constructor(
        app: App,
        private readonly dataStore: UserSwapDefStore,
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

        const newSwapsContainer = container.createDiv({cls: ["swap-definition-list", "new"]});
        const setting = addNewUserFacingSwapSetting(
            newSwapsContainer,
            this.newSwaps,
            {from: this.placeholderValue}
        );

        for (const newSwap of this.newSwaps) {
            newSwap.display();
        }

        this.setTitle("Add new substitution");
        this.setContent(fragment);

        setting.fromInput?.inputEl.focus();
    }

    override async onClose(): Promise<void> {
        await this.dataStore.defineNewSwaps(
            this.newSwaps.map(sr => sr.swapDef)
        );
    }
}
