import {DataFragment} from "../types/savedata/dataFragment";

export function isTypeDataFragment(object: any): object is DataFragment {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}
