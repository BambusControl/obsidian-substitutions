import { matchSwapToText } from "./matchSwapToText";
import { TextSwap } from "../../../libraries/types/savedata/textSwap";

describe("matchSwapToText", () => {
    it("matches plain swaps only on suffix", () => {
        const swap: TextSwap = { kind: "plain", source: "->", replacement: "→" };

        expect(matchSwapToText("a->", swap)).toEqual({ from: "->", to: "→" });
        expect(matchSwapToText("->a", swap)).toBeNull();
        expect(matchSwapToText("a-", swap)).toBeNull();
    });

    it("matches regex swaps only when match ends at cursor", () => {
        const swap: TextSwap = { kind: "regex", source: "/\\d+$/", replacement: "#" };

        expect(matchSwapToText("abc123", swap)).toEqual({ from: "123", to: "#" });
        expect(matchSwapToText("123abc", swap)).toBeNull();
    });

    it("returns null on invalid regex pattern", () => {
        const swap: TextSwap = { kind: "regex", source: "not a regex", replacement: "x" };

        expect(() => matchSwapToText("anything", swap)).not.toThrow();
        expect(matchSwapToText("anything", swap)).toBeNull();
    });
});
