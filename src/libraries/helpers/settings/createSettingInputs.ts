import {Setting} from "obsidian";
import {ModifiableSubstitutionRecord} from "../../types/savedata/modifiableSubstitutionRecord";
import {recordFilled} from "../recordFilled";
import {toggleSubstitution} from "./toggleSubstitution";
import {substituteFrom} from "./substituteFrom";
import {substituteWith} from "./substituteWith";
import {removeSubstitution} from "./removeSubstitution";
import {MaybePromise} from "../../types/maybePromise";
import {createNewSubstitutionInputs} from "./createNewSubstitutionInputs";

export function createSettingInputs(
    container: HTMLElement,
    record: ModifiableSubstitutionRecord,
    fillCallback: () => MaybePromise<void>,
): Setting {
    const setting = createNewSubstitutionInputs(container, record, fillCallback);

    return setting
        .addExtraButton(removeSubstitution(record, setting));
}
