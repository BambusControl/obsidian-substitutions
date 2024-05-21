import {SubstitutionRecord} from "../types/savedata/substitutionRecord";
import {SubstitutionRecordMatch} from "../types/savedata/substitutionRecordMatch";

export function toMatch(value: SubstitutionRecord, index: number): SubstitutionRecordMatch {
    return {
        ...value,
        couldMatch: value.enabled,
        isMatch: false,
    };
}
