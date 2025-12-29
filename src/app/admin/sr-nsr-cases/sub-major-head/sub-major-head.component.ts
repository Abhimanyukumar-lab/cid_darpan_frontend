import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { SubMajorHead } from 'src/app/models/SubMajorHead';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-sub-major-head',
  templateUrl: './sub-major-head.component.html',
  styleUrls: ['./sub-major-head.component.scss'],
})
export class SubMajorHeadComponent implements OnInit {
  page: Page;
  rows = new Array<SubMajorHead>();

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
      name: 'typeOfCrime',
      props: 'typeOfCrime',
      size: 1,
      colName: 'Sub Major Head Name',
      colPlaceHolder: 'Enter Sub Major Head Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'typeOfCrimeHi',
      props: 'typeOfCrimeHi',
      size: 1,
      colName: 'Sub Major Head Name Hi',
      colPlaceHolder: 'Enter Sub Major Head Name Hi',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'allowAccused',
      props: 'allowAccused',
      size: 1,
      colName: 'Allow Accused',
      colPlaceHolder: 'Enter Allow Accused',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'TRUE-FALSE',
      data: {
        true: 'Allowed',
        false: 'Not Allowed',
      },
    },
    {
      name: 'allowDeceased',
      props: 'allowDeceased',
      size: 1,
      colName: 'Allow Deceased',
      colPlaceHolder: 'Enter Allow Deceased',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'TRUE-FALSE',
      data: {
        true: 'Allowed',
        false: 'Not Allowed',
      },
    },
    {
      name: 'allowVictim',
      props: 'allowVictim',
      size: 1,
      colName: 'Allow Victim',
      colPlaceHolder: 'Enter Allow Victim',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'TRUE-FALSE',
      data: {
        true: 'Allowed',
        false: 'Not Allowed',
      },
    },
    {
      name: 'allowCashCollection',
      props: 'allowCashCollection',
      size: 1,
      colName: 'Allow Cash Collection',
      colPlaceHolder: 'Enter Allow Cash Collection',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'TRUE-FALSE',
      data: {
        true: 'Allowed',
        false: 'Not Allowed',
      },
    },
    {
      name: 'allowLootedItems',
      props: 'allowLootedItems',
      size: 1,
      colName: 'Allow Looted Items',
      colPlaceHolder: 'Enter Allow Looted Items',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'TRUE-FALSE',
      data: {
        true: 'Allowed',
        false: 'Not Allowed',
      },
    },
    {
      name: 'allowOtherEvidence',
      props: 'allowOtherEvidence',
      size: 1,
      colName: 'Allow Other Evidence',
      colPlaceHolder: 'Enter Allow Other Evidence',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'TRUE-FALSE',
      data: {
        true: 'Allowed',
        false: 'Not Allowed',
      },
    },
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
      data: 'cidCrimeCategoryId',
      translate: false,
      type: 'SELECT',
      options: [],
    },
    {
      colName: 'Sub Major Head Name',
      colPlaceHolder: 'Enter Sub Major Head Name',
      data: 'typeOfCrime',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Sub Major Head Name Hi',
      colPlaceHolder: 'Enter Sub Major Head Name Hi',
      data: 'typeOfCrimeHi',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url =
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.ADD_URL;
    this.permissions.edit_url =
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.EDIT_URL;

    // this.permissions.view = this.global.checkForUserButtonPermission(
    //   AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.VIEW_BUTTON
    // );

    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.deactivate_url =
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.DEACTIVATE_URL;

    this.permissions.activate_url =
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.ACTIVATE_URL;

    // this.permissions.view_url = AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.VIEW_URL;
    // this.permissions.delete_url =
    // AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.DELETE_URL;

    this.fetchMajorHead();
  }

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new SubMajorHead(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      )
    );
  }

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };

  fetchMajorHead = () => {
    this.apiService.apiGetCall('getCIDCrimeCategoryList', true).subscribe(
      (data) => {
        var options = [
          {
            key: 'Select Major Head',
            value: 'null',
          },
        ];
        data.cidCrimeCategories.map((category) => {
          options.push({
            key: category.nameOfCrimeCategory,
            value: category.id,
          });
        });

        this.filterOptions[1].options = options;
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
