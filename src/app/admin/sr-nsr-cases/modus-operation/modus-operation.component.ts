import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModusOperation } from 'src/app/models/ModusOperation';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-modus-operation',
  templateUrl: './modus-operation.component.html',
  styleUrls: ['./modus-operation.component.scss'],
})
export class ModusOperationComponent {
  page: Page;
  rows = new Array<ModusOperation>();

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
      name: 'crimeCategoryName',
      props: 'crimeCategoryName',
      size: 1,
      colName: 'Major Head Name',
      colPlaceHolder: 'Enter Major Head Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'crimeSubCategoryTypeName',
      props: 'crimeSubCategoryTypeName',
      size: 1,
      colName: 'Sub Major Head Name',
      colPlaceHolder: 'Enter Sub Major Head Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
      size: 1,
      colName: 'Name',
      colPlaceHolder: 'Enter Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'nameHi',
      props: 'nameHi',
      size: 1,
      colName: 'Name Hi',
      colPlaceHolder: 'Enter Name Hi',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'descriptionDetails',
      props: 'descriptionDetails',
      size: 1,
      colName: 'Description',
      colPlaceHolder: 'Enter Description',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
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
      data: 'cidCrimeSubCategoryId',
      translate: false,
      type: 'SELECT',
      options: [],
    },
    {
      colName: 'Name',
      colPlaceHolder: 'Enter Name',
      data: 'name',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Name Hi',
      colPlaceHolder: 'Enter Name Hi',
      data: 'nameHi',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url =
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.ADD_URL;
    this.permissions.edit_url =
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.EDIT_URL;

    // this.permissions.view = this.global.checkForUserButtonPermission(
    //   AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.VIEW_BUTTON
    // );

    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.deactivate_url =
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.DEACTIVATE_URL;

    this.permissions.activate_url =
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.ACTIVATE_URL;

    // this.permissions.view_url = AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.VIEW_URL;
    // this.permissions.delete_url =
    // AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.DELETE_URL;

    this.fetchMajorHead();
    this.fetchSubMajorHead();
  }

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new ModusOperation(
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

  fetchSubMajorHead = () => {
    this.apiService.apiGetCall('getCIDCrimeCategoryTypeData', true).subscribe(
      (data) => {
        var options = [
          {
            key: 'Select Sub Major Head',
            value: 'null',
          },
        ];
        data.cidCrimeCategories.map((category) => {
          options.push({
            key: category.typeOfCrime,
            value: category.id,
          });
        });

        this.filterOptions[2].options = options;
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
