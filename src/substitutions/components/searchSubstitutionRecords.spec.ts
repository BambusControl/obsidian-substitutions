import {normalizeSearchQuery, shouldShowSwapForQuery} from "./searchSubstitutionRecords";

describe("searchSubstitutionRecords", () => {
    it("normalizes search query by trimming and lowering case", () => {
        expect(normalizeSearchQuery("  HeLLo  ")).toBe("hello");
    });

    it("shows all records for empty query", () => {
        expect(shouldShowSwapForQuery({
            id: 0,
            enabled: true,
            kind: "plain",
            source: "abc",
            replacement: "def",
        }, "")).toBe(true);
    });

    it("matches source and replacement content case-insensitively", () => {
        expect(shouldShowSwapForQuery({
            id: 0,
            enabled: true,
            kind: "plain",
            source: "Hello",
            replacement: "World",
        }, "hello")).toBe(true);

        expect(shouldShowSwapForQuery({
            id: 0,
            enabled: true,
            kind: "plain",
            source: "Hello",
            replacement: "World",
        }, "world")).toBe(true);
    });

    it("hides filled non-matching records", () => {
        expect(shouldShowSwapForQuery({
            id: 0,
            enabled: true,
            kind: "plain",
            source: "alpha",
            replacement: "beta",
        }, "gamma")).toBe(false);
    });

    it("keeps incomplete records visible while filtering", () => {
        expect(shouldShowSwapForQuery({
            id: 0,
            enabled: true,
            kind: "plain",
            source: "",
            replacement: "",
        }, "anything")).toBe(true);
    });
});
