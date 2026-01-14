import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UserSwapStorage} from "../services/userSwapStorage";
import {UserFacingSwapSetting} from "./userFacingSwapSetting";
import {addNewUserFacingSwapSetting} from "./addNewUserFacingSwapSetting";
import {toActionable} from "../../libraries/helpers/toActionable";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedSwaps: UserFacingSwapSetting[] = [];
    private newSwaps: UserFacingSwapSetting[] = [];

    constructor(
        app: App,
        plugin: Plugin,
        private readonly userSwap: UserSwapStorage,
    ) {
        super(app, plugin);
    }

    private get swapSettings(): UserFacingSwapSetting[] {
        return [
            ...this.newSwaps,
            ...this.storedSwaps,
        ];
    }

    override async display(): Promise<void> {
        if (this.rendered) {
            return;
        }
        this.newSwaps = [];

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

        const newSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "new"]});
        const oldSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list"]});

        this.storedSwaps = (await this.userSwap.getSwaps())
            .map(toActionable)
            .map(swap => new UserFacingSwapSetting(swap, oldSwapsContainer));

        addNewUserFacingSwapSetting(newSwapsContainer, this.newSwaps);

        for (const swapSetting of this.swapSettings) {
            swapSetting.display();
        }

        this.rendered = true;
    }

    override hide(): Promise<void> {
        this.containerEl.empty();
        this.rendered = false;

        return this.userSwap.overwriteDefinedSwaps(
            this.swapSettings.map(swap => swap.swapDef),
        );
    }
}
