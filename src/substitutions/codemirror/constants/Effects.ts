import {StateEffect} from "@codemirror/state";

import {TextReplacement} from "../../../libraries/types/textReplacement";

export const effects = {
    /**
     * Update the target string to check for substitution
     */
    update: StateEffect.define(),

    /**
     * Replace the target string with a substitute
     */
    replace: StateEffect.define<TextReplacement>(),

    /**
     * Replace substitution with the former target string.
     */
    revert: StateEffect.define(),
};
