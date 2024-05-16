import {StateEffect} from "@codemirror/state";

import {SubstitutionString} from "./substitutionString";

export const effects = {
    record: StateEffect.define<string>(),
    replace: StateEffect.define<SubstitutionString>(),
    revert: StateEffect.define(),
}
