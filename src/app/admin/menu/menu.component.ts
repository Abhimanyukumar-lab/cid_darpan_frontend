import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Menu(null, null, null, null, null, null)
  );
  rows = new Array<Menu>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Menu Name',
      props: 'menuName',
      size: 2,
      colName: 'MENU.MENU_NAME',
      colPlaceHolder: 'MENU.ENTER_MENU_NAME',
      filter: true,
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Menu Name',
      props: 'menuNameHi',
      size: 2,
      colName: 'MENU.MENU_NAME',
      colPlaceHolder: 'MENU.ENTER_MENU_NAME',
      filter: true,
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Menu Url',
      props: 'menuUrl',
      size: 2,
      colName: 'MENU.MENU_URL',
      colPlaceHolder: 'MENU.ENTER_MENU_URL',
      filter: true,
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      filter: false,
      sort:true,
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

  path: string = AppConstants.MENU_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.MENU_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.MENU_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.MENU_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.MENU_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.MENU_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.MENU_MODULE.EDIT_URL;
    this.permissions.deactivate_url = AppConstants.MENU_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.MENU_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
