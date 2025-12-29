export class SmsSchedular {
  constructor(
    public active: boolean,
    public id: number,
    public name: string,
    public senderId: number,
    public subject: string,
    public description: string,
    public scheduleTime: string,
    public status: string,
    public sendedBy: string,
    public sectionsId: string,
    public smsServiceProviderId: number,
    public smsTemplateId: string
  ) {}
}
