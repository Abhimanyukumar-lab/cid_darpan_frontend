export class AssetSupplier {
    constructor(
        public active: boolean,
        public id: number,
        public districtId: number,
        public districtName: string,
        public supplierName: string,
        public supplierAddress: string,
        public supplierMobileNo: string,
        public supplierContactNo: string,
        public supplierEmail: string,
        public supplierAMS: string,
        public supplierAMSStartDate: string,
        public supplierAMSEndDate: string,
          
    ) { }
}