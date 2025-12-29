export class SmsTemplate {
  constructor(
    public active: boolean,
    public id: number,
    public templateName: string,
    public body: string
  ) {}
}
