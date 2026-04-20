import {StateField} from "@codemirror/state";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {defaultState} from "../constants/defaultState";
import {effects} from "../constants/Effects";
import {sliceDoc} from "../../../libraries/helpers/sliceDoc";
import {TextSwap} from "../../../libraries/types/savedata/textSwap";

const MAP_POS_RIGHT_AFFINITY = 1;

export function textSubstitutionsField(
    swaps: TextSwap[],
): StateField<SubstitutionsState> {
    const newDefaultState = (value?: Partial<SubstitutionsState> | undefined) => defaultState({
        swaps: swaps,
        ...value
    });

    return StateField.define({

        create() {
            return newDefaultState();
        },

        update(current, transaction) {
            let output = current;

            if (transaction.docChanged && output.replacement != null) {
                output = {
                    ...output,
                    replacement: {
                        ...output.replacement,
                        endPosition: transaction.changes.mapPos(
                            output.replacement.endPosition,
                            MAP_POS_RIGHT_AFFINITY
                        ),
                    },
                };
            }

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
