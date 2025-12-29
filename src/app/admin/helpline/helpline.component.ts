import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helpline } from 'src/app/models/helpline';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.component.html',
  styleUrls: ['./helpline.component.scss'],
})
export class HelplineComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Helpline(true, null, null, null, null, null, null)
  );
  rows = new Array<Helpline>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      filter: false,
      isNeedToTranslate: false,
      sort: true,
    },
    {
      name: 'Name',
      props: 'name',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'nameHi',
      props: 'nameHi',
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
      name: 'Description (EN)',
      props: 'descriptionEn',
      size: 2,
      colName: 'FORMS.DESCRIPTION',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_DESCRIPTION',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Description (HI)',
      props: 'descriptionHi',
      size: 2,
      colName: 'FORMS.DESCRIPTION',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_DESCRIPTION',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Type',
      props: 'type',
      size: 2,
      colName: 'HELPLINE.TYPE',
      colPlaceHolder: 'HELPLINE.ENTER_TYPE',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'No',
      props: 'no',
      size: 2,
      colName: 'HELPLINE.HELPLINE_TITLE',
      colPlaceHolder: 'HELPLINE.ENTER_HELPLINE',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'FORMS.PRIORITY',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      filter: false,
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
      data: 'name',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'nameHi',
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
      colName: 'HELPLINE.TYPE',
      colPlaceHolder: 'HELPLINE.ENTER_TYPE',
      data: 'type',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.HELPLINE_TITLE',
      colPlaceHolder: 'HELPLINE.ENTER_HELPLINE',
      data: 'no',
      translate: true,
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

  path: string = AppConstants.HELPLINE_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.HELPLINE_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.HELPLINE_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.HELPLINE_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.HELPLINE_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.HELPLINE_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.HELPLINE_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.HELPLINE_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.HELPLINE_MODULE.ACTIVATE_URL;
  }

  ngOnInit(): void {}
}
