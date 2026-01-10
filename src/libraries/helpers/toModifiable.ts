import {SwapDef} from "../types/savedata/swapDef";
import {ModifiableSwapDef} from "../types/savedata/modifiableSwapDef";
import {Action} from "../types/savedata/action";

export function toModifiable(swap: SwapDef, index: number): ModifiableSwapDef {
    return {
        ...swap,
        id: index,
        action: Action.None,
    };
}
