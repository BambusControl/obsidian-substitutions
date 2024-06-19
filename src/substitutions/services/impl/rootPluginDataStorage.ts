import {PersistCache} from "../../../libraries/types/persistCache";
import {CURRENT_VERSION, SaveData} from "../../../libraries/types/savedata/saveData";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {importData} from "../../../libraries/helpers/importData";
import {RootDataStore} from "../rootDataStore";
import {SubstitutionsData} from "../../../libraries/types/savedata/substitutionsData";

export class RootPluginDataStorage implements RootDataStore {

    private storedData: PersistCache<SaveData>;

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new PersistCache(
            () => importData(dataLoader),
            (data) => dataLoader.saveData(data)
        );
    }

    async isInitialized(): Promise<boolean> {
        const data = await this.storedData.get();
        return data.initialized
            && data.version === CURRENT_VERSION
        ;
    }

    async setInitialized(value: boolean): Promise<void> {
        await this.mergeData({
            initialized: value,
        });
    }

    async isCurrentVersion(): Promise<boolean> {
        const saveDataVersion = (await this.storedData.get()).version;
        console.info(`Plugin version: ${CURRENT_VERSION}`);
        console.info(`Data version: ${saveDataVersion}`);
        return saveDataVersion === CURRENT_VERSION;
    }

     async getSubstitutions(): Promise<SubstitutionsData> {
        return (await this.storedData.get()).substitutions;
    }

    async overwriteSubstitutions(substitutions: SubstitutionsData): Promise<SubstitutionsData> {
        const mergedData = await this.mergeData({
            substitutions: substitutions,
        });

        return mergedData.substitutions;
    }

    async setInitializedSubstitutions(value: boolean): Promise<void> {
        const data = await this.getSubstitutions();
        const mergedData: SubstitutionsData = {
            ...data,
            initialized: value,
        };

        await this.overwriteSubstitutions(mergedData);
    }

    private async mergeData(data: Partial<SaveData>): Promise<SaveData> {
        const storedData = await this.storedData.get();

        const newData: SaveData = {
            ...storedData,
            ...data,
            version: data.initialized ? CURRENT_VERSION : storedData.version,
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
