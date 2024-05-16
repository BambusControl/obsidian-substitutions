import {Extension} from "@codemirror/state";
import {inputHandler} from "./inputHandler";
import {stateField} from "./stateField";

export function substitution(): Extension {
    return [
        inputHandler,
        stateField,
    ]
}
