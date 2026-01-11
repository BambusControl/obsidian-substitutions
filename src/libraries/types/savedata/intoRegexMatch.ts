import {RegexSwap} from "./swapDef";
import {RegexMatch} from "./regexMatch";
import {createRegex} from "../../helpers/createRegex";

/**
 * @see https://github.com/obsidian-tasks-group/obsidian-tasks/blob/39d9f5ad7b6d7c65ae0fa67d5e69bb43bc945d5d/src/Query/Matchers/RegexMatcher.ts
 */
export function intoRegexMatch(text: string, match: RegexSwap): null | RegexMatch {
    const pattern = createRegex(match.source)
    const reMatch = pattern.exec(text);

    if (reMatch == null) {
        return null;
        // TODO fix error handling
        //throw new SubstitutionsError("No match found for regex: " + regexInput);
    }

    console.info("Regex Match: " + pattern);
    const textToReplace = reMatch[0];
    const replaceWith = textToReplace.replace(pattern, match.replacement);

    return {
        source: textToReplace,
        replacement: replaceWith
    } as RegexMatch;
}
