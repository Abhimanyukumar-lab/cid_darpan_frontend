export class SmsSending {
  constructor(
    public active: boolean,
    public id: number,
    public message: string,
    public messageTo: string,
    public messageFrom: string,
    public receiverName: string,
    public caseId: string,
    public departmentName: string
  ) {}
}
