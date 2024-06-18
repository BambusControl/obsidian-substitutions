import {StateField} from "@codemirror/state";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {defaultState} from "../constants/defaultState";
import {substitutionEffect} from "../constants/substitutionEffect";
import {SubstitutionRecords} from "../../../libraries/types/savedata/substitutionRecords";
import {sliceDoc} from "../../../libraries/helpers/sliceDoc";

export function textSubstitutionField(
    substitutionRecords: SubstitutionRecords
): StateField<SubstitutionState> {

    const potentialMatches = substitutionRecords
        .filter(record => record.enabled);
    const lengths = potentialMatches
        .map(pm => pm.from.length);
    const maxLength = Math.max(...lengths);

    const newDefaultState = (value?: Partial<SubstitutionState> | undefined) => defaultState({
        length: maxLength,
        matches: potentialMatches,
        ...value
    });

    return StateField.define({

        create() {
            return newDefaultState();
        },

        update(current, transaction) {
            let output = current;

            for (const effect of transaction.effects) {

                if (effect.is(substitutionEffect.update)) {

                    output = {
                        ...output,
                        cache: sliceDoc(transaction.state, output.length),
                    };

                } else if (effect.is(substitutionEffect.substitute)) {

                    /* After substitution, we reset everything, only remembering that we substituted something */
                    output = newDefaultState({
                        substitution: {
                            from: effect.value.from,
                            to: effect.value.to,
                            endPosition: effect.value.endPosition,
                        }
                    });

                } else if (effect.is(substitutionEffect.revert)) {

                    /* After reverting, there is nothing we should remember */
                    output = newDefaultState();

                }
            }

            return output;
        },
    });

}
