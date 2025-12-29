import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetType } from 'src/app/models/AssetType';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { AssetSupplier } from 'src/app/models/AssetSupplier';
import { SupplierProducts } from 'src/app/models/SupplierProducts';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-admin-asset-product',
  templateUrl: './admin-asset-product.component.html',
  styleUrls: ['./admin-asset-product.component.scss'],
})
export class AdminAssetProductComponent implements OnInit {
  @Input('id')
  id: number = null;

  page: any;
  rows = new Array<SupplierProducts>();

  columns = [
    { name: 'Id', props: 'id', size: 1, colName: 'Id', sort: true },
    {
      name: 'supplierName',
      props: 'supplierName',
      size: 2,
      colName: 'ASSET_SUPPLIER.SUPP_NAME',
      colPlaceHolder: 'ASSET_SUPPLIER.SUPP_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'assetTypeName',
      props: 'assetTypeName',
      size: 2,
      colName: 'ASSET_TYPES.ASSET_TYPES_TITLE',
      colPlaceHolder: 'ASSET_PRODUCT.SEL_ASSET_TYPE',
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
      colPlaceHolder: 'ASSET_PRODUCT.PROD_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'productPrice',
      props: 'productPrice',
      size: 2,
      colName: 'ASSET_PRODUCT.PROD_PRICE',
      colPlaceHolder: 'ASSET_PRODUCT.ENTR_PROD_PRICE',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'productQuantity',
      props: 'productQuantity',
      size: 2,
      colName: 'ASSET_PRODUCT.PROD_QUANTITY',
      colPlaceHolder: 'ASSET_PRODUCT.ENTR_PROD_QUANTITY',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'totalPrice',
      props: 'totalPrice',
      size: 2,
      colName: 'ASSET_PRODUCT.PROD_TOTAL_PRICE',
      colPlaceHolder: 'ASSET_PRODUCT.PROD_TOTAL_PRICE',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'purchaseDate',
      props: 'purchaseDate',
      size: 2,
      colName: 'ASSET_PRODUCT.PROD_PURCHASE_DATE',
      colPlaceHolder: 'ASSET_PRODUCT.PROD_PURCHASE_DATE',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'amcEndDate',
      props: 'amcEndDate',
      size: 2,
      colName: 'ASSET_PRODUCT.AMC_END',
      colPlaceHolder: 'ASSET_PRODUCT.AMC_END',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'invoice',
      props: 'invoice',
      size: 2,
      colName: 'CITIZEN_REPORT.INVOICE',
      colPlaceHolder: 'CITIZEN_REPORT.INVOICE',
      type: 'MEDIA',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
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
      colName: 'ASSET_PRODUCT.ENTR_PROD_NAME',
      colPlaceHolder: 'ASSET_PRODUCT.ENTR_PROD_NAME',
      data: 'productName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'ASSET_PRODUCT.PROD_PRICE',
      colPlaceHolder: 'ASSET_PRODUCT.ENTR_PROD_PRICE',
      data: 'productPrice',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'ASSET_PRODUCT.PROD_QUANTITY',
      colPlaceHolder: 'ASSET_PRODUCT.ENTR_PROD_QUANTITY',
      data: 'productQuantity',
      translate: true,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.ASSETPRODUCT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(
    private global: GlobalFunctionsService,
    private localStorage: LocalstorageService,
    private router: Router
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.inside_view = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.VIEW_BUTTON
    );
    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.EDIT_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.inside_view_url =
      AppConstants.ASSETPRODUCT_MODULE.VIEW_URL;
    this.permissions.add_url = AppConstants.ASSETPRODUCT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.ASSETPRODUCT_MODULE.EDIT_URL;
    this.permissions.delete_url =
      AppConstants.ASSETPRODUCT_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.ASSETSUPPLIERS_MODULE.ACTIVATE_URL;
  }

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new SupplierProducts(
        true,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        this.id,
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
}
