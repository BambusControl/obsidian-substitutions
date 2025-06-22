/**
 * Unescapes a targeted set of character sequences in a string.
 * Specifically, it converts `"\\n"`, `"\\t"`, `"\\b"`, and `"\\\\"`
 * into their respective single-character representations (newline, tab,
 * backspace, and backslash).
 *
 * @param str The input string containing escaped characters.
 * @returns A new string with the specified sequences unescaped.
 * @see escapeSequences
 */
export function unescapeSequences(str: string): string {
    return str.replace(
        /\\[ntb\\]/g,
        (match) => ({
            "\\n": "\n",   // Newline
            "\\t": "\t",   // Horizontal tab
            "\\b": "\b",   // Backspace
            "\\\\": "\\",  // Backslash
        }[match] || match)
    );
}
