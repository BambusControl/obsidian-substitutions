import {RootDataStore} from "../rootDataStore";
import {DataInitializer} from "../dataInitializer";
import {initializationData} from "../../../libraries/data/initializationData";

export class NewDataInitializer implements DataInitializer {
    constructor(
        private readonly dataStore: RootDataStore,
    ) {
    }

    async initializeData(): Promise<void> {
        DEVELOPMENT: console.group("Initializing local data");
        await this.initializeAll();
        DEVELOPMENT: console.groupEnd();
    }

    private async initializeAll() {
        if (await this.dataStore.isInitialized()) {
            DEVELOPMENT: console.info("Plugin data already initialized");
            return;
        }

        if (!await this.dataStore.isCurrentVersion()) {
            DEVELOPMENT: console.log("Plugin and Data version mismatch, reinitializing")
            await this.dataStore.setInitialized(false);
            await this.dataStore.setInitializedSubstitutions(false);
        }

        await this.initializeSubstitutions();

        DEVELOPMENT: console.info("Flagging local data as initialized");
        await this.dataStore.setInitialized(true);
    }

    private async initializeSubstitutions() {
        const SubstitutionsInitialized = (await this.dataStore.getSubstitutions()).initialized;

        if (SubstitutionsInitialized) {
            DEVELOPMENT: console.info("Substitutions data already initialized");
            return;
        }

        DEVELOPMENT: console.info("Substitutions initialization");

        await this.dataStore.overwriteSubstitutions({
            ...initializationData().substitutions,
            initialized: true,
        });
    }
}
