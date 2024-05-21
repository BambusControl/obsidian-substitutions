import {SubstitutionRecord} from "./substitutionRecord";

export interface SubstitutionRecordMatch extends SubstitutionRecord {
    couldMatch: boolean;
    isMatch: boolean;
}
