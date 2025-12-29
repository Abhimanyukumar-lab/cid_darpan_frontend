export class Holiday {
  constructor(
    public active: boolean,
    public id: number,
    public holidayName: string,
    public holidayDate: Date,
    public holidayEndDate: Date,
    public priority: number
  ) {}
}
