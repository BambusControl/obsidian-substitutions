import {ActionablePlainSwap, ActionableRegexSwap} from "../types/savedata/actionable";
import {Action} from "../types/savedata/action";
import {PlainSwap, RegexSwap} from "../types/savedata/swapDef";

export function newModifiablePlainSwapDef(placeholder?: Partial<PlainSwap>): ActionablePlainSwap {
    return {
        source: "",
        replacement: "",
        enabled: true,
        ...placeholder,
        action: Action.Create,
    } as ActionablePlainSwap;
}

export function newModifiableRegexSwapDef(placeholder?: Partial<RegexSwap>): ActionableRegexSwap {
    return {
        source: "",
        replacement: "",
        enabled: true,
        ...placeholder,
        action: Action.Create,
    } as ActionableRegexSwap;
}
