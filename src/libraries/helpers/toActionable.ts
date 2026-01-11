import {ActionablePlainSwap, ActionableRegexSwap} from "../types/savedata/actionable";
import {Action} from "../types/savedata/action";
import {PlainSwap, RegexSwap} from "../types/savedata/swapDef";

export function toActionablePlain(swap: PlainSwap): ActionablePlainSwap {
    return {
        ...swap,
        action: Action.None,
    };
}

export function toActionableRegex(swap: RegexSwap): ActionableRegexSwap {
    return {
        ...swap,
        action: Action.None,
    };
}
