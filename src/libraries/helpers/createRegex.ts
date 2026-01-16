import {SubstitutionsError} from "../../substitutions/errors/substitutionsError";

/**
 * A pattern for matching a valid regular expression: `/pattern$/flags`
 * The flags `g` and `y` cannot be used because we only want a single match.
 * The `$` inside the pattern is mandatory because we only want to match the tail of the text.
 * @example /[a-z]+$/i
 */
export const REGEX_LITERAL_PATTERN = /^\/(.+)\$\/([^/gy]*)$/;

export function createRegex(regexInput: string): RegExp {
    const isRegex = REGEX_LITERAL_PATTERN.test(regexInput);

    if (!isRegex) {
        throw new SubstitutionsError(`Invalid regex pattern, expected \`/pattern/flags\`, got: ${regexInput}`)
    }

    return new RegExp(regexInput);
}
