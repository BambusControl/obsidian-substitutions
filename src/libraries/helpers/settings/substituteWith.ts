import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {Setting, TextComponent} from "obsidian";
import {ComponentBuilder} from "./componentBuilder";
import {checkIfFilled} from "../checkIfFilled";
import {MaybePromise} from "../../types/maybePromise";

export function substituteWith(
    record: ModifiableSubstitutionRecord,
    setting: Setting,
    fillCallback: () => MaybePromise<void>,
): ComponentBuilder<TextComponent> {
    return (textInput) => textInput
        .setPlaceholder("With")
        .onChange(async (input) => {
            record.to = input;
            await checkIfFilled(setting, record, fillCallback);
        })
        .setValue(record.to);
}
