import {RootDataStore} from "../rootDataStore";
import {SwapDef} from "../../../libraries/types/savedata/swapDef";
import {ModifiableSwapDef} from "../../../libraries/types/savedata/modifiableSwapDef";
import {UserSwapDefStore} from "../userSwapDefStore";
import {swapFilled} from "../../../libraries/helpers/swapFilled";
import {toModifiable} from "../../../libraries/helpers/toModifiable";
import {removeIdentifier} from "../../../libraries/helpers/removeIdentifier";
import {swapNotDeleted} from "../../../libraries/helpers/swapNotDeleted";

export class UserSwapDefStorage implements UserSwapDefStore {

    constructor(
        private readonly store: RootDataStore,
        private readonly modifiedCallback: (swaps: SwapDef[]) => void
    ) {
    }

    async getDefinedSwaps(): Promise<SwapDef[]> {
        return (await this.store.getSwapDefinitionData()).records;
    }

    async getModifiableSwaps(): Promise<ModifiableSwapDef[]> {
        const swaps = await this.getDefinedSwaps();
        return swaps.map(toModifiable);
    }

    async overwriteDefinedSwaps(modifiedSwaps: ModifiableSwapDef[]): Promise<void> {
        const originalData = await this.store.getSwapDefinitionData();

        const filledSwaps = new Array(...modifiedSwaps.values())
            .filter(swapFilled);

        const swaps = filledSwaps
            .filter(swapNotDeleted)
            .map(removeIdentifier);

        const savedData = await this.store.overwriteSwapDefinitionData({
            ...originalData,
            records: swaps,
        });

        this.modifiedCallback(savedData.records);
    }

    async defineNewSwaps(newSwaps: ModifiableSwapDef[]): Promise<void> {
        const originalData = await this.store.getSwapDefinitionData();
        const originalDefinitions = originalData.records;

        const filledDefinitions = new Array(...newSwaps.values())
            .filter(swapFilled);

        const newDefinitions = filledDefinitions
            .filter(swapNotDeleted)
            .map(removeIdentifier);

        const savedData = await this.store.overwriteSwapDefinitionData({
            ...originalData,
            records: [
                ...newDefinitions,
                ...originalDefinitions,
            ],
        });

        this.modifiedCallback(savedData.records);
    }
}
