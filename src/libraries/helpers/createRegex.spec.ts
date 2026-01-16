import {createRegex} from "./createRegex";

describe("createRegex", () => {
    it("parses /pattern$/flags into a working RegExp", () => {
        const re = createRegex("/\\d+$/");

        expect(re).toBeInstanceOf(RegExp);
        expect(re!.test("abc123")).toBe(true);
        expect(re!.test("123abc")).toBe(false);
    });

    it("rejects patterns without $ anchor", () => {
        expect(createRegex("/\\d+/")).toBeNull();
    });

    it("rejects g/y flags", () => {
        expect(createRegex("/\\d+$/g")).toBeNull();
        expect(createRegex("/\\d+$/y")).toBeNull();
    });
});
