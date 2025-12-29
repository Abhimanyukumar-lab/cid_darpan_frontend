export class CourtDetails {
  constructor(
    public active: boolean,
    public id: number,
    public courtId: number,
    public nextDate: string,
    public description: string,
    public courtType: string
  ) {}
}
