import {DataFragment} from "./dataFragment";
import {PlainSwap, RegexSwap} from "./swapDef";

/**
 * User saved swap definitions
 */
export interface SwapFragment extends DataFragment {

    /**
     * Simple, plaintext swap definitions
     */
    plain: PlainSwap[];

    /**
     * Advanced, regex swap definitions
     */
    regex: RegexSwap[];
}
