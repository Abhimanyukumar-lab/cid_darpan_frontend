import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth Component] User Login',
  Logout = '[Auth Component] User Logout',
  SessionExpired = '[Auth Component] Session Expired',
  TNCACCEPT = '[Auth Component] TNC Accepted',
  UpdatePermissions = '[Auth Component] Update Permissions',
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class AuthLogin implements ActionEx {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: any) {}
}

export class AuthLogout implements ActionEx {
  readonly type = AuthActionTypes.Logout;
  constructor(public payload: any) {}
}

export class TncAccept implements ActionEx {
  readonly type = AuthActionTypes.TNCACCEPT;
  constructor(public payload: any) {}
}

export class UpdatePermissions implements ActionEx {
  readonly type = AuthActionTypes.UpdatePermissions;
  constructor(public payload: any) {}
}
