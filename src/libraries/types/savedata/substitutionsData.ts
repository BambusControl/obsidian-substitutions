import {Initializable} from "./initializable";
import {SubstitutionRecord} from "./substitutionRecord";

export interface SubstitutionsData extends Initializable {
    records: Array<SubstitutionRecord>;
}
