export class SmsServiceProvider {
  constructor(
    public active: boolean,
    public id: number,
    public serviceProviderName: string,
    public apiKey: string,
    public apiUrl: string,
    public noOfSms: string,
    public checkStatusApi: string,
    public requestBody: string,
    public responseBody: string
  ) {}
}
