/**
 * A pattern for matching a valid regular expression: `/pattern$/flags`
 * The flags `g` and `y` cannot be used because we only want a single match.
 * The `$` inside the pattern is mandatory because we only want to match the tail of the text.
 * @example /[a-z]+$/i
 */
export const REGEX_LITERAL_PATTERN = /^\/(.+)\$\/([^/gy]*)$/;

export function createRegex(regexInput: string): RegExp | null {
    const match = REGEX_LITERAL_PATTERN.exec(regexInput);

    if (match == null) {
        return null;
    }

    const source = `${match[1]}$`;
    const flags = match[2] ?? "";
    return new RegExp(source, flags);
}
