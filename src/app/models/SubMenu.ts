export class SubMenu {
  constructor(
    public active: boolean,
    public id: number,
    public mainMenu: string,
    public mainMenuId: number,
    public menuId: number,
    public menuName: string,
    public menuUrl: string,
    public priority: number,
    public submenus: string,
    public subMenuId: number,
    public subMenu: string,
    public menuIcon: string
  ) {}
}
