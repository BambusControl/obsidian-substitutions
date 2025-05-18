import {SubstitutionRecordSetting} from "./substitutionRecordSetting";
import {newModifiableSubstitutionRecord} from "../../libraries/helpers/newModifiableSubstitutionRecord";
import {SubstitutionRecord} from "../../libraries/types/savedata/substitutionRecord";

export function registerNewSubstitutionRecordSetting(
    container: HTMLDivElement,
    newSettings: SubstitutionRecordSetting[],
    placeholder?: Partial<SubstitutionRecord>,
): SubstitutionRecordSetting {
    const substitutionRecordSetting = new SubstitutionRecordSetting(
        newModifiableSubstitutionRecord(placeholder),
        container,
        () => {
            /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
            const setting = registerNewSubstitutionRecordSetting(container, newSettings);
            setting.display();
        },
    );

    newSettings.unshift(substitutionRecordSetting);
    return substitutionRecordSetting;
}
