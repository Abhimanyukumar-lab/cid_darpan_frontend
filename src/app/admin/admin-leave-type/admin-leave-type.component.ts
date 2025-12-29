import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveType } from 'src/app/models/LeaveType';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-leave-type',
  templateUrl: './admin-leave-type.component.html',
  styleUrls: ['./admin-leave-type.component.scss'],
})
export class AdminLeaveTypeComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new LeaveType(true, null, null, null, null)
  );
  rows = new Array<LeaveType>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveType',
      props: 'leaveType',
      size: 2,
      colName: 'LEAVE_TYPE.LEAVE_TITLE',
      colPlaceHolder: 'LEAVE_TYPE.ENTR_LEAVE_TITLE',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveCode',
      props: 'leaveCode',
      size: 2,
      colName: 'LEAVE_TYPE.LEAVE_CODE',
      colPlaceHolder: 'LEAVE_TYPE.ENTR_LEAVE_CODE',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'allowedLeave',
      props: 'allowedLeave',
      size: 2,
      colName: 'LEAVE_TYPE.ALLOWED_LEAVE',
      colPlaceHolder: 'LEAVE_TYPE.ENTR_ALLOWED_LEAVE',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      isTranslate: false,
      isNeedToTranslate: false,
    },
  ];

  filterOptions = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'LEAVE_TYPE.LEAVE_TITLE',
      colPlaceHolder: 'LEAVE_TYPE.ENTR_LEAVE_TITLE',
      data: 'leaveType',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'LEAVE_TYPE.LEAVE_CODE',
      colPlaceHolder: 'LEAVE_TYPE.ENTR_LEAVE_CODE',
      data: 'leaveCode',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'LEAVE_TYPE.ALLOWED_LEAVE',
      colPlaceHolder: 'LEAVE_TYPE.ENTR_ALLOWED_LEAVE',
      data: 'allowedLeave',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.LEAVE_TYPE_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_TYPE_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_TYPE_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_TYPE_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_TYPE_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.LEAVE_TYPE_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.LEAVE_TYPE_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.LEAVE_TYPE_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.LEAVE_TYPE_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
