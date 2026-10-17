import {StateField, Transaction} from "@codemirror/state";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {defaultState} from "../constants/defaultState";
import {effects} from "../constants/Effects";
import {sliceDoc} from "../../../libraries/helpers/sliceDoc";
import {TextSwap} from "../../../libraries/types/savedata/textSwap";
import {relocateReplacement} from "./relocateReplacement";


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

        update(current: SubstitutionsState, transaction: Transaction) {
            let state = current;

            state = relocateReplacement(transaction, state);

            for (const effect of transaction.effects) {

                if (effect.is(effects.update)) {

                    state = {
                        ...state,
                        cache: sliceDoc(transaction.state),
                    };

                } else if (effect.is(effects.replace)) {

                    state = {
                        ...state,
                        replacement: {
                            from: effect.value.from,
                            to: effect.value.to,
                            endPosition: effect.value.endPosition,
                        }
                    };

                } else if (effect.is(effects.revert)) {

                    state = {
                        ...state,
                        replacement: null,
                    };

                }
            }

            return state;
        },
    });

}
