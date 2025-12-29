export class PoliceOfficer {
  constructor(
    public id: number,
    public brassNo: number,
    public desig: string,
    public name: string,
    public mobileNo: string,
    public dob: string,
    public doj: string,
    public homeDist: string,
    public placeOfPosting: string,
    public natureOfDuty: string,
    public createdBy: number,
    public createdDate: string,
    public updatedBy: number,
    public updatedDate: string,
    public active: boolean
  ) {}
}
