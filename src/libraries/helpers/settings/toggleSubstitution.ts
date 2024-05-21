import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {ComponentBuilder} from "./componentBuilder";
import {ToggleComponent} from "obsidian";
import {getToggleTooltip} from "../getToggleTooltip";

export function toggleSubstitution(
    record: ModifiableSubstitutionRecord,
): ComponentBuilder<ToggleComponent> {
    return (toggleInput) => toggleInput
        .setTooltip(getToggleTooltip(toggleInput.getValue()))
        .setValue(record.enabled)
        .onChange((value) => {
            record.enabled = value;
            toggleInput.setTooltip(getToggleTooltip(value))
        });
}
