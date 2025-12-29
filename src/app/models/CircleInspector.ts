export class CircleInspector {
  constructor(
    public active: boolean,
    public id: number,
    public districtId: number,
    public districtName: string,
    public designationId: number,
    public designationName: string,
    public subdivisionId: number,
    public subdivisionName: string,
    public circleOfficerName: string,
    public circleName: string,
    public circleContact: string,
    public circleMobile: string,
    public circleEmail: string,
    public circleAddress: string,
    public circleImage: string,
    public joiningDate: string,
    public priority: number
  ) {}
}
