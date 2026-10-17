import {StateField, Transaction} from "@codemirror/state";
import {Decoration, DecorationSet, EditorView} from "@codemirror/view";
import {SubstitutionsState} from "../../../libraries/types/substitutionsState";
import {effects} from "../constants/Effects";

/**
 * Show what the last substitution changed, and what can still be reverted.
 *
 * Substituted text is briefly highlighted, then keeps an underline.
 * When that text ceases to be *revertible* the underline goes away.
 */
export function replacementFeedbackField(
    substitutionsField: StateField<SubstitutionsState>,
): StateField<DecorationSet> {

    return StateField.define<DecorationSet>({

        create() {
            return Decoration.none;
        },

        update(_: DecorationSet, transaction: Transaction): DecorationSet {
            const replacement = transaction.state.field(substitutionsField, false)?.replacement;

            if (replacement == null || replacement.to === "") {
                return Decoration.none;
            }

            const classes = ["plugin", "substitutions", "editor", "swap-revertible"];
            if (transaction.effects.some((effect) => effect.is(effects.replace))) {
                classes.push("swap-performed");
            }

            const startPosition = replacement.endPosition + 1 - replacement.to.length;

            return Decoration.set(
                Decoration.mark({class: classes.join(" ")}).range(startPosition, replacement.endPosition + 1),
            );
        },

        provide: (field) => EditorView.decorations.from(field),
    });
}
