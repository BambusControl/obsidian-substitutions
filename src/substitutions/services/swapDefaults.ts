import {PlainSwap, RegexSwap} from "../../libraries/types/savedata/swapDef";

export const PLAIN_SWAP_DEFAULTS: PlainSwap[] = [
    /* Bracket pairing from Obsidian currently not handled */
    /*{
        source: "(c)",
        replacement: "©",
        enabled: false,
        regex: false
    },*/
    /*{
        source: "(r)",
        replacement: "®",
        enabled: false,
        regex: false
    },*/
    {
        source: "...",
        replacement: "…",
        enabled: true,
    },
    {
        source: "1/2",
        replacement: "½",
        enabled: true,
    },
    {
        source: "1/3",
        replacement: "⅓",
        enabled: true,
    },
    {
        source: "1/4",
        replacement: "¼",
        enabled: true,
    },
    {
        source: "1/5",
        replacement: "⅕",
        enabled: true,
    },
    {
        source: "1/6",
        replacement: "⅙",
        enabled: true,
    },
    {
        source: "1/7",
        replacement: "⅐",
        enabled: true,
    },
    {
        source: "1/9",
        replacement: "⅑",
        enabled: true,
    },
    {
        source: "1/10",
        replacement: "⅒",
        enabled: true,
    },
    {
        source: "1/8",
        replacement: "⅛",
        enabled: true,
    },
    {
        source: "2/3",
        replacement: "⅔",
        enabled: true,
    },
    {
        source: "2/5",
        replacement: "⅖",
        enabled: true,
    },
    {
        source: "3/4",
        replacement: "¾",
        enabled: true,
    },
    {
        source: "3/5",
        replacement: "⅗",
        enabled: true,
    },
    {
        source: "4/5",
        replacement: "⅘",
        enabled: true,
    },
    {
        source: "5/6",
        replacement: "⅚",
        enabled: true,
    },
    {
        source: "3/8",
        replacement: "⅜",
        enabled: true,
    },
    {
        source: "5/8",
        replacement: "⅝",
        enabled: true,
    },
    {
        source: "7/8",
        replacement: "⅞",
        enabled: true,
    },
    {
        source: "<--",
        replacement: "←",
        enabled: true,
    },
    {
        source: "-->",
        replacement: "→",
        enabled: true,
    },
    {
        source: "<->",
        replacement: "↔",
        enabled: true,
    },
    {
        source: "<==",
        replacement: "⇐",
        enabled: true,
    },
    {
        source: "==>",
        replacement: "⇒",
        enabled: true,
    },
    {
        source: "<=>",
        replacement: "⇔",
        enabled: true,
    },
    {
        source: "!=",
        replacement: "≠",
        enabled: true,
    },
    {
        source: "<=",
        replacement: "≤",
        enabled: true,
    },
    {
        source: ">=",
        replacement: "≥",
        enabled: true,
    },
    {
        source: "~=",
        replacement: "≅",
        enabled: true,
    },
    {
        source: "+-",
        replacement: "±",
        enabled: true,
    },
    {
        source: "-+",
        replacement: "∓",
        enabled: true,
    },
    {
        source: "<<",
        replacement: "≪",
        enabled: true,
    },
    {
        source: "≪<",
        replacement: "⋘",
        enabled: true,
    },
    {
        source: ">>",
        replacement: "≫",
        enabled: true,
    },
    {
        source: "≫>",
        replacement: "⋙",
        enabled: true,
    },
]

export const REGEX_SWAP_DEFAULTS: RegexSwap[] = [];
