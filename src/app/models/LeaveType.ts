export class LeaveType {
  constructor(
    public active: boolean,
    public id: number,
    public leaveType: string,
    public leaveCode: string,
    public allowedLeave: number
  ) {}
}
