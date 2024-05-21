import {createSettingInputs} from "../../libraries/helpers/settings/createSettingInputs";
import {ModifiableSubstitutionRecord} from "../../libraries/types/savedata/modifiableSubstitutionRecord";
import {Setting} from "obsidian";
import {MaybePromise} from "../../libraries/types/maybePromise";

export class SubstitutionRecordSetting {
    private _setting: Setting | null = null;

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
        if (this._setting != null) {
            return this._setting;
        }

        this._setting = createSettingInputs(
            this._container,
            this.record,
            this._onFill,
        );

        return this._setting;
    }

}
