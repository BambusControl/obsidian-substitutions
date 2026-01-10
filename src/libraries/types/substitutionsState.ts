import {TextReplacement} from "./textReplacement";
import {SwapDef} from "./savedata/swapDef";

export interface SubstitutionsState {
    cache: string,
    readonly matches: SwapDef[],
    replacement: TextReplacement | null,
}
