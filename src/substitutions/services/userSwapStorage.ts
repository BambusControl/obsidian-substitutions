import {ActionableSwap} from "../../libraries/types/savedata/actionable";
import {swapFilled} from "../../libraries/helpers/swapFilled";
import {UserSwapFragment} from "../../libraries/types/savedata/userSwapFragment";
import {removeAction} from "../../libraries/helpers/removeAction";
import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";
import {RootPluginDataStorage} from "./rootPluginDataStorage";
import {Action} from "src/libraries/types/savedata/action";
import {reindexSwaps} from "../../libraries/helpers/reindexSwaps";

export class UserSwapStorage {

    constructor(
        private readonly store: RootPluginDataStorage,
        private readonly modifiedCallback: (swaps: UserSwapFragment) => void
    ) {
    }

    async getSwaps(): Promise<SavedSwapDefinition[]> {
        return (await this.store.getSwap()).definitions;
    }

    async overwriteDefinedSwaps(allSwaps: ActionableSwap[]): Promise<void> {
        const originalData = await this.store.getSwap();

        const filledSwaps = new Array(...allSwaps.values()).filter(swapFilled);
        const modifiedSwaps = filledSwaps.filter(swap => swap.action === Action.Modify);
        const newSwaps = filledSwaps.filter(swap => swap.action === Action.Create);

        console.log("Modified swaps", modifiedSwaps);
        console.log("New swaps", newSwaps);
        console.log("Original swaps", originalData.definitions);

        const definitions = [
            ...modifiedSwaps,
            ...newSwaps,
        ].map(removeAction);

        const savedData = await this.store.overwriteSwap({
            ...originalData,
            definitions: reindexSwaps(definitions),
        });

        this.modifiedCallback(savedData);
    }

    async defineNewSwaps(newSwaps: ActionableSwap[]): Promise<void> {
        const originalData = await this.store.getSwap();
        const ogSwaps = originalData.definitions;

        const newDefinitions = new Array(...newSwaps.values())
            .filter(swapFilled)
            .filter(swap => swap.action === Action.Create)
            .map(removeAction)
        ;

        const definitions = [
            ...ogSwaps,
            ...newDefinitions,
        ];

        const savedData = await this.store.overwriteSwap({
            ...originalData,
            definitions: reindexSwaps(definitions),
        });

        this.modifiedCallback(savedData);
    }
}
