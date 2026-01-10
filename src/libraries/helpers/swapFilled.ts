import {SwapDef} from "../types/savedata/swapDef";

export function swapFilled(swap: SwapDef): boolean {
    return swap.from != ""
        && swap.to != ""
        ;
}
