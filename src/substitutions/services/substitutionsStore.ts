import {ModifiableSubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";

export interface SubstitutionsStore {
    getSubstitutionRecords(): Promise<ModifiableSubstitutionRecords>;
    overwriteSubstitutionRecords(records: ModifiableSubstitutionRecords): Promise<void>;
}
