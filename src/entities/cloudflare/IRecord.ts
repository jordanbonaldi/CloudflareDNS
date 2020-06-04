import IRecordBody from "./IRecordBody";

export default interface IRecord extends IRecordBody{
    id: string,
    proxiable: boolean,
    locked: boolean,
    zone_id: string,
    zone_name: string,
    created_on: Date,
    modified_on: Date,
    data: Object,
    meta: {
        auto_added: boolean,
        source: string
    }
}