export class SectionsUser {
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
    public sectionsId: number,
    public designationId: number,
    public designationName: string,
    public villageName: string
  ) {}
}
