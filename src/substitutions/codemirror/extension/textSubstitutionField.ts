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
            let wasUpdated = false;

            for (const effect of transaction.effects) {

                if (effect.is(substitutionEffect.update)) {

                    output = {
                        ...output,
                        cache: sliceDoc(transaction.state, output.length),
                    };
                    wasUpdated = true;

                } else if (effect.is(substitutionEffect.substitute)) {

                    output = {
                        ...output,
                        substitution: {
                            from: effect.value.from,
                            to: effect.value.to,
                            endPosition: effect.value.endPosition,
                        }
                    };
                    wasUpdated = true;

                } else if (effect.is(substitutionEffect.revert)) {

                    output = {
                        ...output,
                        substitution: null,
                    };
                    wasUpdated = true;

                }
            }

            console.log("Field update", wasUpdated, output.cache);
            return output;
        },
    });

}
