export class Passport {
  constructor(
    public active: boolean,
    public id: number,
    public passportType: string,
    public dob: string,
    public applicationId: string,
    public name: string,
    public email: string,
    public mobileNo: number,
    public stationId: number,
    public stationName: string,
    public districtId: number,
    public districtName: string,
    public comments: string
  ) {}
}
