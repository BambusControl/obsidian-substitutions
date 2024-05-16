import {StateField} from "@codemirror/state";
import {StateFieldType} from "./stateFieldType";
import {defaultState} from "./defaultState";
import {effects} from "./effects";

export const stateField = StateField.define<StateFieldType>({

    create(state) {
        return defaultState();
    },

    update(input, transaction) {
        let output = input;

        for (const eff of transaction.effects) {
            if (eff.is(effects.record)) {
                output = {
                    ...output,
                    cache: (output.cache + eff.value).slice(-3),
                };
            } else if (eff.is(effects.replace)) {
                output = {
                    ...output,
                    subs: {
                        from: eff.value.from,
                        to: eff.value.to,
                    }
                };
            } else if (eff.is(effects.revert)) {
                output = {
                    ...output,
                };
            }
        }

        return output;
    },
})
