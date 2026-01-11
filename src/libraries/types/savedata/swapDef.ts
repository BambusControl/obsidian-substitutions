export interface SwapDefinition {
    enabled: boolean;
}

export function isSwapDefinition(object: any): object is SwapDefinition {
    return object != null
        && "enabled" in object
        && typeof object.enabled === "boolean"
    ;
}

export interface PlainSwap extends SwapDefinition {
    source: string;
    replacement: string;
}

export function isPlainSwap(object: any): object is PlainSwap {
    return isSwapDefinition(object)
        && "source" in object
        && typeof object.source === "string"
        && "replacement" in object
        && typeof object.replacement === "string"
    ;
}

export interface RegexSwap extends SwapDefinition {
    source: string;
    replacement: string;
}

export function isRegexSwap(object: any): object is RegexSwap {
    return isSwapDefinition(object)
        && "source" in object
        && object.source != null
        && typeof object.source === "string"
        && "replacement" in object
        && typeof object.replacement === "string"
    ;
}
