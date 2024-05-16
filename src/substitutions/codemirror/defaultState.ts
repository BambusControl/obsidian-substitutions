import {StateFieldType} from "./stateFieldType";

export function defaultState(value?: Partial<StateFieldType>): StateFieldType {
    return {
        ...def,
        ...value,
    }
}

export const def: StateFieldType = {
    cache: "",
    replaced: false,
    subs: null,
}
