import {SaveData} from "../types/savedata/saveData";

export function isTypeSaveData(object: Partial<SaveData>): object is SaveData {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}
