import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Holiday } from 'src/app/models/Holiday';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Holiday(null, null, null, null, null, null)
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
    },
    {
      name: 'holidayName',
      props: 'holidayName',
      size: 2,
      colName: 'Holiday Name',
      colPlaceHolder: 'Enter Holiday Name',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'holidayDate',
      props: 'holidayDate',
      size: 2,
      colName: 'Holiday Start Date',
      colPlaceHolder: 'Enter Holiday Start Date',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
    },
    {
      name: 'holidayEndDate',
      props: 'holidayEndDate',
      size: 2,
      colName: 'Holiday End Date',
      colPlaceHolder: 'Enter Holiday End Date',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
    },
  ];

  path: string = AppConstants.HOLIDAY_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserResourcePermission(this.router.url);
  }
  ngOnInit(): void {}
}
