import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmsServiceProvider } from 'src/app/models/SmsServiceProvider';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-sms-service-provider',
  templateUrl: './sms-service-provider.component.html',
  styleUrls: ['./sms-service-provider.component.scss'],
})
export class SmsServiceProviderComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new SmsServiceProvider(true, null, null, null, null, null, null, null, null)
  );
  rows = new Array<SmsServiceProvider>();

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
      name: 'serviceProviderName',
      props: 'serviceProviderName',
      size: 2,
      colName: 'Service Provider Name',
      colPlaceHolder: 'Enter Service Provider Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'apiKey',
      props: 'apiKey',
      size: 2,
      colName: 'Api Key',
      colPlaceHolder: 'Enter Api Key',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'apiUrl',
      props: 'apiUrl',
      size: 2,
      colName: 'Api Url',
      colPlaceHolder: 'Enter Api Url',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'noOfSms',
      props: 'noOfSms',
      size: 2,
      colName: 'Number Of Sms',
      colPlaceHolder: 'Enter Number Of Sms',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'checkStatusApi',
      props: 'checkStatusApi',
      size: 2,
      colName: 'Check Status API',
      colPlaceHolder: 'Enter Check Status API',
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
      colName: 'Service Provider Name',
      colPlaceHolder: 'Enter Service Provider Name',
      data: 'serviceProviderName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'API Key',
      colPlaceHolder: 'Enter API Key',
      data: 'apiKey',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'API Url',
      colPlaceHolder: 'Enter API Url',
      data: 'apiUrl',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Number Of SMS',
      colPlaceHolder: 'Enter Number Of SMS',
      data: 'noOfSms',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Status API',
      colPlaceHolder: 'Enter Status API',
      data: 'checkStatusApi',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.SMS_SERVICE_PROVIDER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.SMS_SERVICE_PROVIDER_MODULE.ADD_URL;
    this.permissions.edit_url =
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
