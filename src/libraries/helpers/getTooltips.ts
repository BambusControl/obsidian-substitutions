export function getSubstitutionToggleTooltip(value: boolean) {
    return (value ? "Disable" : "Enable")
        + " this substitution";
}

export function getRegexToggleTooltip(value: boolean) {
    return (value ? "Disable" : "Enable")
        + " RegEx support";
}
