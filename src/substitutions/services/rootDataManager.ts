import {PersistCache} from "../../libraries/types/persistCache";
import {isTypeDataFragment} from "../../libraries/helpers/isTypeDataFragment";
import {DataManager} from "./dataManager";
import {MetaDataManager} from "./metaDataManager";
import {isInitialSaveData} from "../../libraries/helpers/initialSaveData";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {SwapDataManager} from "./swapDataManager";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {SaveData, SaveDataOf} from "../../libraries/types/savedata/saveData";
import {PlainSwap} from "../../libraries/types/savedata/swapDef";

type MetaSaveDataFragments = Omit<SaveDataOf<DataFragment>, "meta"> & { meta: MetaFragment };

export class RootDataManager implements DataManager {
    constructor(
        private readonly storedData: PersistCache<any>,
        private readonly metaDm: MetaDataManager,
        private readonly swapDm: SwapDataManager,
    ) {
    }

    async initializeData(): Promise<void> {
        console.group("Save data initialization");
        /* We don't know what we will load */
        const loadedData: any = (await this.storedData.get()) ?? {};

        /* First, migrate data from the initial release */
        const migratedData = RootDataManager.initialMigration(loadedData);

        /* Make sure the data is well-shaped */
        const shapedData = RootDataManager.shapeLoadedData(migratedData);

        /* Full initialization of meta-data, because other fragments need to process its events */
        const loadedDataWithMeta = await this.initMeta(shapedData);

        /* Now we let each data fragment handle initialization of its data if needed */
        console.group("Initializing data");
        const initializedData = this.initData(loadedDataWithMeta);
        console.groupEnd();

        /* After this, each data fragment manager can request fragments data */
        this.storedData.set(initializedData);

        /* Each data fragment can update its data if needed */
        console.group("Updating data");
        const upToDateData = await this.updateData(initializedData);
        console.groupEnd();

        /* Finally, persist the data */
        console.info("Saving initialized data");
        this.storedData.set(upToDateData);
        await this.storedData.persist();
        console.groupEnd();
    }

    private async initMeta(fragments: SaveDataOf<DataFragment>): Promise<MetaSaveDataFragments> {
        /* Does the skeleton have data? */
        const initializedMeta = this.metaDm.initData(fragments.meta);

        /* Is the data up to date with the latest data version? */
        const upToDateMeta = await this.metaDm.updateData(initializedMeta, new Set([]));

        /* Check and create the shape of save-data if missing */
        return {
            ...fragments,
            meta: upToDateMeta,
        };
    }

    private initData(fragments: MetaSaveDataFragments): SaveData {
        const filterData = this.swapDm.initData(fragments.swap);

        return {
            ...fragments,
            swap: filterData,
        };
    }

    private async updateData(initializedData: SaveData): Promise<SaveData> {
        /* We load the meta-data first, to be able to process events like re-downloading of characters etc. */
        const metaData = await this.metaDm.updateData(initializedData.meta, new Set([]));
        const events = new Set(metaData.events);
        console.info("Events to process", events);

        /* All the other updates see the events and handle them accordingly */
        const filterData = await this.swapDm.updateData(initializedData.swap, events);

        console.info("Unprocessed events", events);
        metaData.events = Array.from(events);

        return {
            meta: metaData,
            swap: filterData,
        };
    }

    private static shapeLoadedData(loadedData: any): SaveDataOf<DataFragment> {
        /* Check and create the shape of save-data if missing
         * Removing any element will remove it from save data
         */
        return {
            meta: RootDataManager.createFragment(loadedData.meta),
            swap: RootDataManager.createFragment(loadedData.swap),
        };
    }

    private static createFragment(dataPart: any): DataFragment {
        return isTypeDataFragment(dataPart)
            ? dataPart
            : {
                initialized: false,
                version: CURRENT_DATA_VERSION,
            };
    }

    /**
     * Migration of data created before the save-data update
     * Only the data version of "0.1.0" is migrated
     */
    private static initialMigration(loadedData: any): Pick<SaveData, "swap"> {
        const shouldMigrate = isInitialSaveData(loadedData)
            && loadedData.initialized
            && loadedData.version === "0.1.0";

        if (!shouldMigrate) {
            return loadedData;
        }

        console.info("Migrating from data version 0.1.0");

        return {
            swap: {
                version: loadedData.version,
                initialized: loadedData.initialized,
                plain: loadedData.substitutions.records.map(r => ({
                    source: r.from,
                    replacement: r.to,
                    enabled: r.enabled,
                } as PlainSwap)),
                regex: [],
            },
        }
    }
}
