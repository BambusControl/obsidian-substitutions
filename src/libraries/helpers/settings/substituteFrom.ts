import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {Setting, TextComponent} from "obsidian";
import {ComponentBuilder} from "./componentBuilder";
import {checkIfFilled} from "../checkIfFilled";
import {MaybePromise} from "../../types/maybePromise";

export function substituteFrom(
    record: ModifiableSubstitutionRecord,
    setting: Setting,
    fillCallback: () => MaybePromise<void>,
): ComponentBuilder<TextComponent> {
    return (textInput) => textInput
        .setPlaceholder("Replace")
        .onChange(async (input) => {
            record.from = input;
            await checkIfFilled(setting, record, fillCallback);
        })
        .setValue(record.from);
}
