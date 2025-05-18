import {Setting} from "obsidian";

export function checkJustFilled(
    setting: Setting,
    record: string,
): boolean {
    const isEmpty = record == "";
    const wasFilled = setting.settingEl.hasClass("filled-substitution");

    if (isEmpty || wasFilled) {
        return false;
    }

    setting.settingEl.addClass("filled-substitution");
    return true;
}
