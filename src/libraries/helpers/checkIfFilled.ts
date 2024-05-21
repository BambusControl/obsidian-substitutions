import {Setting} from "obsidian";
import {ModifiableSubstitutionRecord} from "../types/savedata/modifiableSubstitutionRecord";
import {recordFilled} from "./recordFilled";
import {MaybePromise} from "../types/maybePromise";

export async function checkIfFilled(
    setting: Setting,
    record: ModifiableSubstitutionRecord,
    fillCallback: () => MaybePromise<void>,
): Promise<void> {
    const inputWasEmpty = !setting.settingEl.hasClass("filled-substitution");
    const recordWasFilled = recordFilled(record);

    if (inputWasEmpty && recordWasFilled) {
        setting.setClass("filled-substitution");
        await fillCallback();
    }
}
