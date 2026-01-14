import {PersistCache} from "../../libraries/types/persistCache";
import {SaveData} from "../../libraries/types/savedata/saveData";
import {MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {UserSwapFragment} from "../../libraries/types/savedata/userSwapFragment";

export class RootPluginDataStorage {

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

    async getSwap(): Promise<UserSwapFragment> {
        return (await this.storedData.get()).swap;
    }

    async overwriteSwap(data: UserSwapFragment): Promise<UserSwapFragment> {
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
