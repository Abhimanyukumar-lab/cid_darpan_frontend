export class Resource {
  isResourceAuthenticated: boolean = false;
  resource: {
    active: boolean;
    createdBy: number;
    createdDate: string;
    districtId: number;
    districtName: string;
    email: string;
    firstName: string;
    name: string;
    id: number;
    lastName: string;
    menus: any[];
    mobileNO: string;
    permissions: any[];
    roleId: number;
    roleName: string;
    sidebarMenu: any[];
    token: string;
    tokenValidity: string;
    updatedBy: number;
    updatedDate: string;
    userImage: string;
  };
}
