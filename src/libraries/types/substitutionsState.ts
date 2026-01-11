import {TextReplacement} from "./textReplacement";
import {PlainSwap, RegexSwap} from "./savedata/swapDef";

export interface SubstitutionsState {
    cache: string,
    readonly plainSwaps: PlainSwap[],
    readonly regexSwaps: RegexSwap[],
    replacement: TextReplacement | null,
}
