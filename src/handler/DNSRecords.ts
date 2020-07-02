import Cloudflare from "./Cloudflare";
import IZone from "../entities/cloudflare/IZone";
import IRecord from "../entities/cloudflare/IRecord";
import IRecordBody from "../entities/cloudflare/IRecordBody";

export default new class DNSRecord {

    /**
     *
     * @param zone
     */
    listRecords(zone: IZone): Promise<IRecord[]> {
        console.log(zone);
        return Cloudflare.cloudRequest<IRecord[]>(`zones/${zone.id}/dns_records`);
    }

    /**
     *
     * @param zone
     * @param recordBody
     */
    createRecord(zone: IZone | string, recordBody: IRecordBody): Promise<IRecord> {
        return Cloudflare.cloudPost<IRecord, IRecordBody>(`zones/${(typeof zone === "string" ? {id: zone} as IZone :
            zone).id}/dns_records`, recordBody);
    }

    /**
     *
     * @param zone
     * @param callback
     */
    getRecord(zone: IZone, callback: (record: IRecord) => boolean): Promise<IRecord | undefined> {
        return this.listRecords(zone).then((records) => records.find((record: IRecord) => callback(record)));
    }

    /**
     *
     * @param zone
     * @param id
     */
    getRecordById(zone: IZone, id: string): Promise<IRecord | undefined> {
        return this.getRecord(zone, (record: IRecord) => record.id === id);
    }

    /**
     *
     * @param zone
     * @param recordName
     */
    getRecordByName(zone: IZone | string, recordName: string): Promise<IRecord | undefined> {
        return this.getRecord(typeof zone === "string" ? {id: zone} as IZone :
            zone, (record: IRecord) => record.name === recordName
        );
    }

    /**
     *
     * @param zone
     * @param record
     */
    updateRecord(zone: IZone | string, record: IRecordBody): Promise<IRecord | undefined> {
        return this.getRecordByName(zone, record.name).then((recordL: IRecord | undefined) => {
            if (recordL == null) return undefined;

            return Cloudflare.cloudPut<IRecord, IRecordBody>(`zones/${(typeof zone === "string" ? {id: zone} as IZone :
                zone).id}/dns_records/${recordL.id}`, record);
        })
    }

    /**
     *
     * @param zone
     * @param record
     */
    deleteRecord(zone: IZone | string, record: IRecordBody): Promise<{id: string}> {
        return Cloudflare.cloudDelete<IRecord>(`zones/${(typeof zone === "string" ? {id: zone} as IZone :
            zone).id}/dns_records/${record.id}`);
    }

    /**
     *
     * @param action
     * @param zoneId
     * @param record
     */
    recordActionByIDs(action: 'updateRecord' | 'deleteRecord' | 'createRecord' , zoneId: string, record: IRecordBody | {id: string}) {
        return this[action](zoneId, record as IRecordBody);
    }

}
