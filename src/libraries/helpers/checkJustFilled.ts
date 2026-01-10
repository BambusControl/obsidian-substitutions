import {Setting} from "obsidian";

export function checkJustFilled(
    setting: Setting,
    previousValue: string,
): boolean {
    const isEmpty = previousValue == "";
    const wasFilled = setting.settingEl.hasClass("just-filled");

    if (isEmpty || wasFilled) {
        return false;
    }

    setting.settingEl.addClass("just-filled");
    return true;
}
