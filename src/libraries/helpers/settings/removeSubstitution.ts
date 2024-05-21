import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {ExtraButtonComponent, Setting} from "obsidian";
import {ComponentBuilder} from "./componentBuilder";
import {Action} from "../../types/savedata/action";

export function removeSubstitution(
    record: ModifiableSubstitutionRecord,
    setting: Setting,
): ComponentBuilder<ExtraButtonComponent> {
    return (extraButton) => extraButton
        .setIcon("x")
        .setTooltip("Remove substitution")
        .onClick(() => {
            record.action = Action.Delete;
            setting.settingEl.hide();
        });
}
