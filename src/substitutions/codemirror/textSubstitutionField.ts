import {StateField} from "@codemirror/state";
import {SubstitutionState} from "./type/substitutionState";
import {defaultState} from "./constants/defaultState";
import {substitutionEffect} from "./constants/substitutionEffect";
import {sliceText} from "./helpers/text/sliceText";
import {SubstitutionRecords} from "../../libraries/types/savedata/substitutionRecords";
import {toMatch} from "../../libraries/helpers/toMatch";

export function textSubstitutionField(
    substitutionRecords: SubstitutionRecords
): StateField<SubstitutionState> {

    const potentialMatches = substitutionRecords
        .filter(record => record.enabled)
        .map(toMatch);

    const lengths = potentialMatches
        .map(pm => pm.from.length);

    const maxLength = Math.max(...lengths);

    return StateField.define({

        create() {
            return defaultState({
                length: maxLength,
                matches: potentialMatches
            });
        },

        /* TODO: Update the potential matches when a character is recorded */
        update(current, transaction) {
            let output = current;

            for (const effect of transaction.effects) {
                if (effect.is(substitutionEffect.record)) {
                    const slicedText = sliceText(output.cache, effect.value, output.length);
                    output = {
                        ...output,
                        cache: slicedText,
                        matches: output.matches.map(subsrec => ({
                            ...subsrec,
                            couldMatch: subsrec.from.contains(slicedText),
                            isMatch: subsrec.from === slicedText,
                        })),
                    };
                } else if (effect.is(substitutionEffect.replace)) {
                    output = {
                        ...output,
                        substitution: {
                            from: effect.value.from,
                            to: effect.value.to,
                        }
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
