import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetStock } from 'src/app/models/AssetStock';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-stocks',
  templateUrl: './view-stocks.component.html',
  styleUrls: ['./view-stocks.component.scss'],
})
export class ViewStocksComponent implements OnInit {
  assetAllocation: any = null;

  page = null;
  rows = new Array<AssetStock>();

  columns = [
    { name: 'Id', props: 'id', size: 1, colName: 'Id', sort: true },
    {
      name: 'crno',
      props: 'crno',
      size: 2,
      colName: 'CR NO',
      colPlaceHolder: 'CR NO',
      isTranslate: false,
      sort: false,
      filter: false,
      isNeedToTranslate: false,
    },
    {
      name: 'allocatetedDate',
      props: 'allocatetedDate',
      size: 2,
      colName: 'Date of Issue',
      colPlaceHolder: 'Enter Date of Issue',
      isTranslate: false,
      sort: false,
      filter: false,
      isNeedToTranslate: false,
      type: 'DATE',
    },
    {
      name: 'assignToName',
      props: 'assignToName',
      size: 2,
      colName: 'Assigned To',
      colPlaceHolder: 'Enter Assigned To Name',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'suppliersProductName',
      props: 'suppliersProductName',
      size: 2,
      colName: 'Asset Name',
      colPlaceHolder: 'Enter Asset Name',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'allocatedQuantity',
      props: 'allocatedQuantity',
      size: 2,
      colName: 'Quantity Allocated',
      colPlaceHolder: 'Enter Quantity Allocated',
      isTranslate: false,
      sort: false,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'remainingQuantity',
      props: 'remainingQuantity',
      size: 2,
      colName: 'Remaining Quantity In Store',
      colPlaceHolder: 'Enter Remaining Quantity In Store',
      isTranslate: false,
      sort: false,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'totalQuantity',
      props: 'totalQuantity',
      size: 2,
      colName: 'Total Quantity In Store',
      colPlaceHolder: 'Enter Total Quantity In Store',
      isTranslate: false,
      sort: false,
      filter: true,
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
  ];

  path: string = AppConstants.ASSETALLOCATION_MODULE.FETCH_URL_STOCK;
  permissions: Permissions = new Permissions();

  constructor(
    private global: GlobalFunctionsService,
    private localStorage: LocalstorageService,
    private router: Router,
    private _location: Location
  ) {
    this.global.checkForUserPermission(this.router.url);
    this.assetAllocation = this.localStorage.getStoredValue('viewData');

    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new AssetStock(true, null, null, null, null, null, null, null, null, this.assetAllocation.id)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
  }

  goBack() {
    this._location.back();
  }
}
