import {UserFacingSwapSetting} from "./userFacingSwapSetting";
import {newModifiableSwapDef} from "../../libraries/helpers/newModifiableSwapDef";
import {SwapDef} from "../../libraries/types/savedata/swapDef";

export function addNewUserFacingSwapSetting(
    container: HTMLDivElement,
    newSettings: UserFacingSwapSetting[],
    placeholder?: Partial<SwapDef>,
): UserFacingSwapSetting {
    const userSwapSetting = new UserFacingSwapSetting(
        newModifiableSwapDef(placeholder),
        container,
        () => {
            /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
            const setting = addNewUserFacingSwapSetting(container, newSettings);
            setting.display();
        },
    );

    newSettings.unshift(userSwapSetting);
    return userSwapSetting;
}
