import Cloudflare from "./handler/Cloudflare";
import DNSRecords from "./handler/DNSRecords";
import IRecord from "./entities/cloudflare/IRecord";
import IRecordBody from "./entities/cloudflare/IRecordBody";
import {EnumRecordType} from "./entities/cloudflare/EnumRecordType";
import IZone from "./entities/cloudflare/IZone";
import Config from "./entities/Config";
import Zone from "./handler/Zone";

export {
    Cloudflare as Cloudflare,
    DNSRecords as DNSRecords,
    EnumRecordType as EnumRecordType,
    IRecord as IRecord,
    IRecordBody as IRecordBody,
    IZone as IZone,
    Config as Config,
    Zone as Zone,
}