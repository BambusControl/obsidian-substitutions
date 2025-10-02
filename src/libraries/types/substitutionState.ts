import {TextReplacement} from "./textReplacement";
import {SubstitutionRecords} from "./savedata/substitutionRecords";

export interface SubstitutionState {
    cache: string,
    readonly length: number;
    readonly matches: SubstitutionRecords,
    substitution: TextReplacement | null,
}
