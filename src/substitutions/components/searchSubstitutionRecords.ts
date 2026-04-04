import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";
import {swapFilled} from "../../libraries/helpers/swapFilled";

export function normalizeSearchQuery(query: string): string {
    return query.trim().toLowerCase();
}

export function shouldShowSwapForQuery(
    swap: SavedSwapDefinition,
    query: string,
): boolean {
    if (query === "") {
        return true;
    }

    if (!swapFilled(swap)) {
        return true;
    }

    const searchableText = `${swap.source} ${swap.replacement}`.toLowerCase();

    return searchableText.includes(query);
}
