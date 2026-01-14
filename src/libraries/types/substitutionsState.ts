import {EditorTextReplacement} from "./textReplacement";

import {TextSwap} from "./savedata/textSwap";

export interface SubstitutionsState {
    cache: string,
    readonly swaps: TextSwap[],
    replacement: EditorTextReplacement | null,
}
