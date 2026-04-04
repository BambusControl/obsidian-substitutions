import {UserFacingSwapSetting} from "./userFacingSwapSetting";
import {newModifiableSwapDef} from "../../libraries/helpers/newModifiableSwapDef";
import {SavedSwapDefinition} from "../../libraries/types/savedata/savedSwapDefinition";

export function addNewUserFacingSwapSetting(
    container: HTMLDivElement,
    newSettings: UserFacingSwapSetting[],
    placeholder?: Partial<SavedSwapDefinition>,
    onChange: () => void = () => {
    },
): UserFacingSwapSetting {
    const userSwapSetting = new UserFacingSwapSetting(
        newModifiableSwapDef(placeholder),
        container,
        () => {
            /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
            const setting = addNewUserFacingSwapSetting(container, newSettings, undefined, onChange);
            setting.display();
            onChange();
        },
        onChange,
    );

    newSettings.unshift(userSwapSetting);
    return userSwapSetting;
}
