import {StateField} from "@codemirror/state";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {defaultState} from "../constants/defaultState";
import {effects} from "../constants/Effects";
import {PlainSwap, RegexSwap} from "../../../libraries/types/savedata/swapDef";
import {sliceDoc} from "../../../libraries/helpers/sliceDoc";

export function textSubstitutionsField(
    plainSwaps: PlainSwap[],
    regexSwaps: RegexSwap[],
): StateField<SubstitutionsState> {

    const potentialPlainMatches = plainSwaps
        .filter(swap => swap.enabled);

    const potentialRegexMatches = regexSwaps
        .filter(swap => swap.enabled);

    const newDefaultState = (value?: Partial<SubstitutionsState> | undefined) => defaultState({
        plainSwaps: potentialPlainMatches,
        regexSwaps: potentialRegexMatches,
        ...value
    });

    return StateField.define({

        create() {
            return newDefaultState();
        },

        update(current, transaction) {
            let output = current;

            for (const effect of transaction.effects) {

                if (effect.is(effects.update)) {

                    output = {
                        ...output,
                        cache: sliceDoc(transaction.state),
                    };

                } else if (effect.is(effects.replace)) {

                    output = {
                        ...output,
                        replacement: {
                            from: effect.value.from,
                            to: effect.value.to,
                            endPosition: effect.value.endPosition,
                        }
                    };

                } else if (effect.is(effects.revert)) {

                    output = {
                        ...output,
                        replacement: null,
                    };

                }
            }

            return output;
        },
    });

}
