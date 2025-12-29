export class StationUser {
  constructor(
    public active: boolean,
    public id: number,
    public priority: number,
    public name: string,
    public image: string,
    public email: string,
    public mobileNo: string,
    public address: string,
    public type: string,
    public stationId: number,
    public sectionsId: number,
    public dspId: number,
    public sdpoId: number,
    public subdivisionId: number,
    public circleId: number,
    public designationId: number,
    public designationName: string,
    public villageName:string,
  ) {}
}
