import {RootDataStore} from "../rootDataStore";
import {ModifiableSubstitutionRecords} from "../../../libraries/types/savedata/substitutionRecords";
import {SubstitutionsStore} from "../substitutionsStore";
import {recordFilled} from "../../../libraries/helpers/recordFilled";
import {toModifiable} from "../../../libraries/helpers/toModifiable";
import {removeIdentifier} from "../../../libraries/helpers/removeIdentifier";

export class SubstitutionsStorage implements SubstitutionsStore {

    constructor(
        private readonly store: RootDataStore,
    ) {
    }

    async getSubstitutionRecords(): Promise<ModifiableSubstitutionRecords> {
        const substitutions = await this.store.getSubstitutions();
        return substitutions.records.map(toModifiable);
    }

    async overwriteSubstitutionRecords(modifiedRecords: ModifiableSubstitutionRecords): Promise<void> {
        /* TODO: check validity of substitutions */
        const subs = await this.store.getSubstitutions();

        const records = new Array(...modifiedRecords.values())
            .filter(recordFilled)
            .map(removeIdentifier)
        ;

        await this.store.overwriteSubstitutions({
            ...subs,
            records: records,
        });
    }

}

