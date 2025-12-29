export class AppointmentHistory {
  constructor(
    public active: boolean,
    public appDate: string,
    public appTime: string,
    public appoDate: string,
    public appoTime: string,
    public appointmentId: number,
    public createdBy: number,
    public createdDate: string,
    public createdInfo: string,
    public districtId: number,
    public districtName: string,
    public id: number,
    public message: string,
    public name: string,
    public updatedBy: number,
    public updatedDate: string
  ) {}
}
