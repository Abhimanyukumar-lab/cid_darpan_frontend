import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from 'src/app/models/Options';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Options(true, null, null, null, null, null, null)
  );
  rows = new Array<Options>();

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
      name: 'optionNameEn',
      props: 'optionNameEn',
      size: 2,
      colName: 'OPTIONS.OPTION_NAME_EN',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_NAME_EN',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'optionNameHi',
      props: 'optionNameHi',
      size: 2,
      colName: 'OPTIONS.OPTION_NAME_HI',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_NAME_HI',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Option Value',
      props: 'optionValue',
      size: 2,
      colName: 'OPTIONS.OPTION_VALUE',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_VALUE',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Form Id',
      props: 'formId',
      size: 2,
      colName: 'OPTIONS.OPTION_FORM_ID',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_FORM_ID',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
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
      data: 'optionNameEn',
      colName: 'OPTIONS.OPTION_NAME_EN',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_NAME_EN',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'optionNameHi',
      colName: 'OPTIONS.OPTION_NAME_HI',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_NAME_HI',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'optionValue',
      colName: 'OPTIONS.OPTION_VALUE',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_VALUE',
      translate: true,
      type: 'APPTYPE',
    },
    {
      data: 'formId',
      colName: 'OPTIONS.OPTION_FORM_ID',
      colPlaceHolder: 'OPTIONS.ENTER_OPTION_FORM_ID',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'priority',
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      translate: false,
      type: 'INPUT',
    },
    
  ];

  path: string = AppConstants.OPTION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.OPTION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.OPTION_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.OPTION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.OPTION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.OPTION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.OPTION_MODULE.EDIT_URL;
    this.permissions.deactivate_url = AppConstants.OPTION_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.OPTION_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
