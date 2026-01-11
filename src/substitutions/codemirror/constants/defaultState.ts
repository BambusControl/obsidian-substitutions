import {SubstitutionsState} from "../../../libraries/types/substitutionsState";

export function defaultState(value?: Partial<SubstitutionsState>): SubstitutionsState {
    return {
        ...DEFAULTS,
        ...value,
    };
}

const DEFAULTS: SubstitutionsState = {
    cache: "",
    plainSwaps: [],
    regexSwaps: [],
    replacement: null,
};
