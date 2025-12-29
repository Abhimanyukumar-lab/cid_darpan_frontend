export class UserData {
  constructor(
    public active: boolean,
    public id: number,
    public firstName: string,
    public lastName: string,
    public role: {
      id: number;
      roleName: string;
    },
    public roleId: number,
    public roleName: string,
    public sectionId: number,
    public sectionName: string,
    public dspId: number,
    public dspName: string,
    public sdpoId: number,
    public sdpoName: string,
    public circleInspectorId: number,
    public circleInspectorName: string,
    public mobileNO: string,
    public contactNo: string,
    public email: string,
    public password: number,
    public userImage: string
  ) {}
}
