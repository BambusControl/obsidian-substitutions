import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {MaybePromise} from "../../types/maybePromise";
import {Setting} from "obsidian";
import {recordFilled} from "../recordFilled";
import {toggleSubstitution} from "./toggleSubstitution";
import {substituteFrom} from "./substituteFrom";
import {removeSubstitution} from "./removeSubstitution";
import {substituteWith} from "./substituteWith";

export function createNewSubstitutionInputs(
    container: HTMLElement,
    record: ModifiableSubstitutionRecord,
    fillCallback: () => MaybePromise<void>,
): Setting {
    const setting = new Setting(container)
        .setClass("substitution-record");

    if (recordFilled(record)) {
        setting.setClass("filled-substitution");
    }

    return setting
        .addToggle(toggleSubstitution(record))
        .addText(substituteFrom(record, setting, fillCallback))
        .addText(substituteWith(record, setting, fillCallback));
}
