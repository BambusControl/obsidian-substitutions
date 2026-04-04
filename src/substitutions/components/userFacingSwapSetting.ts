import {ActionableSwap} from "../../libraries/types/savedata/actionable";
import {ExtraButtonComponent, Setting, TextComponent} from "obsidian";
import {MaybePromise} from "../../libraries/types/maybePromise";
import {swapFilled} from "../../libraries/helpers/swapFilled";
import {checkJustFilled} from "../../libraries/helpers/checkJustFilled";
import {unescapeSequences} from "../../libraries/helpers/sequences/unescapeSequences";
import {escapeSequences} from "../../libraries/helpers/sequences/escapeSequences";
import {Action} from "../../libraries/types/savedata/action";
import {REGEX_LITERAL_PATTERN} from "../../libraries/helpers/createRegex";
import {SwapKind} from "../../libraries/types/savedata/swapKind";

const PLAIN_SOURCE_PLACEHOLDER = "replace this";
const REGEX_SOURCE_PLACEHOLDER = "/Day [0-9]$/i";
const REGEX_VALIDATION_HINT = "Use /pattern$/flags format, e.g. /Day [0-9]$/i";


export class UserFacingSwapSetting {
    public fromInput?: TextComponent;
    public toInput?: TextComponent;
    private setting: Setting | null = null;

    constructor(
        private readonly _modSwapDef: ActionableSwap,
        private readonly _container: HTMLElement,
        private readonly _onFill: () => MaybePromise<void> = () => {
        },
    ) {
    }

    get swapDef(): ActionableSwap {
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

        /* Enable/disable swap */
        setting
            .addToggle((toggleInput) => {
                toggleInput
                    .setTooltip("Enable/Disable this substitution")
                    .setValue(modSwapDef.enabled)
                    .onChange((value) => {
                        modSwapDef.enabled = value;
                    });

                toggleInput.toggleEl.addClass("hide-if-empty");
            });

        /* from and to text inputs */
        setting
            .addText((textInput) => {
                textInput
                    .setPlaceholder(PLAIN_SOURCE_PLACEHOLDER)
                    .onChange((input) => {
                        console.info("Changing from", input);
                        /* Don't unescape the input, it is always sanitized */
                        modSwapDef.source = input;
                    })
                    .setValue(modSwapDef.source.toString())
                ;
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

                        this.fromInput!.setValue(new_from);
                        this.toInput!.setValue(new_to);
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
            });

        /* Extra options */
        setting
            .addExtraButton((button) => {
                button
                    .setIcon("regex")
                    .setTooltip("Use Regular Expressions")
                    .onClick(() => {
                        modSwapDef.kind = modSwapDef.kind == "plain" ? "regex" : "plain";
                        toggleRegEx(this.swapDef.kind, this.fromInput!, setting, button);
                    });

                toggleRegEx(this.swapDef.kind, this.fromInput!, setting, button);
            })

        /* Remove swap */
        setting
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

export function toggleRegEx(
    swapKind: SwapKind,
    patternInput: TextComponent,
    regexSetting: Setting,
    regexToggleButton: ExtraButtonComponent,
) {
    const regexEnabled = swapKind == "regex";
    regexSetting.controlEl.toggleClass("regex-enabled", regexEnabled);
    regexToggleButton.extraSettingsEl.toggleClass("is-active", regexEnabled);

    const inputEl = patternInput.inputEl;

    if (regexEnabled) {
        const isValid = REGEX_LITERAL_PATTERN.test(patternInput.getValue());
        inputEl.toggleClass("invalid", !isValid);
        patternInput.setPlaceholder(REGEX_SOURCE_PLACEHOLDER);
        inputEl.title = isValid ? "" : REGEX_VALIDATION_HINT;
    } else {
        inputEl.removeClass("invalid");
        patternInput.setPlaceholder(PLAIN_SOURCE_PLACEHOLDER);
        inputEl.title = "";
    }
}
