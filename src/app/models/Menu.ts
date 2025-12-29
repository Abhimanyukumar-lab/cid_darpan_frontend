export class Menu {
  constructor(
    public active: boolean,
    public id: number,
    public menuName: string,
    public menuUrl: string,
    public menuIcon: string,
    public priority: number
  ) {}
}
