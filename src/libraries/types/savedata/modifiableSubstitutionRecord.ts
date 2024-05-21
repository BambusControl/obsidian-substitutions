import {SubstitutionRecord} from "./substitutionRecord";
import {Action} from "./action";
import {SubstitutionRecordIdentifier} from "./substitutionRecordIdentifier";

export interface ModifiableSubstitutionRecord extends SubstitutionRecord {
    readonly id: SubstitutionRecordIdentifier;
    action: Action
}
