export interface SubstitutionRecord {
    from: string;
    to: string;
    enabled: boolean;
    regex: boolean;
}

//export interface SwapDefinition {
//    enabled: boolean;
//}
//
//export interface PlaintextSwap extends SwapDefinition {
//    source: string;
//    replacement: string;
//}
//
//export interface RegexSwap extends SwapDefinition{
//    pattern: RegExp;
//    replacement: string;
//}
