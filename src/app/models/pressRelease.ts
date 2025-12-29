export class PressRelease {
  constructor(
    public active: boolean,
    public id: number,
    public title: string,
    public description: string,
    public releasedBy: string,
    public date: string,
    public newDate: string,
    public link: string,
    public priority: number,
    public language: string,
    public type: string
  ) {}
}
