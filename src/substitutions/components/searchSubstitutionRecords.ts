import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";

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

    const searchableText = `${swap.source} ${swap.replacement}`.toLowerCase();

    return searchableText.includes(query);
}
