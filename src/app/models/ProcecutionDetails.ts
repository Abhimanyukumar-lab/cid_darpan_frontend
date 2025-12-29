export class ProcecutionDetails {
  constructor(
    public active: boolean,
    public id: number,

    public procecutionId: number,
    public personName: string,
    public type: string,
    public accuseIn: string
  ) {}
}
