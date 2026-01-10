import {ModifiableSwapDef} from "../types/savedata/modifiableSwapDef";
import {SwapDef} from "../types/savedata/swapDef";

export function removeIdentifier(value: ModifiableSwapDef): SwapDef {
    return {
        from: value.from,
        to: value.to,
        enabled: value.enabled,
        regex: value.regex
    };
}
