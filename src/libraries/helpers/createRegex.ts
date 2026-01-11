import {SubstitutionsError} from "../../substitutions/errors/substitutionsError";

export function createRegex(regexInput: string): RegExp {
    // This expression has two parts.
    // 1. The regex source:  Match every character from the start of the line to
    //                       just before the final forward slash ('/').
    // 2. The flags, if any: Match every character after the last slash,
    //                       to the end of the line.
    const regexPattern = /^\/(.+)\/([^/]*)$/;
    const query = regexInput.match(regexPattern);

    if (query == null) {
        throw new SubstitutionsError("Invalid regex pattern: " + regexInput)
    }

    return new RegExp(query[1], query[2]);
}
