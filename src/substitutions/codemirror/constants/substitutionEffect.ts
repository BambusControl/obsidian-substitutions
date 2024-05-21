import {StateEffect} from "@codemirror/state";

import {TextReplacement} from "../../../libraries/types/textReplacement";

export const substitutionEffect = {
    /**
     * Update the target string to check for substitution
     */
    update: StateEffect.define<string>(),

    /**
     * Replace target string with a substitute
     */
    substitute: StateEffect.define<TextReplacement>(),

    /**
     * Replace substitution with the former target string.
     */
    revert: StateEffect.define(),
}
