import {ActionableSwap} from "../types/savedata/actionable";
import {Action} from "../types/savedata/action";

import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

export function toActionable(swap: SavedSwapDefinition): ActionableSwap {
    return {
        ...swap,
        action: Action.Modify,
    };
}
