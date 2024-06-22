import {RootDataStore} from "../rootDataStore";
import {
    ModifiableSubstitutionRecords,
    SubstitutionRecords
} from "../../../libraries/types/savedata/substitutionRecords";
import {SubstitutionsStore} from "../substitutionsStore";
import {recordFilled} from "../../../libraries/helpers/recordFilled";
import {toModifiable} from "../../../libraries/helpers/toModifiable";
import {removeIdentifier} from "../../../libraries/helpers/removeIdentifier";
import {recordNotDeleted} from "../../../libraries/helpers/recordNotDeleted";

export class SubstitutionsStorage implements SubstitutionsStore {

    constructor(
        private readonly store: RootDataStore,
        private readonly substitutionsModifiedCallback: (records: SubstitutionRecords) => void
    ) {
    }

    async getSubstitutionRecords(): Promise<SubstitutionRecords> {
        return (await this.store.getSubstitutions()).records;
    }

    async getModifiableSubstitutionRecords(): Promise<ModifiableSubstitutionRecords> {
        const substitutions = await this.getSubstitutionRecords();
        return substitutions.map(toModifiable);
    }

    async overwriteSubstitutionRecords(modifiedRecords: ModifiableSubstitutionRecords): Promise<void> {
        const originalData = await this.store.getSubstitutions();

        const filledRecords = new Array(...modifiedRecords.values())
                .filter(recordFilled);

        const records = filledRecords
                    .filter(recordNotDeleted)
                    .map(removeIdentifier);

        const savedSubstitutions = await this.store.overwriteSubstitutions({
            ...originalData,
            records: records,
        });

        this.substitutionsModifiedCallback(savedSubstitutions.records)
    }
}
