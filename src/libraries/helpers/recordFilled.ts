import {SubstitutionRecord} from "../types/savedata/substitutionRecord";

export function recordFilled(record: SubstitutionRecord) {
    return record.from != ""
        && record.to != ""
    ;
}
