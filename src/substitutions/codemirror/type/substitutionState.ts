import {TextReplacement} from "./textReplacement";
import {SubstitutionRecordMatches} from "../../../libraries/types/savedata/substitutionRecords";

export type SubstitutionState = {
    cache: string,
    replaced: boolean,
    length: number;
    matches: SubstitutionRecordMatches,
    substitution: TextReplacement | null,
};
