import {SubstitutionState} from "../type/substitutionState";

export function defaultState(value?: Partial<SubstitutionState>): SubstitutionState {
    return {
        ...DEFAULTS,
        ...value,
    }
}

const DEFAULTS: SubstitutionState = {
    cache: "",
    replaced: false,
    matches: [],
    substitution: null,
}
