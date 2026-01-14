import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

export function swapFilled(swap: SavedSwapDefinition): boolean {
    return swap.source != ""
        && swap.replacement != ""
        ;
}
