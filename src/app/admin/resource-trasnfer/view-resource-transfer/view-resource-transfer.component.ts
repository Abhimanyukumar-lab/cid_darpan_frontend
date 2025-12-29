import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { TransferLocation } from 'src/app/models/TransferLocation';
import { TransferResource } from 'src/app/models/TransferResource';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-resource-transfer',
  templateUrl: './view-resource-transfer.component.html',
  styleUrls: ['./view-resource-transfer.component.scss'],
})
export class ViewResourceTransferComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [],
    new TransferResource(
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
      true
    )
  );
  rows = new Array<TransferResource>();

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
      name: 'resourceName',
      props: 'resourceName',
      size: 2,
      colName: 'Name',
      colPlaceHolder: 'Enter Name',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'designation',
      props: 'designation',
      size: 2,
      colName: 'Designation',
      colPlaceHolder: 'Enter designation',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'currentPosting',
      props: 'currentPosting',
      size: 2,
      colName: 'Current Posting',
      colPlaceHolder: 'Enter Current Posting',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'lastPosting',
      props: 'lastPosting',
      size: 2,
      colName: 'Last Posting',
      colPlaceHolder: 'Enter Last Posting',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileNumber',
      props: 'mobileNumber',
      size: 2,
      colName: 'Mobile Number',
      colPlaceHolder: 'Enter Mobile Number',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Status',
      props: 'status',
      size: 2,
      colName: 'Status',
      colPlaceHolder: 'Enter Status',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'newPosting',
      props: 'newPosting',
      size: 2,
      colName: 'Allocated Posting',
      colPlaceHolder: 'Enter Status',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
  ];

  path: string = AppConstants.TRANSFER_MODULE.RESOURCE_FETCH_URL;
  permissions: Permissions = new Permissions();

  locationPage = new Page(
    0,
    0,
    0,
    0,
    true,
    [],
    new TransferLocation(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true
    )
  );
  locationRows = new Array<TransferResource>();

  locationColumns = [
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
      name: 'nameOfLocation',
      props: 'nameOfLocation',
      size: 2,
      colName: 'Name',
      colPlaceHolder: 'Enter Name',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'noOfResourceRequired',
      props: 'noOfResourceRequired',
      size: 2,
      colName: 'No Of Resources Required',
      colPlaceHolder: 'Enter designation',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'noOfResourceAllocated',
      props: 'noOfResourceAllocated',
      size: 2,
      colName: 'No Of Resources Allocated',
      colPlaceHolder: 'Enter Current Posting',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'transferTiming',
      props: 'transferTiming',
      size: 2,
      colName: 'Transfer Timing',
      colPlaceHolder: 'Enter Last Posting',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
  ];

  locationPath: string = AppConstants.TRANSFER_MODULE.LOCATION_FETCH_URL;
  locationPermissions: Permissions = new Permissions();

  baseUrl: string = AppConstants.backServer;
  transfer: any;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;
    this.global.checkForUserPermission(this.router.url);
    this.transfer = this.localStorage.getStoredValue('viewData');

    this.page.filter['transferId'] = this.transfer.id;
    this.locationPage.filter['transferId'] = this.transfer.id;
  }

  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }
}
