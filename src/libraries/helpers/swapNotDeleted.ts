import {Actionable} from "../types/savedata/actionable";
import {Action} from "../types/savedata/action";

export function swapNotDeleted(swap: Actionable): boolean {
    return swap.action != Action.Delete;
}
