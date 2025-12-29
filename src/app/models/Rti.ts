export class Rti {
  constructor(
    public active: boolean,
    public id: number,
    public rtoRequestMobNo: string,
    public rtoRequestAddress: string,
    public rtoRequestname: string,
    public rtoSubject: string,
    public sectionId: string,
    public sectionName: string,
    public ef3: string,
    public rtoReceiveNo: string,
    public dspNrtoResolveDateame: string,
    public rtoResolveNo: string,
    public rtoRemark: string,
    public ef1: string
  ) {}
}
