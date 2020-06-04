import {Entity} from "../Entity";

export default interface IZone extends Entity{
    id: string,
    name: string,
    status: string,
    paused: boolean,
    type: string,
    development_mode: number,
    name_servers: string[],
    original_name_servers: string[],
    original_registrar: undefined | string,
    original_dnshost: undefined | string,
    modified_on: Date,
    created_on: Date,
    activated_on: Date,
}