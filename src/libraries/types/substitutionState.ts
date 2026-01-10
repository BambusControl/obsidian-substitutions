import {TextReplacement} from "./textReplacement";
import {SubstitutionRecord} from "./savedata/substitutionRecord";

export interface SubstitutionState {
    cache: string,
    readonly matches: SubstitutionRecord[],
    substitution: TextReplacement | null,
}
