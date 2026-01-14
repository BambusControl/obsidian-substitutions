import {ActionableSwap} from "../types/savedata/actionable";
import {Action} from "../types/savedata/action";

import {SavedSwapDefinition} from "../types/savedata/savedSwapDefinition";

export function newModifiableSwapDef(placeholder?: Partial<SavedSwapDefinition>): ActionableSwap {
    return {
        id: 0,
        kind: "plain",
        source: "",
        replacement: "",
        enabled: true,
        ...placeholder,
        action: Action.Create,
    };
}
