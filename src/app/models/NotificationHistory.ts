export class NotificationHistory {
  constructor(
    public active: boolean,
    public id: number,
    public listId: number,
    public listName: string,
    public userId: number,
    public userName: string,
    public msgFrom: number,
    public message: string

  ) {}
}
