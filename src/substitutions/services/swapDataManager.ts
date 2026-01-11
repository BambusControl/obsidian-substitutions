import {DataFragmentManager} from "./dataFragmentManager";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {SwapFragment} from "../../libraries/types/savedata/swapFragment";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {PLAIN_SWAP_DEFAULTS, REGEX_SWAP_DEFAULTS} from "./swapDefaults";
import {isPlainSwap, isRegexSwap} from "../../libraries/types/savedata/swapDef";

export class SwapDataManager implements DataFragmentManager<SwapFragment> {

    initData(fragment: DataFragment): SwapFragment {
        if (fragment.initialized && isSavedSwap(fragment)) {
            return fragment;
        }

        console.info("Initializing swap");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            plain: PLAIN_SWAP_DEFAULTS,
            regex: REGEX_SWAP_DEFAULTS,
        }
    }

    async updateData(fragment: SwapFragment, _: Set<DataEvent>): Promise<SwapFragment> {
        /* No-op yet */
        return fragment;
    }

}

function isSavedSwap(object: DataFragment): object is SwapFragment {
    return "plain" in object
        && "regex" in object
        && Array.isArray(object.plain)
        && Array.isArray(object.regex)
        && object.plain.every(s => isPlainSwap(s))
        && object.regex.every(s => isRegexSwap(s))
    ;
}
