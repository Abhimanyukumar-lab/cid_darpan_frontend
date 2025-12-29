export class AssetDetails {
  constructor(
    public active: boolean,
    public id: number,
    public productId: number,
    public productName: string,
    public allocatedToId: number,
    public allocatedToName: number,
    public allocatedById: number,
    public allocatedByName: string,
    public quantityAllocated: string,
    public endAssetId: string,
    public startAssetId: string
  ) {}
}
