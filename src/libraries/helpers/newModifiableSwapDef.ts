import {ModifiableSwapDef} from "../types/savedata/modifiableSwapDef";
import {Action} from "../types/savedata/action";
import {SwapDef} from "../types/savedata/swapDef";

export function newModifiableSwapDef(
    placeholder?: Partial<SwapDef>,
): ModifiableSwapDef {
    return {
        ...{
            from: "",
            to: "",
            enabled: true,
            regex: false,
        },
        ...placeholder,
        ...{
            id: -1,
            action: Action.Create,
        }
    };
}
