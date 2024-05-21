import {SubstitutionRecord} from "../types/savedata/substitutionRecord";

export function recordFilled(record: SubstitutionRecord): boolean {
    return record.from != ""
        && record.to != ""
    ;
}
