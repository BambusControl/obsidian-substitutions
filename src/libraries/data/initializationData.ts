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
                    enabled: false,
                    regex: false
                },*/
                /*{
                    from: "(r)",
                    to: "®",
                    enabled: false,
                    regex: false
                },*/
                {
                    from: "...",
                    to: "…",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/2",
                    to: "½",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/3",
                    to: "⅓",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/4",
                    to: "¼",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/5",
                    to: "⅕",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/6",
                    to: "⅙",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/7",
                    to: "⅐",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/9",
                    to: "⅑",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/10",
                    to: "⅒",
                    enabled: true,
                    regex: false
                },
                {
                    from: "1/8",
                    to: "⅛",
                    enabled: true,
                    regex: false
                },
                {
                    from: "2/3",
                    to: "⅔",
                    enabled: true,
                    regex: false
                },
                {
                    from: "2/5",
                    to: "⅖",
                    enabled: true,
                    regex: false
                },
                {
                    from: "3/4",
                    to: "¾",
                    enabled: true,
                    regex: false
                },
                {
                    from: "3/5",
                    to: "⅗",
                    enabled: true,
                    regex: false
                },
                {
                    from: "4/5",
                    to: "⅘",
                    enabled: true,
                    regex: false
                },
                {
                    from: "5/6",
                    to: "⅚",
                    enabled: true,
                    regex: false
                },
                {
                    from: "3/8",
                    to: "⅜",
                    enabled: true,
                    regex: false
                },
                {
                    from: "5/8",
                    to: "⅝",
                    enabled: true,
                    regex: false
                },
                {
                    from: "7/8",
                    to: "⅞",
                    enabled: true,
                    regex: false
                },
                {
                    from: "<--",
                    to: "←",
                    enabled: true,
                    regex: false
                },
                {
                    from: "-->",
                    to: "→",
                    enabled: true,
                    regex: false
                },
                {
                    from: "<->",
                    to: "↔",
                    enabled: true,
                    regex: false
                },
                {
                    from: "<==",
                    to: "⇐",
                    enabled: true,
                    regex: false
                },
                {
                    from: "==>",
                    to: "⇒",
                    enabled: true,
                    regex: false
                },
                {
                    from: "<=>",
                    to: "⇔",
                    enabled: true,
                    regex: false
                },
                {
                    from: "!=",
                    to: "≠",
                    enabled: true,
                    regex: false
                },
                {
                    from: "<=",
                    to: "≤",
                    enabled: true,
                    regex: false
                },
                {
                    from: ">=",
                    to: "≥",
                    enabled: true,
                    regex: false
                },
                {
                    from: "~=",
                    to: "≅",
                    enabled: true,
                    regex: false
                },
                {
                    from: "+-",
                    to: "±",
                    enabled: true,
                    regex: false
                },
                {
                    from: "-+",
                    to: "∓",
                    enabled: true,
                    regex: false
                },
                {
                    from: "<<",
                    to: "≪",
                    enabled: true,
                    regex: false
                },
                {
                    from: "≪<",
                    to: "⋘",
                    enabled: true,
                    regex: false
                },
                {
                    from: ">>",
                    to: "≫",
                    enabled: true,
                    regex: false
                },
                {
                    from: "≫>",
                    to: "⋙",
                    enabled: true,
                    regex: false
                },
            ]
        }
    };
}
