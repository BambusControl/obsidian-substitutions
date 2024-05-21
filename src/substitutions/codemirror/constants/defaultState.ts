import {SubstitutionState} from "../type/substitutionState";

export function defaultState(value?: Partial<SubstitutionState>): SubstitutionState {
    return {
        ...DEFAULTS,
        ...value,
    }
}

const DEFAULTS: SubstitutionState = {
    cache: "",
    length: 0,
    matches: [],
    substitution: null,
}
