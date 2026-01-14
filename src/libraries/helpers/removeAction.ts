import {ActionableSwap} from "../types/savedata/actionable";
import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

export function removeAction(value: ActionableSwap): SavedSwapDefinition {
    return {
        id: value.id,
        kind: value.kind,
        source: value.source,
        replacement: value.replacement,
        enabled: value.enabled,
    };
}
