import {ModifiableSwapDef} from "../../libraries/types/savedata/modifiableSwapDef";
import {Setting, TextComponent} from "obsidian";
import {MaybePromise} from "../../libraries/types/maybePromise";
import {swapFilled} from "../../libraries/helpers/swapFilled";
import {checkJustFilled} from "../../libraries/helpers/checkJustFilled";
import {unescapeSequences} from "../../libraries/helpers/sequences/unescapeSequences";
import {escapeSequences} from "../../libraries/helpers/sequences/escapeSequences";
import {Action} from "../../libraries/types/savedata/action";
import {getRegexToggleTooltip, getSwapToggleTooltip} from "../../libraries/helpers/getTooltips";

export class UserFacingSwapSetting {
    public fromInput?: TextComponent;
    public toInput?: TextComponent;
    private setting: Setting | null = null;

    constructor(
        private readonly _modSwapDef: ModifiableSwapDef,
        private readonly _container: HTMLElement,
        private readonly _onFill: () => MaybePromise<void> = () => {
        },
    ) {
    }

    get swapDef(): ModifiableSwapDef {
        return this._modSwapDef;
    }

    display(): Setting {
        if (this.setting != null) {
            return this.setting;
        }

        const modSwapDef = this._modSwapDef;
        const setting = new Setting(this._container)
            .setClass("user-swap-definition");

        if (swapFilled(modSwapDef)) {
            setting.setClass("just-filled");
        }

        setting
            .addToggle((toggleInput) => {
                toggleInput
                    .setTooltip(getSwapToggleTooltip(toggleInput.getValue()))
                    .setValue(modSwapDef.enabled)
                    .onChange((value) => {
                        modSwapDef.enabled = value;
                        toggleInput.setTooltip(getSwapToggleTooltip(value));
                    });

                toggleInput.toggleEl.addClass("hide-if-empty");
            })
            .addText((textInput) => {
                textInput
                    .setPlaceholder("replace this")
                    .onChange((input) => {
                        console.info("Changing from", input);
                        /* Don't unescape the input, it is always sanitized */
                        modSwapDef.from = input;
                    })
                    .setValue(modSwapDef.from);
                this.fromInput = textInput;
            })
            .addExtraButton((button) => {
                button
                    .setIcon("arrow-left-right")
                    .setTooltip("Swap from and to")
                    .onClick(() => {
                        const new_from = "" + modSwapDef.to;
                        const new_to = "" + modSwapDef.from;

                        modSwapDef.from = new_from;
                        modSwapDef.to = new_to;

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
                        modSwapDef.to = unescapeSequences(input);
                        if (checkJustFilled(setting, modSwapDef.to)) {
                            setting.setClass("just-filled");
                            await this._onFill();
                        }

                    })
                    .setValue(escapeSequences(modSwapDef.to));
                this.toInput = textInput;
            })
            .addToggle((toggleInput) => {
                toggleInput
                    .setTooltip(getRegexToggleTooltip(toggleInput.getValue()))
                    .setValue(modSwapDef.regex)
                    .onChange((value) => {
                        modSwapDef.regex = value;
                        toggleInput.setTooltip(getRegexToggleTooltip(value));
                    });
            })
            .addExtraButton((button) => {
                button
                    .setIcon("x")
                    .setTooltip("Remove substitution")
                    .onClick(() => {
                        modSwapDef.action = Action.Delete;
                        setting.settingEl.hide();
                    });

                button.extraSettingsEl.addClass("hide-if-empty");
            });

        this.setting = setting;
        return setting;
    }

}
