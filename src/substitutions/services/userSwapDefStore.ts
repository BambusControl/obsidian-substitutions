import {SwapDef} from "../../libraries/types/savedata/swapDef";
import {ModifiableSwapDef} from "../../libraries/types/savedata/modifiableSwapDef";

export interface UserSwapDefStore {
    getDefinedSwaps(): Promise<SwapDef[]>;

    getModifiableSwaps(): Promise<ModifiableSwapDef[]>;

    overwriteDefinedSwaps(modifiedSwaps: ModifiableSwapDef[]): Promise<void>;

    defineNewSwaps(newSwaps: ModifiableSwapDef[]): Promise<void>;
}
