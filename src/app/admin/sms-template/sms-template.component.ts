import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmsTemplate } from 'src/app/models/SmsTemplate';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.scss'],
})
export class SmsTemplateComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new SmsTemplate(true, null, null, null)
  );
  rows = new Array<SmsTemplate>();

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
      name: 'templateId',
      props: 'templateId',
      size: 2,
      colName: 'Template Id',
      colPlaceHolder: 'Enter Template Id',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'templateName',
      props: 'templateName',
      size: 2,
      colName: 'Template Name',
      colPlaceHolder: 'Enter Template Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'body',
      props: 'body',
      size: 2,
      colName: 'Body',
      colPlaceHolder: 'Enter Body',
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
      colName: 'Template ID',
      colPlaceHolder: 'Enter Template ID',
      data: 'templateId',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Template Name',
      colPlaceHolder: 'Enter Template Name',
      data: 'templateName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Template Body',
      colPlaceHolder: 'Enter Template Body',
      data: 'body',
      translate: false,
      type: 'INPUT',
    },
  ];


  path: string = AppConstants.SMS_TEMPLATE_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SMS_TEMPLATE_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SMS_TEMPLATE_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SMS_TEMPLATE_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SMS_TEMPLATE_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.SMS_TEMPLATE_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SMS_TEMPLATE_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.SMS_TEMPLATE_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.SMS_TEMPLATE_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
