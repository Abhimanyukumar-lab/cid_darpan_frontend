export class OurTeam {
  constructor(
    public active: boolean,
    public id: number,
    public title: string,
    public titleHi: string,
    public designationId: number,
    public designationName: string,
    public link: string,
    public date: string,
    public description: string,
    public descriptionHi: string,
    public priority: number,
    public language: string,
    public type: string
  ) {}
}
