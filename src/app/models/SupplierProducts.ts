export class SupplierProducts {
  constructor(
    public active: boolean,
    public id: number,
    public districtId: number,
    public amcId: number,
    public amcStatus: string,
    public amcStartDate: string,
    public amcEndDate: string,
    public supplierId: number,
    public supplierName: string,
    public assetTypeId: number,
    public assetTypeName: string,
    public productName: string,
    public productPrice: string,
    public totalPrice: string,
    public orderedBy: string,
    public orderedDate: string,
    public requiredBy: string,
    public decription: string,
    public productQuantity: string

  ) {}
}
