import {Extension} from "@codemirror/state";
import {EditorView} from "@codemirror/view";
import {recordText} from "../transaction/recordText";

const EVENTS = [
    "input",
    "delete",
    "move",
    "select",
    "undo",
    "redo",
];

export function stateUpdater(): Extension {
    return EditorView.updateListener.of((view) => {
        const is_monitored_event = view.transactions.some(t => EVENTS.some(event => t.isUserEvent(event)));

        if (!is_monitored_event) {
            return;
        }

        const state = view.state;
        view.view.dispatch(recordText(state));
        return;
    });
}
