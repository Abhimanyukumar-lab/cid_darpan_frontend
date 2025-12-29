import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { AssetDetails } from 'src/app/models/AssetDetails';

@Component({
  selector: 'app-admin-asset-details',
  templateUrl: './admin-asset-details.component.html',
  styleUrls: ['./admin-asset-details.component.scss'],
})
export class AdminAssetDetailsComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new AssetDetails(
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
      null
    )
  );
  rows = new Array<AssetDetails>();

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
      name: 'allocatedDate',
      props: 'allocatedDate',
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
      name: 'allocatedToName',
      props: 'allocatedToName',
      size: 2,
      colName: 'ASSET_DETAILS.ALLOCATE_TO',
      colPlaceHolder: 'ASSET_DETAILS.ALLOCATE_TO',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'productName',
      props: 'productName',
      size: 2,
      colName: 'ASSET_PRODUCT.PROD_NAME',
      colPlaceHolder: 'ASSET_PRODUCT.ENTR_PROD_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'quantityAllocated',
      props: 'quantityAllocated',
      size: 2,
      colName: 'Quantity Allocated',
      colPlaceHolder: 'Enter Quantity Allocated',
      isTranslate: false,
      sort: false,
      filter: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'startAssetId',
    //   props: 'startAssetId',
    //   size: 2,
    //   colName: 'Start Asset Id',
    //   colPlaceHolder: 'Enter Asset ID',
    //   isTranslate: false,
    //   sort: true,
    //   filter: true,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'endAssetId',
    //   props: 'endAssetId',
    //   size: 2,
    //   colName: 'End Asset Id',
    //   colPlaceHolder: 'Enter Asset ID',
    //   isTranslate: false,
    //   sort: true,
    //   filter: true,
    //   isNeedToTranslate: false,
    // },
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
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
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
    // {
    //   colName: 'Officer Name',
    //   colPlaceHolder: 'Enter Officer Name',
    //   data: 'allocatedToId',
    //   translate: false,
    //   type: 'STATION',
    // },
    {
      colName: 'ASSET_DETAILS.QUANTITY',
      colPlaceHolder: 'ASSET_DETAILS.ENTR_QUANTITY',
      data: 'quantityAllocated',
      translate: true,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.ASSETALLOCATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    //Allocation Permissions

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.EDIT_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.DEACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.ASSETALLOCATION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.ASSETALLOCATION_MODULE.EDIT_URL;
    this.permissions.delete_url =
      AppConstants.ASSETALLOCATION_MODULE.DEACTIVATE_URL;

    this.permissions.fetch = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.STOCK_MAIN_PAGE
    );

    this.permissions.fetch_url =
      AppConstants.ASSETALLOCATION_MODULE.STOCK_MAIN_URL;

      this.permissions.view = this.global.checkForUserButtonPermission(
        AppConstants.ASSETALLOCATION_MODULE.VIEW
      );
      this.permissions.view_url = AppConstants.ASSETALLOCATION_MODULE.VIEW_URL;
  }
  ngOnInit(): void {}
}
