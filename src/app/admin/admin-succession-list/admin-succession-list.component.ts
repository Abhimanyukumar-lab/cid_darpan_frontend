import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { PressRelease } from 'src/app/models/pressRelease';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-succession-list',
  templateUrl: './admin-succession-list.component.html',
  styleUrls: ['./admin-succession-list.component.scss'],
})
export class AdminSuccessionListComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new PressRelease(
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      'SUCCESSION_LIST'
    )
  );
  rows = new Array<PressRelease>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'title',
      props: 'title',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'titleHi',
      props: 'titleHi',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
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
      name: 'link',
      props: 'link',
      size: 2,
      type: 'MEDIA',
      colName: 'FORMS.IMAGE',
      filter: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'date',
      props: 'date',
      size: 2,
      colName: 'SUCCESSION.START_DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      filter: true,
      type: 'DATE',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'NewDate',
      props: 'newDate',
      size: 2,
      colName: 'SUCCESSION.END_DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
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
      data: 'title',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'titleHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.DESIGNATION',
      colPlaceHolder: 'HELPLINE.ENTER_DESIGNATION',
      data: 'designationIds',
      translate: true,
      type: 'DESIGNATIONS',
    },
    {
      colName: 'SUCCESSION.START_DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      data: 'date',
      translate: false,
      type: 'DATE',
    }, 
    {
      colName: 'SUCCESSION.END_DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      data: 'newDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'priority',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.SUCCESSION_LIST_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SUCCESSION_LIST_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SUCCESSION_LIST_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SUCCESSION_LIST_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SUCCESSION_LIST_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.SUCCESSION_LIST_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SUCCESSION_LIST_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.SUCCESSION_LIST_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.SUCCESSION_LIST_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
