import {CURRENT_VERSION, SaveData} from "../types/savedata/saveData";

export function initializationData(): SaveData {
    return {
        initialized: false,
        version: CURRENT_VERSION,

        substitutions: {
            initialized: false,
            records: [
                /* Bracket pairing from Obsidian currently not handled */
                /*{
                    from: "(c)",
                    to: "©",
                    enabled: false
                },*/
                /*{
                    from: "(r)",
                    to: "®",
                    enabled: false
                },*/
                /* Narrow use cases */
                /*{
                    from: "tm",
                    to: "™",
                    enabled: false
                },*/
                /*{
                    from: "c/o",
                    to: "℅",
                    enabled: false
                },*/
                {
                    from: "...",
                    to: "…",
                    enabled: true
                },
                {
                    from: "1/2",
                    to: "½",
                    enabled: true
                },
                {
                    from: "1/3",
                    to: "⅓",
                    enabled: true
                },
                {
                    from: "1/4",
                    to: "¼",
                    enabled: true
                },
                {
                    from: "1/5",
                    to: "⅕",
                    enabled: true
                },
                {
                    from: "1/6",
                    to: "⅙",
                    enabled: true
                },
                {
                    from: "1/7",
                    to: "⅐",
                    enabled: true
                },
                {
                    from: "1/9",
                    to: "⅑",
                    enabled: true
                },
                {
                    from: "1/10",
                    to: "⅒",
                    enabled: true
                },
                {
                    from: "1/8",
                    to: "⅛",
                    enabled: true
                },
                {
                    from: "2/3",
                    to: "⅔",
                    enabled: true
                },
                {
                    from: "2/5",
                    to: "⅖",
                    enabled: true
                },
                {
                    from: "3/4",
                    to: "¾",
                    enabled: true
                },
                {
                    from: "3/5",
                    to: "⅗",
                    enabled: true
                },
                {
                    from: "4/5",
                    to: "⅘",
                    enabled: true
                },
                {
                    from: "5/6",
                    to: "⅚",
                    enabled: true
                },
                {
                    from: "3/8",
                    to: "⅜",
                    enabled: true
                },
                {
                    from: "5/8",
                    to: "⅝",
                    enabled: true
                },
                {
                    from: "7/8",
                    to: "⅞",
                    enabled: true
                },
                {
                    from: "<--",
                    to: "←",
                    enabled: true
                },
                {
                    from: "-->",
                    to: "→",
                    enabled: true
                },
                {
                    from: "<->",
                    to: "↔",
                    enabled: true
                },
                {
                    from: "<==",
                    to: "⇐",
                    enabled: true
                },
                {
                    from: "==>",
                    to: "⇒",
                    enabled: true
                },
                {
                    from: "<=>",
                    to: "⇔",
                    enabled: true
                },
                {
                    /* Conflicts with Markdown horizontal rule syntax */
                    from: "--",
                    to: "–",
                    enabled: false
                },
                {
                    /* Conflicts with Markdown horizontal rule syntax */
                    from: "---",
                    to: "—",
                    enabled: false
                },
                {
                    from: "!=",
                    to: "≠",
                    enabled: true
                },
                {
                    from: "<=",
                    to: "≤",
                    enabled: true
                },
                {
                    from: ">=",
                    to: "≥",
                    enabled: true
                },
                {
                    from: "~=",
                    to: "≅",
                    enabled: true
                },
                {
                    from: "+-",
                    to: "±",
                    enabled: true
                },
                {
                    from: "-+",
                    to: "∓",
                    enabled: true
                },
                {
                    from: "<<",
                    to: "≪",
                    enabled: true
                },
                {
                    from: ">>",
                    to: "≫",
                    enabled: true
                },
            ]
        }
    }
}
