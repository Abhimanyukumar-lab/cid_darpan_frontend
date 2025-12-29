import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { SystemConfig } from 'src/app/models/SystemConfig';
import { Module } from 'src/app/models/Module';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss'],
})
export class SystemConfigComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new SystemConfig(null, null, null)
  );
  rows = new Array<SystemConfig>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'data',
      props: 'data',
      size: 2,
      colName: 'Data',
      colPlaceHolder: 'Enter Data',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'value',
      props: 'value',
      size: 2,
      colName: 'Value',
      colPlaceHolder: 'Enter Value',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'type',
      props: 'type',
      size: 2,
      colName: 'Type',
      colPlaceHolder: 'Enter Type',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'module',
      props: 'module',
      size: 2,
      colName: 'Module',
      colPlaceHolder: 'Enter Module',
      filter: true,
      sort: true,
      isTranslate: false,
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

  
  filterOptionsConfig = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'data',
      colName: 'Data',
      colPlaceHolder: 'Enter Data',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'value',
      colName: 'Value',
      colPlaceHolder: 'Enter Value',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'type',
      colName: 'Type',
      colPlaceHolder: 'Enter Type',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'module',
      colName: 'Module',
      colPlaceHolder: 'Enter Module',
      translate: false,
      type: 'INPUT',
    },
  ];

  // for module

  pageModule = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Module(null, null, null)
  );
  rowsModule = new Array<Module>();

  columnsModule = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort: true,
      isTranslate: false,
    },
    {
      name: 'moduleName',
      props: 'moduleName',
      size: 2,
      colName: 'Module Name',
      colPlaceHolder: 'Enter Module Name',
      filter: true,
      sort: true,
      isTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      isTranslate: false,
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
      data: 'moduleName',
      colName: 'Module Name',
      colPlaceHolder: 'Enter Module Name',
      translate: false,
      type: 'INPUT',
    },
  ];

  pathModule: string = AppConstants.SYS_MODULE_MODULE.FETCH_URL;
  path: string = AppConstants.SYS_CONFIG_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();
  permissionsModule: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SYS_CONFIG_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SYS_CONFIG_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.SYS_CONFIG_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SYS_CONFIG_MODULE.EDIT_URL;

    this.permissionsModule.add = this.global.checkForUserButtonPermission(
      AppConstants.SYS_MODULE_MODULE.ADD_BUTTON
    );
    this.permissionsModule.edit = this.global.checkForUserButtonPermission(
      AppConstants.SYS_MODULE_MODULE.EDIT_BUTTON
    );
    this.permissionsModule.deactivate =
      this.global.checkForUserButtonPermission(
        AppConstants.SYS_MODULE_MODULE.DEACTIVATE_BUTTON
      );
    this.permissionsModule.activate = this.global.checkForUserButtonPermission(
      AppConstants.SYS_MODULE_MODULE.ACTIVATE_BUTTON
    );

    this.permissionsModule.add_url = AppConstants.SYS_MODULE_MODULE.ADD_URL;
    this.permissionsModule.edit_url = AppConstants.SYS_MODULE_MODULE.EDIT_URL;
    this.permissionsModule.deactivate_url =
      AppConstants.SYS_MODULE_MODULE.DEACTIVATE_URL;
    this.permissionsModule.activate_url =
      AppConstants.SYS_MODULE_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
