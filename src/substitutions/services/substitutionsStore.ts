import {SubstitutionRecord} from "../../libraries/types/savedata/substitutionRecord";
import {ModifiableSubstitutionRecord} from "../../libraries/types/savedata/modifiableSubstitutionRecord";

export interface SubstitutionsStore {
    getSubstitutionRecords(): Promise<SubstitutionRecord[]>;

    getModifiableSubstitutionRecords(): Promise<ModifiableSubstitutionRecord[]>;

    overwriteSubstitutionRecords(records: ModifiableSubstitutionRecord[]): Promise<void>;

    addSubstitutionRecords(records: ModifiableSubstitutionRecord[]): Promise<void>;
}
