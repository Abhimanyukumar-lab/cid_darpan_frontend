export class Subdivision {
  constructor(
    public active: boolean,
    public id: number,
    public districtId: number,
    public name: string,
    public description: string,
    public sdpoId: number,
    public sdpoName: string
  ) {}
}
