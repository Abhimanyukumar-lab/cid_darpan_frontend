export class Sms {
  constructor(
    public active: boolean,
    public id: number,
    public smsServiceProviderId: number,
    public smsServiceProviderName: string,
    public smsTemplateId: number,
    public smsTemplateName: string,
    public moduleName: string
  ) {}
}
