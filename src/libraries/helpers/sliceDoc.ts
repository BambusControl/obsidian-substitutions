import {EditorState} from "@codemirror/state";

export function sliceDoc(
    state: EditorState,
): string {
    const sliceTo = state.selection.asSingle().main.head;
    return state.sliceDoc(0, sliceTo);
}
