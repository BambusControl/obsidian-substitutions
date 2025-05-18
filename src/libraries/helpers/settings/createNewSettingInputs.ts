import {Setting} from "obsidian";
import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {recordFilled} from "../recordFilled";
import {MaybePromise} from "../../types/maybePromise";
import {toggleSubstitution} from "./toggleSubstitution";

export function createNewSettingInputs(
    container: HTMLElement,
    record: ModifiableSubstitutionRecord,
    fillCallback: (record: ModifiableSubstitutionRecord) => MaybePromise<void>,
): Setting {
    const setting = new Setting(container)
        .setClass("substitution-record");

    if (recordFilled(record)) {
        setting.setClass("filled-substitution");
    }

    return setting
        .addToggle(toggleSubstitution(record))
        .addText((textInput) => textInput
            .setPlaceholder("Replace")
            .onChange(async (input) => {
                record.from = input;
                if (record.from != "") {
                    await fillCallback(record);
                }
            })
            .setValue(record.from)
        )
        .addText((textInput) => textInput
            .setPlaceholder("Replace")
            .onChange(async (input) => {
                record.to = input;
                if (record.to != "") {
                    await fillCallback(record);
                }
            })
            .setValue(record.to)
        )
        ;
}
