import Cloudflare from "./Cloudflare";
import IZone from "../entities/cloudflare/IZone";
import DNSRecords from "./DNSRecords";
import IRecord from "../entities/cloudflare/IRecord";

export default new class DNSRecord {

    /**
     * Listing Zones from linked account
     */
    listZones(): Promise<IZone[]> {
        return Cloudflare.cloudRequest<IZone>('zones');
    }

    /**
     *
     * @param callback
     */
    getZone(callback: (zone: IZone) => boolean): Promise<IZone | undefined> {
        return this.listZones().then((zones: IZone[]) => zones.find((zone: IZone) => callback(zone)));
    }

    /**
     *
     * @param id
     */
    getZoneById(id : string): Promise<IZone | undefined> {
        return this.getZone((zone: IZone) => zone.id === id);
    }

    /**
     *
     * @param domainName
     */
    getZoneByDomainName(domainName: string): Promise<IZone | undefined> {
        return this.getZone((zone: IZone) => zone.name === domainName);
    }

    /**
     *
     * @param id
     */
    getLinkedRecords(id: string): Promise<IRecord[]> {
        return this.getZoneById(id).then((zone: IZone | undefined) => zone !== undefined ? DNSRecords.listRecords(zone) : [])
    }


}