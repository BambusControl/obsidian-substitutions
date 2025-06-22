import {ModifiableSubstitutionRecord} from "../../libraries/types/savedata/modifiableSubstitutionRecord";
import {Setting, TextComponent} from "obsidian";
import {MaybePromise} from "../../libraries/types/maybePromise";
import {recordFilled} from "../../libraries/helpers/recordFilled";
import {checkJustFilled} from "../../libraries/helpers/checkJustFilled";
import {unescapeSequences} from "../../libraries/helpers/sequences/unescapeSequences";
import {escapeSequences} from "../../libraries/helpers/sequences/escapeSequences";
import {Action} from "../../libraries/types/savedata/action";
import {getToggleTooltip} from "../../libraries/helpers/getToggleTooltip";

export class SubstitutionRecordSetting {
    private setting: Setting | null = null;
    public fromInput?: TextComponent;
    public toInput?: TextComponent;

    constructor(
        private readonly _record: ModifiableSubstitutionRecord,
        private readonly _container: HTMLElement,
        private readonly _onFill: () => MaybePromise<void> = () => {
        },
    ) {
    }

    get record(): ModifiableSubstitutionRecord {
        return this._record;
    }

    display(): Setting {
        if (this.setting != null) {
            return this.setting;
        }

        const substitution = this._record;
        const setting = new Setting(this._container)
            .setClass("substitution-record");

        if (recordFilled(substitution)) {
            setting.setClass("filled-substitution");
        }

        setting
            .addToggle((toggleInput) => {
                toggleInput
                    .setTooltip(getToggleTooltip(toggleInput.getValue()))
                    .setValue(substitution.enabled)
                    .onChange((value) => {
                        substitution.enabled = value;
                        toggleInput.setTooltip(getToggleTooltip(value));
                    });

                toggleInput.toggleEl.addClass("hide-if-empty");
            })
            .addText((textInput) => {
                textInput
                    .setPlaceholder("replace this")
                    .onChange((input) => {
                        console.info("Changing from", input);
                        /* Don't unescape the input, it is always sanitized */
                        substitution.from = input;
                    })
                    .setValue(substitution.from);
                this.fromInput = textInput;
            })
            .addExtraButton((button) => {
                button
                    .setIcon("arrow-left-right")
                    .setTooltip("Swap from and to")
                    .onClick(() => {
                        const new_from = "" + substitution.to;
                        const new_to = "" + substitution.from;

                        substitution.from = new_from;
                        substitution.to = new_to;

                        this.fromInput?.setValue(new_from);
                        this.toInput?.setValue(new_to);
                    });

                button.extraSettingsEl.addClass("hide-if-empty");
            })
            .addText((textInput) => {
                textInput
                    .setPlaceholder("with this")
                    .onChange(async (input) => {
                        console.info("Changing to", input);
                        substitution.to = unescapeSequences(input);
                        if (checkJustFilled(setting, substitution.to)) {
                            setting.setClass("filled-substitution");
                            await this._onFill();
                        }

                    })
                    .setValue(escapeSequences(substitution.to));
                this.toInput = textInput;
            })
            .addExtraButton((button) => {
                button
                    .setIcon("x")
                    .setTooltip("Remove substitution")
                    .onClick(() => {
                        substitution.action = Action.Delete;
                        setting.settingEl.hide();
                    });

                button.extraSettingsEl.addClass("hide-if-empty");
            });

        this.setting = setting;
        return setting;
    }

}
