import {Initializable} from "./initializable";
import {SwapDef} from "./swapDef";

export interface SwapDefinitionsData extends Initializable {
    records: SwapDef[];
}
