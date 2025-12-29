import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Holiday } from 'src/app/models/Holiday';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-holiday',
  templateUrl: './admin-holiday.component.html',
  styleUrls: ['./admin-holiday.component.scss'],
})
export class AdminHolidayComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Holiday(true, null, null, null, null, null)
  );
  rows = new Array<Holiday>();

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
      name: 'holidayName',
      props: 'holidayName',
      size: 2,
      colName: 'HOLIDAYS.HOL_NAME',
      colPlaceHolder: 'HOLIDAYS.ENTR_HOL_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'holidayDate',
      props: 'holidayDate',
      size: 2,
      colName: 'HOLIDAYS.HOL_DATE',
      colPlaceHolder: 'HOLIDAYS.HOL_DATE',
      type: 'DATE',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'holidayEndDate',
      props: 'holidayEndDate',
      size: 2,
      colName: 'HOLIDAYS.HOL_END_DATE',
      colPlaceHolder: 'HOLIDAYS.HOL_END_DATE',
      type: 'DATE',
      isTranslate: true,
      sort: true,
      filter: true,
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
      colName: 'HOLIDAYS.HOL_NAME',
      colPlaceHolder: 'HOLIDAYS.ENTR_HOL_NAME',
      data: 'holidayName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HOLIDAYS.HOL_DATE',
      colPlaceHolder: 'HOLIDAYS.HOL_DATE',
      data: 'holidayDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'HOLIDAYS.HOL_END_DATE',
      colPlaceHolder: 'HOLIDAYS.HOL_END_DATE',
      data: 'holidayEndDate',
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

  path: string = AppConstants.HOLIDAY_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.HOLIDAY_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.HOLIDAY_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.HOLIDAY_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.HOLIDAY_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.HOLIDAY_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.HOLIDAY_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.HOLIDAY_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.HOLIDAY_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
