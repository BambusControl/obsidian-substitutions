import {Setting} from "obsidian";
import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {recordFilled} from "./recordFilled";
import {checkIfFilled} from "./checkIfFilled";
import {getToggleTooltip} from "./getToggleTooltip";
import {Action} from "../types/savedata/action";

export function substitutionRecord(
    container: HTMLElement,
    record: ModifiableSubstitutionRecord,
    fillCallback: (() => void) | (() => Promise<void>),
): Setting {
    const setting = new Setting(container)
        .setClass("substitution-record")
        .addToggle((c) => c
            .setTooltip(getToggleTooltip(c.getValue()))
            .setValue(record.enabled)
            .onChange((value) => {
                record.enabled = value;
                c.setTooltip(getToggleTooltip(value))
            })
        )
        .addText((c) => c
            .setPlaceholder("Replace")
            .onChange(async (input) => {
                record.from = input;
                await checkIfFilled(setting, record, fillCallback);
            })
            .setValue(record.from)
        )
        .addText((c) => c
            .setPlaceholder("With")
            .onChange(async (input) => {
                record.to = input;
                await checkIfFilled(setting, record, fillCallback);
            })
            .setValue(record.to)
        )
        .addExtraButton((c) => c
            .setIcon("x")
            .setTooltip("Remove substitution")
            .onClick(() => {
                record.action = Action.Delete;
                setting.settingEl.hide();
            })
        );

    if (recordFilled(record)) {
        setting.setClass("filled-substitution");
    }

    return setting;
}


