import {DataFragment} from "./dataFragment";

import {SavedSwapDefinition} from "./savedSwapDefinition";

/**
 * User saved swap definitions
 */
export interface UserSwapFragment extends DataFragment {

    /**
     * Definitions of swaps
     */
    definitions: SavedSwapDefinition[];
}
