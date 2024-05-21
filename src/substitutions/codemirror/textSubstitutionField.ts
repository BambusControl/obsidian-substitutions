import {StateField} from "@codemirror/state";
import {SubstitutionState} from "./type/substitutionState";
import {defaultState} from "./constants/defaultState";
import {substitutionEffect} from "./constants/substitutionEffect";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {sliceDoc} from "./helpers/text/sliceDoc";

export function textSubstitutionField(
    substitutionRecords: SubstitutionRecords
): StateField<SubstitutionState> {

    const potentialMatches = substitutionRecords
        .filter(record => record.enabled);
    const lengths = potentialMatches
        .map(pm => pm.from.length);
    const maxLength = Math.max(...lengths);

    return StateField.define({

        create() {
            return defaultState({
                length: maxLength,
                matches: potentialMatches,
            });
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

                    output = {
                        ...output,
                        replaced: true,
                        substitution: {
                            from: effect.value.from,
                            to: effect.value.to,
                        },
                    };

                } else if (effect.is(substitutionEffect.revert)) {

                    /* TODO: Revert substitution on backspace */
                    output = {
                        ...output,
                    };

                }
            }

            return output;
        },
    });

}
