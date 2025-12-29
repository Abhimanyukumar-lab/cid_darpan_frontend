export class Commission {
  constructor(
    public active: boolean,
    public id: number,
    public serialnoDate: string,
    public type: string,
    public date: string,
    public whomToReceive: string,
    public letterNo: string,
    public subject: string,
    public applicantName: string,
    public applicationStatus: string,
    public deadlineDate: string,
    public officerName: string,
    public commisionOrder: string,
    public document: string
  ) {}
}
