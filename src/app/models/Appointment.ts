export class Appointment {
  constructor(
    public active: boolean,
    public id: number,
    public name: string,
    public mobileNo: number,
    public meetingDate: Date,
    public shift: string,
    public districtId: number,
    public districtName: string,
    public otherDistrict: string,
    public stationId: number,
    public stationName: string,
    public otherPoliceStation: number,
    public purpose: string,
    public userOTP: number,
    public srNo: string,
    public status: string
  ) {}
}
