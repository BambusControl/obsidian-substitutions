import {PlainSwap, RegexSwap} from "../../libraries/types/savedata/swapDef";
import {RootDataStore} from "./rootDataStore";
import {ActionablePlainSwap, ActionableRegexSwap} from "../../libraries/types/savedata/actionable";
import {swapFilled} from "../../libraries/helpers/swapFilled";
import {swapNotDeleted} from "../../libraries/helpers/swapNotDeleted";
import {SwapFragment} from "../../libraries/types/savedata/swapFragment";
import {removeActionPlain, removeActionRegex} from "../../libraries/helpers/removeAction";

export class UserSwapStorage {

    constructor(
        private readonly store: RootDataStore,
        private readonly modifiedCallback: (swaps: SwapFragment) => void
    ) {
    }

    async getPlainSwaps(): Promise<PlainSwap[]> {
        return (await this.store.getSwap()).plain;
    }

    async getRegexSwaps(): Promise<RegexSwap[]> {
        return (await this.store.getSwap()).regex;
    }


    async overwriteDefinedSwaps(
        modifiedPlainSwaps: ActionablePlainSwap[],
        modifiedRegexSwaps: ActionableRegexSwap[]
    ): Promise<void> {
        const originalData = await this.store.getSwap();

        const filledPlainSwaps = new Array(...modifiedPlainSwaps.values())
            .filter(swapFilled);
        const filledRegexSwaps = new Array(...modifiedRegexSwaps.values())
            .filter(swapFilled);

        const plainSwaps = filledPlainSwaps
            .filter(swapNotDeleted)
            .map(removeActionPlain);
        const regexSwaps = filledRegexSwaps
            .filter(swapNotDeleted)
            .map(removeActionRegex);

        const savedData = await this.store.overwriteSwap({
            ...originalData,
            plain: plainSwaps,
            regex: regexSwaps,
        });

        this.modifiedCallback(savedData);
    }

    async defineNewSwaps(
        newPlainSwaps: ActionablePlainSwap[],
        newRegexSwaps: ActionableRegexSwap[],
    ): Promise<void> {
        const originalData = await this.store.getSwap();
        const ogPlainSwaps = originalData.plain;
        const ogRegexSwaps = originalData.regex;

        const filledPlainDefinitions = new Array(...newPlainSwaps.values())
            .filter(swapFilled);
        const filledRegexDefinitions = new Array(...newRegexSwaps.values())
            .filter(swapFilled);

        const newPlainDefinitions = filledPlainDefinitions
            .filter(swapNotDeleted)
            .map(removeActionPlain);
        const newRegexDefinitions = filledRegexDefinitions
            .filter(swapNotDeleted)
            .map(removeActionRegex);

        const savedData = await this.store.overwriteSwap({
            ...originalData,
            plain: [
                ...newPlainDefinitions,
                ...ogPlainSwaps,
            ],
            regex: [
                ...newRegexDefinitions,
                ...ogRegexSwaps,
            ]
        });

        this.modifiedCallback(savedData);
    }
}
