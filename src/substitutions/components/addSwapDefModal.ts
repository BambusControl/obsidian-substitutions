import {App, Modal, Setting} from "obsidian";
import {UserFacingPlainSwapSetting} from "./userFacingPlainSwapSetting";
import {addNewUserFacingPlainSwapSetting, addNewUserFacingRegexSwapSetting} from "./addNewUserFacingPlainSwapSetting";
import {UserSwapStorage} from "../services/userSwapStorage";
import {UserFacingRegexSwapSetting} from "./userFacingRegexSwapSetting";
import {createRegex} from "../../libraries/helpers/createRegex";

export class AddSwapDefModal extends Modal {
    private readonly newPlainSwaps: UserFacingPlainSwapSetting[] = [];
    private readonly newRegexSwaps: UserFacingRegexSwapSetting[] = [];

    constructor(
        app: App,
        private readonly dataStore: UserSwapStorage,
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

        const plainHeadingContainer = container.createDiv({cls: "heading"});
        new Setting(plainHeadingContainer)
            .setHeading()
            .setName("Plain Text Substitutions")
        ;

        const newPlainSwapsContainer = container.createDiv({cls: ["swap-definition-list", "plain", "new"]});
        const plainSetting = addNewUserFacingPlainSwapSetting(
            newPlainSwapsContainer,
            this.newPlainSwaps,
            {source: this.placeholderValue}
        );

        for (const newSwap of this.newPlainSwaps) {
            newSwap.display();
        }

        const regexHeadingContainer = container.createDiv({cls: "heading"});
        new Setting(regexHeadingContainer)
            .setHeading()
            .setName("Regular Expression Substitutions")
        ;

        const newRegexSwapsContainer = container.createDiv({cls: ["swap-definition-list", "regex", "new"]});
        const regexSetting = addNewUserFacingRegexSwapSetting(
            newRegexSwapsContainer,
            this.newRegexSwaps,
            {source: this.placeholderValue}
        );

        for (const newRegexSwap of this.newRegexSwaps) {
            newRegexSwap.display();
        }

        this.setTitle("Add new substitution");
        this.setContent(fragment);

        plainSetting.fromInput?.inputEl.focus();
    }

    override async onClose(): Promise<void> {
        await this.dataStore.defineNewSwaps(
            this.newPlainSwaps.map(swap => swap.swapDef),
            this.newRegexSwaps.map(swap => swap.swapDef),
        );
    }
}
