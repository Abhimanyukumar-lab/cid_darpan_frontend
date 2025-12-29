import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Role } from 'src/app/models/Role';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  page = new Page(0, 0, 0, 0, false,
    null, new Role(true, null, null));
  rows = new Array<Role>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      filter: false,
      isTranslate: false,
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Role Name',
      props: 'roleName',
      size: 2,
      colName: 'Role Name',
      colPlaceHolder: 'Enter Role Name',
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
      colName: 'Role Name',
      colPlaceHolder: 'Enter Role Name',
      data: 'roleName',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.ROLE_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.ADD_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.VIEW_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.ROLE_MODULE.ADD_URL;
    this.permissions.view_url = AppConstants.ROLE_MODULE.VIEW_URL;
    this.permissions.edit_url = AppConstants.ROLE_MODULE.EDIT_URL;
    this.permissions.deactivate_url = AppConstants.ROLE_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.ROLE_MODULE.ACTIVATE_URL;
  }

  ngOnInit(): void {}
}
