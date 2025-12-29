import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MajorHead } from 'src/app/models/MajorHead';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-major-head',
  templateUrl: './major-head.component.html',
  styleUrls: ['./major-head.component.scss'],
})
export class MajorHeadComponent implements OnInit {
  page: Page;
  rows = new Array<MajorHead>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'nameOfCrimeCategory',
      props: 'nameOfCrimeCategory',
      size: 1,
      colName: 'Major Head Name',
      colPlaceHolder: 'Enter Major Head Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'nameOfCrimeCategoryHi',
      props: 'nameOfCrimeCategoryHi',
      size: 1,
      colName: 'Major Head Name Hi',
      colPlaceHolder: 'Enter Major Head Name Hi',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'chargesheetMonitoringDays',
    //   props: 'chargesheetMonitoringDays',
    //   size: 1,
    //   colName: 'Chargesheet Monitoring Days',
    //   colPlaceHolder: 'Enter Chargesheet Monitoring Days',
    //   filter: false,
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
      isTranslate: false,
      width: '100',
      sort: false,
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
      colName: 'Major Head Name',
      colPlaceHolder: 'Enter Major Head Name',
      data: 'nameOfCrimeCategory',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Major Head Name Hi',
      colPlaceHolder: 'Enter Major Head Name Hi',
      data: 'nameOfCrimeCategoryHi',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.ADD_URL;
    this.permissions.edit_url =
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.EDIT_URL;

    // this.permissions.view = this.global.checkForUserButtonPermission(
    //   AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.VIEW_BUTTON
    // );

    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.deactivate_url =
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.DEACTIVATE_URL;

    this.permissions.activate_url =
      AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.ACTIVATE_URL;

    // this.permissions.view_url = AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.VIEW_URL;
    // this.permissions.delete_url =
    // AppConstants.SRS_NSRS_MEJOR_HEAD_MODULE.DELETE_URL;
  }

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new MajorHead(null, null, null, null, null, null, null)
    );
  }

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };
}
