import {App, debounce, Debouncer, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UserSwapStorage} from "../services/userSwapStorage";
import {UserFacingSwapSetting} from "./userFacingSwapSetting";
import {addNewUserFacingSwapSetting} from "./addNewUserFacingSwapSetting";
import {toActionable} from "../../libraries/helpers/toActionable";
import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";

export class SettingTab extends PluginSettingTab {

    private rendered = false;
    private storedSwaps: UserFacingSwapSetting[] = [];
    private newSwaps: UserFacingSwapSetting[] = [];
    private searchQuery = "";

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

    private static filterSwaps(swapSettings: any, filterQuery: string): void {
        const query = filterQuery.trim().toLowerCase()

        for (const swapSetting of swapSettings) {
            const visible = SettingTab.shouldShowSwapForQuery(swapSetting.swapDef, query);
            swapSetting.display().settingEl.toggleClass("search-hidden", !visible);
        }
    }

    private static shouldShowSwapForQuery(swap: SavedSwapDefinition, query: string): boolean {
        return query === ""
            || (swap.source ?? "").toLowerCase().includes(query)
            || (swap.replacement ?? "").toLowerCase().includes(query)
            ;
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

        new Setting(this.containerEl)
            .setClass("swap-search")
            .setName("Search substitutions")
            .setDesc("Filter substitutions by source or replacement text.")
            .addSearch((searchInput) => {
                searchInput
                    .setPlaceholder("Search substitutions")
                    .setValue(this.searchQuery)
                    .onChange(debounced((value) => {
                        this.searchQuery = value;
                        SettingTab.filterSwaps(this.swapSettings, this.searchQuery);
                    }));
            });

        const newSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list", "new"]});
        const oldSwapsContainer = this.containerEl.createDiv({cls: ["swap-definition-list"]});

        this.storedSwaps = (await this.userSwap.getSwaps())
            .map(toActionable)
            .map(swap => new UserFacingSwapSetting(swap, oldSwapsContainer));

        addNewUserFacingSwapSetting(newSwapsContainer, this.newSwaps);

        for (const swapSetting of this.swapSettings) {
            swapSetting.display();
        }
        SettingTab.filterSwaps(this.swapSettings, this.searchQuery);

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


function debounced<T extends unknown[], V>(func: (...args: [...T]) => V): Debouncer<T, V> {
    return debounce(func, 200, true);
}
