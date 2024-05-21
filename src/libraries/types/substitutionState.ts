import {TextReplacement} from "./textReplacement";
import {SubstitutionRecords} from "./savedata/substitutionRecords";

export type SubstitutionState = {
    cache: string,
    readonly length: number;
    readonly matches: SubstitutionRecords,
    substitution: TextReplacement | null,
};
