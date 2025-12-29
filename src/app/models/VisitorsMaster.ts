export class VisitorsMaster {
  constructor(
    public active: boolean,
    public id: number,
    public districtId: number,
    public name: string,
    public address: string,
    public mobileno: string,
    public personToMeet: string,
    public reasonToMeet: string,
    public photoName: string,
    public photo: string,
    public conviction: string,
    public visitorDocuments: string,
    public visitorAfterMeetingDocuments: string,
    public applicationcategory: string,
    public subjectof_application: string,
    public policeStationId: string,
    public policeStationName: string,
    public createdDatenInfo: string,
    public reportStatius: string,
    public updateStatus: string,
    public status: string
  ) {}
}
