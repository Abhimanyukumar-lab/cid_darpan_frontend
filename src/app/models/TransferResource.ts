export class TransferResource {
  constructor(
    public id: number,
    public transferId: number,
    public resourceName: string,
    public designation: string,
    public currentPosting: string,
    public lastPosting: string,
    public mobileNumber: string,
    public status: string,
    public createdDate: string,
    public updatedDate: string,
    public active: boolean
  ) {}
}
