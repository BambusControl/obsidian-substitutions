import {TextReplacement} from "../../../libraries/types/textReplacement";
import {createRegex} from "../../../libraries/helpers/createRegex";
import {TextSwap} from "../../../libraries/types/savedata/textSwap";

export function matchSwapToText(targetString: string, swap: TextSwap): TextReplacement | null {
    if (swap.kind === "plain" && targetString.endsWith(swap.source)) {
        return {
            from: swap.source,
            to: swap.replacement
        };
    }

    // TODO: move regex parsing into initialization of the extension
    if (swap.kind === "regex") {
        const pattern = createRegex(swap.source)
        const reMatch = pattern.exec(targetString);

        if (reMatch == null) {
            return null;
            // TODO fix error handling
            //console.log("No match found for regex", { pattern, targetString})
            //throw new SubstitutionsError("No match found for regex: " + regexInput);
        }

        const textToReplace = reMatch[0];
        const replaceWith = textToReplace.replace(pattern, swap.replacement);

        return {
            from: textToReplace,
            to: replaceWith
        };
    }

    return null;
}
