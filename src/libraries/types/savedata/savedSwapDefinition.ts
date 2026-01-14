import {isTextSwap, TextSwap} from "./textSwap";
import {SwapDefId} from "./swapDefId";

export interface SavedSwapDefinition extends TextSwap {
    id: SwapDefId,
    enabled: boolean;
}

function isValidId(object: any): boolean {
    return object != null
        && typeof object === "number"
        && Number.isInteger(object)
        && object >= 0;
}

export function isSwapDefinition(object: any): object is SavedSwapDefinition {
    return isTextSwap(object)
        && "id" in object
        && isValidId(object.id)
        && "enabled" in object
        && typeof object.enabled === "boolean"
        ;
}
