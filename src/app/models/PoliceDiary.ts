export class PoliceDiary {
  constructor(
    public id: number,
    public stationId: number,
    public stationName: string,
    public crNo: string,
    public kandTithi: string,
    public dhara: string,
    public crimeLocation: string,
    public personDetails: string,
    public otherDetails: string,
    public location: string,
    public fill_1: string,
    public fill_2: string,
    public status: string,
    public createdBy: number,
    public createdDate: string,
    public updatedBy: number,
    public updatedDate: string,
    public active: boolean
  ) {}
}
