import { Action } from '@ngrx/store';

export enum AppActionTypes {
  SidebarShow = '[App Component] Sidebar Show',
  SidebarHide = '[App Component] Sidebar Hide',
  LoadderShow = '[App Component] Loadder Show',
  LoadderHide = '[App Component] Loadder Hide',
  ChangeLanguage = '[App Component] Change Language',
  UpdateDistrictDetails = '[App Component] Update Ditails',
  UpdateTableData = '[App Component] Update Table Ditails',
  RefreshViewDataStart = '[App Component] Refresh View Data Ditails',
  RefreshViewDataStop = '[App Component] Refresh View Data Ditails done',
  RefreshTableAndForm = '[App Component] Refresh View Data Ditails and Table data',
  EditFormData = '[App Component] Edit For Data Into Form',
  StopEditFormData = '[App Component] Stop Edit For Data Into Form',
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class AppSidebarShow implements ActionEx {
  readonly type = AppActionTypes.SidebarShow;
  constructor(public payload: any) {}
}

export class AppSidebarHide implements ActionEx {
  readonly type = AppActionTypes.SidebarHide;
  constructor(public payload: any) {}
}

export class AppLoadderShow implements ActionEx {
  readonly type = AppActionTypes.LoadderShow;
  constructor(public payload: any) {}
}

export class AppLoadderHide implements ActionEx {
  readonly type = AppActionTypes.LoadderHide;
  constructor(public payload: any) {}
}

export class AppChangeLanguage implements ActionEx {
  readonly type = AppActionTypes.ChangeLanguage;
  constructor(public payload: any) {}
}

export class UpdateDistrictDetails implements ActionEx {
  readonly type = AppActionTypes.UpdateDistrictDetails;
  constructor(public payload: any) {}
}

export class UpdateTableDetails implements ActionEx {
  readonly type = AppActionTypes.UpdateTableData;
  constructor(public payload: any) {}
}

export class RefreshViewDataStart implements ActionEx {
  readonly type = AppActionTypes.RefreshViewDataStart;
  constructor(public payload: any) {}
}

export class RefreshViewDataStop implements ActionEx {
  readonly type = AppActionTypes.RefreshViewDataStop;
  constructor(public payload: any) {}
}

export class RefreshTableAndForm implements ActionEx {
  readonly type = AppActionTypes.RefreshTableAndForm;
  constructor(public payload: any) {}
}

export class EditFormData implements ActionEx {
  readonly type = AppActionTypes.EditFormData;
  constructor(public payload: any) {}
}

export class StopEditFormData implements ActionEx {
  readonly type = AppActionTypes.StopEditFormData;
  constructor(public payload: any) {}
}