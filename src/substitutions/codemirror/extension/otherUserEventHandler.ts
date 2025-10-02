import {EditorState, Extension, StateField, TransactionSpec} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {substitutionEffect} from "../constants/substitutionEffect";
import {defaultState} from "../constants/defaultState";
import {SubstitutionState} from "../../../libraries/types/substitutionState";
import {replaceText} from "../transaction/replaceText";
import {TextReplacement} from "../../../libraries/types/textReplacement";
import {recordText} from "../transaction/recordText";

const EVENTS = [
    "move",
    "select",
    "undo",
    "redo",
]

export function otherUserEventHandler(): Extension {
    return EditorView.updateListener.of((view) => {
        const is_monitored_event = view.transactions.some(t => EVENTS.some(event => t.isUserEvent(event)));

        if (!is_monitored_event) {
            return;
        }

        const state = view.state;
        view.view.dispatch(recordText(state))
        return;
    });
}
