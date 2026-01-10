import {SwapDefinitionsData} from "../../libraries/types/savedata/swapDefinitionsData";

export interface RootDataStore {
    isInitialized(): Promise<boolean>;

    setInitialized(value: boolean): Promise<void>;

    isCurrentVersion(): Promise<boolean>;

    getSwapDefinitionData(): Promise<SwapDefinitionsData>;

    overwriteSwapDefinitionData(swapData: SwapDefinitionsData): Promise<SwapDefinitionsData>;

    setInitializedSwapDefinitionData(value: boolean): Promise<void>;
}
