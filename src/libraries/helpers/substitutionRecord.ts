import {ExtraButtonComponent, Setting, TextComponent, ToggleComponent} from "obsidian";
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
        .setClass("substitution-record");

    if (recordFilled(record)) {
        setting.setClass("filled-substitution");
    }

    setting
        .addToggle(createEnabledToggle(record))
        .addText(createReplaceInput(record, setting, fillCallback))
        .addText(createWithInput(record, setting, fillCallback))
        .addExtraButton(createRemoveButton(record, setting));

    return setting;
}

function createRemoveButton(
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

function createWithInput(
    record: ModifiableSubstitutionRecord,
    setting: Setting,
    fillCallback: (() => void) | (() => Promise<void>),
): ComponentBuilder<TextComponent> {
    return (textInput) => textInput
        .setPlaceholder("With")
        .onChange(async (input) => {
            record.to = input;
            await checkIfFilled(setting, record, fillCallback);
        })
        .setValue(record.to);
}

function createReplaceInput(
    record: ModifiableSubstitutionRecord,
    setting: Setting,
    fillCallback: (() => void) | (() => Promise<void>),
): ComponentBuilder<TextComponent> {
    return (textInput) => textInput
        .setPlaceholder("Replace")
        .onChange(async (input) => {
            record.from = input;
            await checkIfFilled(setting, record, fillCallback);
        })
        .setValue(record.from);
}

function createEnabledToggle(
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

type ComponentBuilder<T> = (component: T) => T
