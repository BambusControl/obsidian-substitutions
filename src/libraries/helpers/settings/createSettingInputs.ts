import {Setting} from "obsidian";
import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {recordFilled} from "../recordFilled";
import {toggleSubstitution} from "./toggleSubstitution";
import {substituteFrom} from "./substituteFrom";
import {substituteWith} from "./substituteWith";
import {removeSubstitution} from "./removeSubstitution";
import {MaybePromise} from "../../types/maybePromise";

export function createSettingInputs(
    container: HTMLElement,
    record: ModifiableSubstitutionRecord,
    fillCallback: () => MaybePromise<void>,
): Setting {
    const setting = new Setting(container);

    const classes = [
        "substitution-record",
        recordFilled(record) ? "filled-substitution" : ""
    ].join(" ")

    return setting
        .setClass(classes)
        .addToggle(toggleSubstitution(record))
        .addText(substituteFrom(record, setting, fillCallback))
        .addText(substituteWith(record, setting, fillCallback))
        .addExtraButton(removeSubstitution(record, setting));
}
