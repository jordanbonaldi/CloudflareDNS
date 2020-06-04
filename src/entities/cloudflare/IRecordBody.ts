import {Entity} from "../Entity";
import {EnumRecordType} from "./EnumRecordType";

export default interface IRecordBody extends Entity{
    type: EnumRecordType,
    name: string,
    content: string,
    ttl: number,
    priority?: number,
    proxied?: boolean,
    id?: string,
}