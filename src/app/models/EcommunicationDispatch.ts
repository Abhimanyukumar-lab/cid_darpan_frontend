export class EcommunicationDispatch {
  constructor(
    public active: boolean,
    public id: number,
    public ecommNoDate: string,
    public reciptNo: string,
    public stationFrom: string,
    public ecommSrNo: string,
    public ecommDate: string,
    public ecommSubject: string,
    public assigndFor: string,
    public assigndForName: string,
    public ecommreceviedNo: string,
    public ecommQueriesReceivedDate: string,
    public ecommresolveNo: string,
    public ecommResolvedDate: string,
    public ecommSummary: string,
    public ecommStatus: string,
    public recDispatch: number,
    public ecommFill2: string
  ) {}
}
