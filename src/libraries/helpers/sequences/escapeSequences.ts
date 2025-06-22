/**
 * Escapes a targeted set of special characters in a string.
 * This is the perfect opposite of `unescapeSequences`. It converts newline,
 * tab, backspace, and backslash characters into their respective literal
 * string representations (`"\\n"`, `"\\t"`, `"\\b"`, `"\\\\"`).
 *
 * @param str The input string containing special characters to escape.
 * @returns A new string with the specified characters escaped.
 * @see unescapeSequences
 */
export function escapeSequences(str: string): string {
    return str.replace(
        /[\n\t\b\\]/g,
        (match) => ({
            "\n": "\\n",   // Newline
            "\t": "\\t",   // Horizontal tab
            "\b": "\\b",   // Backspace
            "\\": "\\\\",  // Backslash
        }[match] || match)
    );
}
