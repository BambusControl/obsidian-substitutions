import {MetaFragment} from "./metaFragment";
import {DataFragment} from "./dataFragment";
import {UserSwapFragment} from "./userSwapFragment";

/**
 * Generic structure of `data.json`
 */
export interface GenericSaveData {
    /**
     * Metadata information about the save data itself
     */
    meta: DataFragment;
    swap: DataFragment;
}

/**
 * Structure of `data.json`, where each fragment is a self-managed data fragment
 */
export interface SaveData {
    meta: MetaFragment;
    swap: UserSwapFragment;
}
