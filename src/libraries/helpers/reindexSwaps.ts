import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

export function reindexSwaps(swaps: SavedSwapDefinition[]): SavedSwapDefinition[] {
    const formerLength = swaps.length;
    for (let i = 0; i < formerLength; i++) {
        swaps[i].id = i;
    }
    return swaps;
}
