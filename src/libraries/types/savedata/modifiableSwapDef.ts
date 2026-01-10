import {SwapDef} from "./swapDef";
import {Action} from "./action";
import {SwapDefId} from "./swapDefId";

export interface ModifiableSwapDef extends SwapDef {
    readonly id: SwapDefId;
    action: Action;
}
