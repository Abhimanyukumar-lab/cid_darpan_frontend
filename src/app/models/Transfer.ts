export class Transfer {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public createdDate: string,
    public updatedDate: string,
    public active: boolean
  ) {}
}
