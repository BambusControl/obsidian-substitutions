import {SubstitutionString} from "./substitutionString";

export type StateFieldType = {
    cache: string,
    replaced: boolean,
    subs: SubstitutionString | null,
};
