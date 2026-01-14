export type SwapKind = "plain" | "regex";

export function isSwapKind(object: any): object is SwapKind {
    return object != null && (
        object === "plain"
        || object === "regex"
    );
}
