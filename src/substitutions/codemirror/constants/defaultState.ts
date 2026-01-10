import {SubstitutionState} from "../../../libraries/types/substitutionState";

export function defaultState(value?: Partial<SubstitutionState>): SubstitutionState {
    return {
        ...DEFAULTS,
        ...value,
    };
}

const DEFAULTS: SubstitutionState = {
    cache: "",
    matches: [],
    substitution: null,
};
