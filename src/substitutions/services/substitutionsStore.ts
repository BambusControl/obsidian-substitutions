import {ModifiableSubstitutionRecords, SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";

export interface SubstitutionsStore {
    getSubstitutionRecords(): Promise<SubstitutionRecords>;
    getModifiableSubstitutionRecords(): Promise<ModifiableSubstitutionRecords>;
    overwriteSubstitutionRecords(records: ModifiableSubstitutionRecords): Promise<void>;
}
