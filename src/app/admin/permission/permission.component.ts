import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { Permission } from 'src/app/models/Permission';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { Permissions } from 'src/app/models/Permissions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Permission(null, null, null, null, null)
  );
  rows = new Array<Permission>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Permission Name',
      props: 'permissionName',
      size: 2,
      colName: 'Permission Name',
      colPlaceHolder: 'Enter Permission Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Permission Code',
      props: 'permissionCode',
      size: 2,
      colName: 'Permission Code',
      colPlaceHolder: 'Enter Permission Code',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Permission URL',
      props: 'permissionUrl',
      size: 2,
      colName: 'Permission URL',
      colPlaceHolder: 'Enter Permission URL',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
      filter: false,
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
      colName: 'Permission Name',
      colPlaceHolder: 'Enter Permission Name',
      data: 'permissionName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Permission Code',
      colPlaceHolder: 'Enter Permission Code',
      data: 'permissionCode',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Permission Url',
      colPlaceHolder: 'Enter Permission Url',
      data: 'permissionUrl',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.PERMISSION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.PERMISSION_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.PERMISSION_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.PERMISSION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.PERMISSION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.PERMISSION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.PERMISSION_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.PERMISSION_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.PERMISSION_MODULE.ACTIVATE_URL;
  }

  ngOnInit(): void {}
}
