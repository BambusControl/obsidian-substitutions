import {reindexSwaps} from "./reindexSwaps";
import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

describe("reindexSwaps", () => {
    it("reassigns ids to 0..n-1 and sorts by id", () => {
        const swaps: SavedSwapDefinition[] = [
            {id: 99, kind: "plain", source: "b", replacement: "B", enabled: true},
            {id: 5, kind: "regex", source: "/a+$/", replacement: "A", enabled: true},
            {id: 42, kind: "plain", source: "c", replacement: "C", enabled: false},
        ];

        const result = reindexSwaps(swaps);

        // Same objects returned (in-place mutation)
        expect(result).toBe(swaps);

        // IDs are sequential
        expect(result.map(s => s.id)).toEqual([0, 1, 2]);

        // Sort order is stable by new ids, which follow original array order
        expect(result.map(s => s.source)).toEqual(["b", "/a+$/", "c"]);
    });

    it("handles empty input", () => {
        const swaps: SavedSwapDefinition[] = [];
        expect(reindexSwaps(swaps)).toEqual([]);
    });
});
