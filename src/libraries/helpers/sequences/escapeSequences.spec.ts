import {escapeSequences} from "./escapeSequences";
import {initializationData} from "../../data/initializationData";

describe("escapeSequences", () => {

    it("should escape a newline character", () => {
        const input = "before \n after";
        const expected = "before \\n after";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should escape a tab character", () => {
        const input = "column1\tcolumn2";
        const expected = "column1\\tcolumn2";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should escape a backspace character", () => {
        const input = "oops\b";
        const expected = "oops\\b";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should correctly handle an escaped backslash followed by \"n\"", () => {
        const input = "before \\n after";  // raw: before \n after
        const expected = "before \\\\n after"; // raw: before \\n after
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should escape a double backslash to a single backslash", () => {
        const input = "C:\\Users\\Test";
        const expected = "C:\\\\Users\\\\Test";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should handle multiple and mixed escape sequences correctly", () => {
        const input = "first line\n\tsecond line with \\ a backslash";
        const expected = "first line\\n\\tsecond line with \\\\ a backslash";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should return the string unchanged if no targeted sequences are present", () => {
        const expected = "This is a plain string with no escapes.";
        expect(escapeSequences(expected)).toBe(expected);
    });

    it("should escape backslashes even when they form an unknown escape sequence", () => {
        const input = "An unsupported sequence: \\q or \\z";
        const expected = "An unsupported sequence: \\\\q or \\\\z";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should return an empty string if the expected is empty", () => {
        const expected = "";
        expect(escapeSequences(expected)).toBe("");
    });

    it("should handle sequences at the start and end of the string", () => {
        const input = "\nstart and end\t";
        const expected = "\\nstart and end\\t";
        expect(escapeSequences(input)).toBe(expected);
    });

    it("should handle all default substitutions correctly", () => {
        for (const record of initializationData().substitutions.records) {
            expect(escapeSequences(record.from)).toBe(record.from);
            expect(escapeSequences(record.to)).toBe(record.to);
        }
    });

});
