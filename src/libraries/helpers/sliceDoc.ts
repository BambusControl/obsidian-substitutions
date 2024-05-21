import {EditorState} from "@codemirror/state";

export function sliceDoc(
    state: EditorState,
    length: number
): string {
    const sliceTo = state.selection.asSingle().main.head;
    const sliceFrom = Math.max(0, sliceTo - length);
    return state.sliceDoc(sliceFrom, sliceTo);
}
