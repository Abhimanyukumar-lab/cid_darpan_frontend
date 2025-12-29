import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Role } from 'src/app/models/Role';
import { SubMenu } from 'src/app/models/SubMenu';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new SubMenu(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
  );
  rows = new Array<SubMenu>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Menu Name',
      props: 'menuName',
      size: 2,
      colName: 'MENU.SUB_MENU_NAME',
      colPlaceHolder: 'MENU.ENTER_SUB_MENU_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Menu URL',
      props: 'menuUrl',
      size: 2,
      colName: 'MENU.SUB_MENU_URL',
      colPlaceHolder: 'MENU.ENTER_SUB_MENU_URL',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 2,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
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
      colName: 'Menu Name(English)',
      colPlaceHolder: 'Enter Menu Name(English)',
      data: 'menuName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Menu Name(Hindi)',
      colPlaceHolder: 'Enter Menu Name(Hindi)',
      data: 'menuNameHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'Menu Url',
      colPlaceHolder: 'Enter Menu Url',
      data: 'menuUrl',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'priority',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.SUBMENU_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SUBMENU_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SUBMENU_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SUBMENU_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SUBMENU_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.SUBMENU_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SUBMENU_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.SUBMENU_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.SUBMENU_MODULE.ACTIVATE_URL;
  }

  ngOnInit(): void {}
}
