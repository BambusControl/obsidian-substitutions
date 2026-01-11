import {PlainSwap, RegexSwap} from "../types/savedata/swapDef";
import {ActionablePlainSwap, ActionableRegexSwap, ActionableSwap} from "../types/savedata/actionable";

export function removeActionPlain(value: ActionablePlainSwap): PlainSwap {
    return {
        source: value.source,
        replacement: value.replacement,
        enabled: value.enabled,
    };
}

export function removeActionRegex(value: ActionableRegexSwap): RegexSwap {
    return {
        source: value.source,
        replacement: value.replacement,
        enabled: value.enabled,
    };
}
