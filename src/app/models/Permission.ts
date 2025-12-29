export class Permission {
  constructor(
    public active: boolean,
    public id: number,
    public permissionCode: string,
    public permissionName: string,
    public permissionUrl: string
  ) {}
}
