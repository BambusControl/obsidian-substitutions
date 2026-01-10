import {SwapDef} from "./swapDef";
import {RegexMatch} from "./regexMatch";

export function intoRegexMatch(text: string, match: SwapDef): null | RegexMatch {
    const regexInput = match.from;

    // This expression has two parts.
    // 1. The regex source:  Match every character from the start of the line to
    //                       just before the final forward slash ('/').
    // 2. The flags, if any: Match every character after the last slash,
    //                       to the end of the line.
    const regexPattern = /^\/(.+)\/([^/]*)$/;
    const query = regexInput.match(regexPattern);

    if (query == null) {
        console.error("Invalid regex pattern: " + regexInput);
        return null;
        //throw new SubstitutionsError("Invalid regex pattern: " + regexInput)
    }

    const regExp = new RegExp(query[1], query[2]);
    const reMatch = regExp.exec(text);

    if (reMatch == null) {
        console.error("No match found for regex: " + regexInput);
        return null;
        //throw new SubstitutionsError("No match found for regex: " + regexInput);
    }

    const textToReplace = reMatch[0];
    const replaceWith = textToReplace.replace(regExp, match.to);

    return {
        pattern: regExp,
        text: text,
        replaceText: textToReplace,
        replaceWith: replaceWith
    } as RegexMatch;
}
