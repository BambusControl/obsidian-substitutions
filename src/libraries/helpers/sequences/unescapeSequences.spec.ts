import {unescapeSequences} from "./unescapeSequences";
import {initializationData} from "../../data/initializationData";

describe("unescapeSequences", () => {

    it("should unescape a newline character", () => {
        const input = "before \\n after";
        const expected = "before \n after";
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should unescape a tab character", () => {
        const input = "column1\\tcolumn2";
        const expected = "column1\tcolumn2";
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should unescape a backspace character", () => {
        const input = "oops\\b";
        const expected = "oops\b";
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should correctly handle an escaped backslash followed by \"n\"", () => {
        const input = "before \\\\n after"; // raw: before \\n after
        const expected = "before \\n after";  // raw: before \n after
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should unescape a double backslash to a single backslash", () => {
        const input = "C:\\\\Users\\\\Test";
        const expected = "C:\\Users\\Test";
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should handle multiple and mixed escape sequences correctly", () => {
        const input = "first line\\n\\tsecond line with \\\\ a backslash";
        const expected = "first line\n\tsecond line with \\ a backslash";
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should return the string unchanged if no targeted sequences are present", () => {
        const input = "This is a plain string with no escapes.";
        expect(unescapeSequences(input)).toBe(input);
    });

    it("should ignore unsupported escape sequences", () => {
        const input = "An unsupported sequence: \\q or \\z";
        expect(unescapeSequences(input)).toBe(input);
    });

    it("should return an empty string if the input is empty", () => {
        const input = "";
        expect(unescapeSequences(input)).toBe("");
    });

    it("should handle sequences at the start and end of the string", () => {
        const input = "\\nstart and end\\t";
        const expected = "\nstart and end\t";
        expect(unescapeSequences(input)).toBe(expected);
    });

    it("should handle all default substitutions correctly", () => {
        for (const record of initializationData().substitutions.records) {
            expect(unescapeSequences(record.from)).toBe(record.from);
            expect(unescapeSequences(record.to)).toBe(record.to);
        }
    });

});
