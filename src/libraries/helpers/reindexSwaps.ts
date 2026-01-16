import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";
import {swapsById} from "./swapsById";

export function reindexSwaps(swaps: SavedSwapDefinition[]): SavedSwapDefinition[] {
    const formerLength = swaps.length;
    for (let i = 0; i < formerLength; i++) {
        swaps[i].id = i;
    }
    return swaps.sort(swapsById);
}
