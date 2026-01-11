import {RootDataStore} from "./rootDataStore";
import {PersistCache} from "../../libraries/types/persistCache";
import {SaveData} from "../../libraries/types/savedata/saveData";
import {MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {SwapFragment} from "../../libraries/types/savedata/swapFragment";

export class RootPluginDataStorage implements RootDataStore {

    constructor(
        private readonly storedData: PersistCache<SaveData>,
    ) {
    }

    async getMeta(): Promise<MetaFragment> {
        return (await this.storedData.get()).meta;
    }

    async overwriteMeta(data: MetaFragment): Promise<MetaFragment> {
        const mergedData = await this.mergeData({
            meta: data,
        });

        return mergedData.meta;
    }

    async getSwap(): Promise<SwapFragment> {
        return (await this.storedData.get()).swap;
    }

    async overwriteSwap(data: SwapFragment): Promise<SwapFragment> {
        const mergedData = await this.mergeData({
            swap: data,
        });

        return mergedData.swap;
    }

    private async mergeData(data: Partial<SaveData>): Promise<SaveData> {
        const storedData = await this.storedData.get();

        const newData: SaveData = {
            ...storedData,
            ...data,
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
