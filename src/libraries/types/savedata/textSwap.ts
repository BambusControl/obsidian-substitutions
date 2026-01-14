import {isSwapKind, SwapKind} from "./swapKind";

export interface TextSwap {
    kind: SwapKind;
    source: string;
    replacement: string;
}

export function isTextSwap(object: any): object is TextSwap {
    return object != null
        && "kind" in object
        && isSwapKind(object.kind)
        && "source" in object
        && typeof object.source === "string"
        && "replacement" in object
        && typeof object.replacement === "string"
        ;
}
