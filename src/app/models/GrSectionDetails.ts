export class GrSectionDetails {
  constructor(
    public active: boolean,
    public id: number,

    public grSectionId: number,
    public personName: string,
    public type: string,
    public accuseIn: string
  ) {}
}
