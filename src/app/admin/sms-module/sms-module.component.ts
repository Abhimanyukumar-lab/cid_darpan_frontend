import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sms } from 'src/app/models/Sms';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-sms-module',
  templateUrl: './sms-module.component.html',
  styleUrls: ['./sms-module.component.scss'],
})
export class SmsModuleComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Sms(true, null, null, null, null, null, null)
  );
  rows = new Array<Sms>();

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
      name: 'moduleName',
      props: 'moduleName',
      size: 2,
      colName: 'Module Name',
      colPlaceHolder: 'Enter Module Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'smsServiceProviderName',
      props: 'smsServiceProviderName',
      size: 2,
      colName: 'Service Provider',
      colPlaceHolder: 'Enter Service Provider',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'smsTemplateName',
      props: 'smsTemplateName',
      size: 2,
      colName: 'Sms Template',
      colPlaceHolder: 'Enter Sms Template',
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

  filterOptions = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Module Name',
      colPlaceHolder: 'Enter Module Name',
      data: 'moduleName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Service Provider',
      colPlaceHolder: 'Enter Service Provider',
      data: 'smsServiceProviderId',
      translate: false,
      type: 'SMSPROVIDER',
    },
    {
      colName: 'SMS Template',
      colPlaceHolder: 'Enter SMS Template',
      data: 'smsTemplateId',
      translate: false,
      type: 'SMSTEMPLATE',
    },
  ];

  path: string = AppConstants.SMS_MODULE_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SMS_MODULE_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SMS_MODULE_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.SMS_MODULE_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SMS_MODULE_MODULE.EDIT_URL;
  }
  ngOnInit(): void {}
}
