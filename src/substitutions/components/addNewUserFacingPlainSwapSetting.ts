import {UserFacingPlainSwapSetting} from "./userFacingPlainSwapSetting";
import {newModifiablePlainSwapDef, newModifiableRegexSwapDef} from "../../libraries/helpers/newModifiableSwapDef";
import {PlainSwap, RegexSwap} from "../../libraries/types/savedata/swapDef";
import {UserFacingRegexSwapSetting} from "./userFacingRegexSwapSetting";

export function addNewUserFacingPlainSwapSetting(
    container: HTMLDivElement,
    newSettings: UserFacingPlainSwapSetting[],
    placeholder?: Partial<PlainSwap>,
): UserFacingPlainSwapSetting {
    const userSwapSetting = new UserFacingPlainSwapSetting(
        newModifiablePlainSwapDef(placeholder),
        container,
        () => {
            /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
            const setting = addNewUserFacingPlainSwapSetting(container, newSettings);
            setting.display();
        },
    );

    newSettings.unshift(userSwapSetting);
    return userSwapSetting;
}

export function addNewUserFacingRegexSwapSetting(
    container: HTMLDivElement,
    newSettings: UserFacingRegexSwapSetting[],
    placeholder?: Partial<RegexSwap>,
): UserFacingRegexSwapSetting {
    const userSwapSetting = new UserFacingRegexSwapSetting(
        newModifiableRegexSwapDef(placeholder),
        container,
        () => {
            /* Very peculiar, recursively defined, but the function wraps it, so it creates it on demand */
            const setting = addNewUserFacingRegexSwapSetting(container, newSettings);
            setting.display();
        },
    );

    newSettings.unshift(userSwapSetting);
    return userSwapSetting;
}
