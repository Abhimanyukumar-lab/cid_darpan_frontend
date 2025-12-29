import { Action } from '@ngrx/store';

export enum AuthResourceActionTypes {
  LoginResource = '[AuthResource Component] Resource Login',
  LogoutResource = '[AuthResource Component] Resource Logout',
  UpdateResourcePermissions = '[AuthResource Component] Update Permissions',
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class AuthResourceLogin implements ActionEx {
  readonly type = AuthResourceActionTypes.LoginResource;
  constructor(public payload: any) {}
}

export class AuthResourceLogout implements ActionEx {
  readonly type = AuthResourceActionTypes.LogoutResource;
  constructor(public payload: any) {}
}

export class UpdateResourcePermissions implements ActionEx {
  readonly type = AuthResourceActionTypes.UpdateResourcePermissions;
  constructor(public payload: any) {}
}
