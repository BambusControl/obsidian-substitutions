import {ActionablePlainSwap} from "../../libraries/types/savedata/actionable";
import {Setting, TextComponent} from "obsidian";
import {MaybePromise} from "../../libraries/types/maybePromise";
import {swapFilled} from "../../libraries/helpers/swapFilled";
import {checkJustFilled} from "../../libraries/helpers/checkJustFilled";
import {unescapeSequences} from "../../libraries/helpers/sequences/unescapeSequences";
import {escapeSequences} from "../../libraries/helpers/sequences/escapeSequences";
import {Action} from "../../libraries/types/savedata/action";
import {getSwapToggleTooltip} from "../../libraries/helpers/getTooltips";

export class UserFacingPlainSwapSetting {
    public fromInput?: TextComponent;
    public toInput?: TextComponent;
    private setting: Setting | null = null;

    constructor(
        private readonly _modSwapDef: ActionablePlainSwap,
        private readonly _container: HTMLElement,
        private readonly _onFill: () => MaybePromise<void> = () => {
        },
    ) {
    }

    get swapDef(): ActionablePlainSwap {
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
                        modSwapDef.source = input;
                    })
                    .setValue(modSwapDef.source.toString());
                this.fromInput = textInput;
            })
            .addExtraButton((button) => {
                button
                    .setIcon("arrow-left-right")
                    .setTooltip("Swap from and to")
                    .onClick(() => {
                        const new_from = "" + modSwapDef.replacement;
                        const new_to = "" + modSwapDef.source;

                        modSwapDef.source = new_from;
                        modSwapDef.replacement = new_to;

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
                        modSwapDef.replacement = unescapeSequences(input);
                        if (checkJustFilled(setting, modSwapDef.replacement)) {
                            setting.setClass("just-filled");
                            await this._onFill();
                        }

                    })
                    .setValue(escapeSequences(modSwapDef.replacement));
                this.toInput = textInput;
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
