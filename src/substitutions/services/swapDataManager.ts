import {DataFragmentManager} from "./dataFragmentManager";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {UserSwapFragment} from "../../libraries/types/savedata/userSwapFragment";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {SWAP_DEFAULTS} from "./swapDefaults";

import {isSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";

export class SwapDataManager implements DataFragmentManager<UserSwapFragment> {

    initData(fragment: DataFragment): UserSwapFragment {
        if (fragment.initialized && isSavedSwap(fragment)) {
            return fragment;
        }

        console.info("Initializing swap");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            definitions: SWAP_DEFAULTS,
        }
    }

    async updateData(fragment: UserSwapFragment, _: Set<DataEvent>): Promise<UserSwapFragment> {
        /* No-op yet */
        return fragment;
    }

}

function isSavedSwap(object: DataFragment): object is UserSwapFragment {
    return "definitions" in object
        && Array.isArray(object.definitions)
        && object.definitions.every(s => isSwapDefinition(s))
    ;
}
