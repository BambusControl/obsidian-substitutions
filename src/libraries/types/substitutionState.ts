import {TextReplacement} from "./textReplacement";
import {SubstitutionRecordMatches} from "./savedata/substitutionRecords";

export type SubstitutionState = {
    cache: string,
    readonly length: number;
    readonly matches: SubstitutionRecordMatches,
    substitution: TextReplacement | null,
};
