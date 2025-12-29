export class AssetStock {
  constructor(
    public active: boolean,
    public id: number,
    public districtId: number,
    public assetTypeId: number,
    public assetType: string,
    public assignToId: number,
    public totalQuantity: string,
    public allocatedQuantity: string,
    public remainingQuantity: string,
    public assetAllocationId: number
  ) {}
}
