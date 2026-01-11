import {MetaFragment} from "./metaFragment";
import {DataFragment} from "./dataFragment";
import {SwapFragment} from "./swapFragment";

/**
 * Generic structure of `data.json`
 */
export interface SaveDataOf<T> {
    /**
     * Metadata information about the save data itself
     */
    meta: T;
    swap: T;
}

/**
 * Structure of `data.json`, where each fragment is a self-managed data fragment
 */
export interface SaveData extends SaveDataOf<DataFragment> {
    meta: MetaFragment;
    swap: SwapFragment;
}
