export class TransferLocation {
  constructor(
    public id: number,
    public transferId: number,
    public nameOfLocation: string,
    public noOfResourceRequired: string,
    public noOfResourceAllocated: string,
    public transferTiming: string,
    public status: string,
    public createdDate: string,
    public updatedDate: string,
    public active: boolean
  ) {}
}
