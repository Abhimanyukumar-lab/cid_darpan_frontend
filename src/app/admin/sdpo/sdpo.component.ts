import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sdpo } from 'src/app/models/Sdpo';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-sdpo',
  templateUrl: './sdpo.component.html',
  styleUrls: ['./sdpo.component.scss'],
})
export class SdpoComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Sdpo(true, null, null, null, null, null, null, null, null, null, null)
  );
  rows = new Array<Sdpo>();

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
      name: 'headName',
      props: 'headName',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'headNameHi',
      props: 'headNameHi',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'designationName',
      props: 'designationName',
      size: 2,
      colName: 'HELPLINE.DESIGNATION',
      colPlaceHolder: 'HELPLINE.ENTER_DESIGNATION',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'headImage',
      props: 'headImage',
      size: 2,
      colName: 'FORMS.IMAGE',
      type: 'MEDIA',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'headMobile',
      props: 'headMobile',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'headEmail',
      props: 'headEmail',
      size: 2,
      colName: 'CONTACT.EMAIL',
      colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
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
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'headName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'headNameHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      data: 'headMobile',
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

  path: string = AppConstants.SDPO_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.VIEW_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.SDPO_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SDPO_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.SDPO_MODULE.VIEW_URL;
    this.permissions.deactivate_url = AppConstants.SDPO_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.SDPO_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
