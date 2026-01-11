import {MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {SwapFragment} from "../../libraries/types/savedata/swapFragment";

export interface RootDataStore {
    getMeta(): Promise<MetaFragment>
    overwriteMeta(data: MetaFragment): Promise<MetaFragment>

    getSwap(): Promise<SwapFragment>
    overwriteSwap(data: SwapFragment): Promise<SwapFragment>
}
