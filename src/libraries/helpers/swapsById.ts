import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

export function swapsById(a: SavedSwapDefinition, b: SavedSwapDefinition) {
    return a.id - b.id;
}
