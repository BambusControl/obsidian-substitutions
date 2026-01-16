import { TextReplacement } from "../../../libraries/types/textReplacement";
import { createRegex } from "../../../libraries/helpers/createRegex";
import { TextSwap } from "../../../libraries/types/savedata/textSwap";

export function matchSwapToText(targetString: string, swap: TextSwap): TextReplacement | null {
    if (swap.kind === "plain" && targetString.endsWith(swap.source)) {
        return {
            from: swap.source,
            to: swap.replacement
        };
    }

    if (swap.kind === "regex") {
        const pattern = createRegex(swap.source)
        const reMatch = pattern?.exec(targetString);

        if (pattern == null || reMatch == null) {
            return null;
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
