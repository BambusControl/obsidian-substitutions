import {ModifiableSwapDef} from "../types/savedata/modifiableSwapDef";
import {Action} from "../types/savedata/action";

export function swapNotDeleted(swap: ModifiableSwapDef): boolean {
    return swap.action != Action.Delete;
}
