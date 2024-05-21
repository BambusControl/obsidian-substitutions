import {TextReplacement} from "./textReplacement";
import {SubstitutionRecordMatches} from "../../../libraries/types/savedata/substitutionRecords";

export type SubstitutionState = {
    cache: string,
    readonly length: number;
    readonly matches: SubstitutionRecordMatches,
    substitution: TextReplacement | null,
};
