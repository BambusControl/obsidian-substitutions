import {ModifiableSubstitutionRecord} from "../../libraries/types/savedata/modifiableSubstitutionRecord";
import {Setting} from "obsidian";
import {MaybePromise} from "../../libraries/types/maybePromise";
import {recordFilled} from "../../libraries/helpers/recordFilled";
import {toggleSubstitution} from "../../libraries/helpers/settings/toggleSubstitution";
import {checkJustFilled} from "../../libraries/helpers/checkJustFilled";
import {removeSubstitution} from "../../libraries/helpers/settings/removeSubstitution";
import {unescapeSequences} from "../../libraries/helpers/sequences/unescapeSequences";
import {escapeSequences} from "../../libraries/helpers/sequences/escapeSequences";

export class SubstitutionRecordSetting {
    private setting: Setting | null = null;
    public firstInput?: HTMLInputElement;

    constructor(
        private readonly _record: ModifiableSubstitutionRecord,
        private readonly _container: HTMLElement,
        private readonly _onFill: () => MaybePromise<void> = () => {},
    ) {
    }

    get record(): ModifiableSubstitutionRecord {
        return this._record;
    }

    display(): Setting {
        if (this.setting != null) {
            return this.setting;
        }

        const setting = new Setting(this._container)
            .setClass("substitution-record");

        if (recordFilled(this._record)) {
            setting.setClass("filled-substitution");
        }

        setting
            .addToggle(toggleSubstitution(this._record))
            .addText((textInput) => {
                    textInput
                        .setPlaceholder("Replace")
                        .onChange((input) => {
                            /* Don't unescape the input, it is always sanitized */
                            this._record.from = input;
                        })
                        .setValue(this._record.from);
                    this.firstInput = textInput.inputEl;
                }
            )
            .addText((textInput) => textInput
                .setPlaceholder("With")
                .onChange(async (input) => {
                    this._record.to = unescapeSequences(input);
                    if (checkJustFilled(setting, this._record.to)) {
                        setting.setClass("filled-substitution");
                        await this._onFill();
                    }
                })
                .setValue(escapeSequences(this._record.to))
            )
            .addExtraButton(removeSubstitution(this._record, setting));

        this.setting = setting;
        return setting;
    }

}
