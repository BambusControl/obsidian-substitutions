import {Action} from "./action";
import {PlainSwap, RegexSwap} from "./swapDef";

export interface Actionable {
    action: Action;
}

export type ActionableSwap = Actionable & (PlainSwap | RegexSwap);
export type ActionablePlainSwap = Actionable & PlainSwap;
export type ActionableRegexSwap = Actionable & RegexSwap;
