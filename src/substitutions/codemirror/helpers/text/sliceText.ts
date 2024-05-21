export function sliceText(
    current: string,
    appended: string,
    length: number,
): string {
    /* TODO: Length of slice depends on how long the user set substitutions are */
    return (current + appended).slice(-length);
}
