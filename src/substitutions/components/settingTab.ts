import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UserSwapStorage} from "../services/userSwapStorage";
import {UserFacingPlainSwapSetting} from "./userFacingPlainSwapSetting";
import {addNewUserFacingPlainSwapSetting, addNewUserFacingRegexSwapSetting} from "./addNewUserFacingPlainSwapSetting";
import {toActionablePlain, toActionableRegex} from "../../libraries/helpers/toActionable";
import {UserFacingRegexSwapSetting} from "./userFacingRegexSwapSetting";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedPlain: UserFacingPlainSwapSetting[] = [];
    private readonly newPlain: UserFacingPlainSwapSetting[] = [];
    private storedRegex: UserFacingRegexSwapSetting[] = [];
    private readonly newRegex: UserFacingRegexSwapSetting[] = [];

    constructor(
        app: App,
        plugin: Plugin,
        private readonly userSwap: UserSwapStorage,
    ) {
        super(app, plugin);
    }

    private get userPlainSwapSettings(): UserFacingPlainSwapSetting[] {
        return [
            ...this.newPlain,
            ...this.storedPlain,
        ];
    }

    private get userRegexSwapSettings(): UserFacingRegexSwapSetting[] {
        return [
            ...this.newRegex,
            ...this.storedRegex,
        ];
    }

    override async display(): Promise<void> {
        if (this.rendered) {
            return;
        }

        this.containerEl.addClass("plugin", "substitutions", "settings-tab");
        const headingContainer = this.containerEl.createDiv({cls: "heading"});

        new Setting(headingContainer)
            .setHeading()
            .setName("Substitutions")
            .setDesc(
                "Here you can set and enable automatic text substitutions. " +
                "Auto paired characters, like brackets, currently do not work."
            )
        ;


        /* Plain Swaps */
        const plainSwapHadingContainer = this.containerEl.createDiv({cls: "heading"});
        new Setting(plainSwapHadingContainer)
            .setHeading()
            .setName("Plain Text Substitutions")
        ;

        const newPlainSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "plain", "new"]});
        const plainSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "plain"]});

        this.storedPlain = (await this.userSwap.getPlainSwaps())
            .map(toActionablePlain)
            .map(swap => new UserFacingPlainSwapSetting(swap, plainSwapsContainer));

        addNewUserFacingPlainSwapSetting(newPlainSwapsContainer, this.newPlain);

        for (const plainSwap of this.userPlainSwapSettings) {
            plainSwap.display();
        }

        /* Regex Swaps */
        const regexSwapHadingContainer = this.containerEl.createDiv({cls: "heading"});
        new Setting(regexSwapHadingContainer)
            .setHeading()
            .setName("Regular Expression Substitutions")
        ;

        const newRegexSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "regex", "new"]});
        const regexSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "regex"]});

        this.storedRegex = (await this.userSwap.getRegexSwaps())
            .map(toActionableRegex)
            .map(swap => new UserFacingRegexSwapSetting(swap, regexSwapsContainer));

        addNewUserFacingRegexSwapSetting(newRegexSwapsContainer, this.newRegex);

        for (const regexSwap of this.userRegexSwapSettings) {
            regexSwap.display();
        }

        this.rendered = true;
    }

    override hide(): Promise<void> {
        this.containerEl.empty();
        this.rendered = false;

        return this.userSwap.overwriteDefinedSwaps(
            this.userPlainSwapSettings.map(swap => swap.swapDef),
            this.userRegexSwapSettings.map(swap => swap.swapDef),
        );
    }
}
