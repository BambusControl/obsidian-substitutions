import {StateEffect} from "@codemirror/state";

import {TextReplacement} from "../type/textReplacement";

export const substitutionEffect = {
    record: StateEffect.define<string>(),
    replace: StateEffect.define<TextReplacement>(),
    revert: StateEffect.define(),
}
