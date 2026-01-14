export interface TextReplacement {
    from: string,
    to: string,
}

export interface EditorTextReplacement extends TextReplacement {
    endPosition: number,
}
