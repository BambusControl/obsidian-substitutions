import {PlainSwap, RegexSwap} from "../types/savedata/swapDef";

export function swapFilled(swap: PlainSwap | RegexSwap): boolean {
    return swap.source != ""
        && swap.replacement != ""
        ;
}
