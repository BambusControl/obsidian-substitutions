import {SaveDataVersion} from "../types/savedata/version";


export interface InitialSaveData {
    initialized: boolean;
    version: SaveDataVersion & "0.1.0";

    substitutions: {
        initialized: boolean;
        records: Array<Record>
    }
}

interface Record {
    from: string;
    to: string;
    enabled: boolean;
}

export function isInitialSaveData(object: Partial<InitialSaveData>): object is InitialSaveData {
    return object != null
        && "initialized" in object
        && "version" in object

        && "substitutions" in object
        && object.substitutions != null
        && "initialized" in object.substitutions

        && "records" in object.substitutions
        && object.substitutions.records != null
        && object.substitutions.records.every(r => isRecord(r))
        ;
}

function isRecord(object: Partial<Record>): object is Record {
    return object != null
        && "from" in object
        && "to" in object
        && "enabled" in object
        && object.from != null
        && object.to != null
        && object.enabled != null
        ;
}
