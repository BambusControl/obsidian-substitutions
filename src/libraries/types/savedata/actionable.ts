import {Action} from "./action";

import {SavedSwapDefinition} from "./savedSwapDefinition";

export interface ActionableSwap extends SavedSwapDefinition {
    action: Action;
}
