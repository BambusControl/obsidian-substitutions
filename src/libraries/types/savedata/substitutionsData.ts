import {Initializable} from "./initializable";
import {SubstitutionRecords} from "./substitutionRecords";

export interface SubstitutionsData extends Initializable {
    records: SubstitutionRecords;
}
