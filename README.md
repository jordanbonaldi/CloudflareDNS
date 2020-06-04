

# Cloudflare DNSRecord CRUD NodeJS


<p align="center">
 <img src="https://img.shields.io/npm/dm/@neferett/cloudflaredns.svg" alt="Downloads"></a>
 <a href="https://www.npmjs.com/package/@neferett/cloudflaredns"><img src="https://img.shields.io/npm/v/@neferett/cloudflaredns.svg" alt="Version"></a>
 <a href="https://github.com/jordanbonaldi/CloudflareDNS/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"></a>
</p>
	

## Installation

`npm install @neferett/cloudflaredns`

```typescript
 Cloudflare.load({
     cloudflareToken: token,
 });
```

## How to use
### DNS Records:

Creating a new record cloudflare record with a Zone ID
   ```typescript
DNSRecords.createRecord(
    zoneId, 
    {
        content: "127.0.0.1", name: "test.example.com", ttl: 120, type: EnumRecordType.A
    })
.then((record: IRecord) => ...);
```

Creating without ZoneID but only domain name
```typescript
Zone.getZoneByDomainName('example.com').then((zone: IZone | undefined) => {
    if (zone === undefined) return;

    return DNSRecords.createRecord(
        zone.id, 
        {
            content: "127.0.0.1", name: "test.example.com", ttl: 120, type: EnumRecordType.A
        })
    .then((record: IRecord) => ...);
});
```

Same as Creating processus you can do the same with the following functions:
```typescript
DNSRecords.updateRecord(
 zoneId, 
 {
     content: "127.0.0.2", name: "test.example.com", ttl: 120, type: EnumRecordType.A
 })
.then((record: IRecord) => ...);

// Delete method only takes id as parameter 
DNSRecords.deleteRecord(
    zoneId, {id: recordID}
    )
.then((record: IRecord) => ...);
```

You can read your records by Name or IDs using the following methods:
````typescript
DNSRecords.getRecordByName(zoneId, 'test.example.com').then((record: IRecord | undefined) => ...)
DNSRecords.getRecordById(zoneId, '45678987654').then((record: IRecord | undefined) => ...)
````

You can read all your records:
````typescript
DNSRecords.listRecords(zoneId).then((records:IRecord[]) => ...)
````

### Zones:

To avoid you to always have Zone ID you can retrieve them dynamically:
```typescript
Zone.getZoneByDomainName('example.com').then((zone: IZone | undefined) => ...)
```

You can also read them all:
```typescript
Zone.listZones().then((zones: IZone[]) => ...)
```

#### Other Available Methods
```typescript
// Getting all records linked to a zone
Zone.getLinkedRecords(recordId).then((record: IRecord[]) => ...)

// Dynamic action when using website form with string as method name
recordActionByIDs(action: 'updateRecord' | 'deleteRecord' | 'createRecord' , zoneId: string, record: IRecordBody | {id: string});
```

## License

Licensed under MIT
