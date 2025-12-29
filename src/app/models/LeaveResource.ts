import { LeaveType } from './LeaveType';

export class LeaveResource {
  constructor(
    public approvedLeaves: number,
    public districtId: number,
    public districtName: string,
    public eDateTime: string,
    public id: number,
    public idInfo: number,
    public leaveType: LeaveType,
    public leaveTypeId: number,
    public leaveTypeName: string,
    public reInteger2: number,
    public remHoliday: number,
    public resourceId: number,
    public sDateTime: string,
    public startDate: string
  ) {}
}
