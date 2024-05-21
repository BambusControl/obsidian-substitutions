import {SubstitutionsData} from "../../libraries/types/savedata/substitutionsData";

export interface RootDataStore {
    isInitialized(): Promise<boolean>;
    setInitialized(value: boolean): Promise<void>
    isCurrentVersion(): Promise<boolean>;

    getSubstitutions(): Promise<SubstitutionsData>
    overwriteSubstitutions(substitutions: SubstitutionsData): Promise<SubstitutionsData>
    setInitializedSubstitutions(value: boolean): Promise<void>
}
