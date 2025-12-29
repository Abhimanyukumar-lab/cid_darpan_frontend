import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { AssetSupplier } from 'src/app/models/AssetSupplier';

@Component({
  selector: 'app-admin-asset-supliers',
  templateUrl: './admin-asset-supliers.component.html',
  styleUrls: ['./admin-asset-supliers.component.scss'],
})
export class AdminAssetSupliersComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new AssetSupplier(
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
      null,
      null
    )
  );
  rows = new Array<AssetSupplier>();

  columns = [
    { name: 'Id', props: 'id', size: 1, colName: 'Id', sort: true },
    {
      name: 'supplierName',
      props: 'supplierName',
      size: 2,
      colName: 'ASSET_SUPPLIER.SUPP_NAME',
      colPlaceHolder: 'ASSET_SUPPLIER.ENTR_SUPP_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'supplierAddress',
      props: 'supplierAddress',
      size: 2,
      colName: 'CONTACT.ADDRESS',
      colPlaceHolder: 'CONTACT.ADDRESS',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'supplierMobileNo',
      props: 'supplierMobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NO',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      isTranslate: false,
      sort: false,
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
      colName: 'ASSET_SUPPLIER.SUPP_NAME',
      colPlaceHolder: 'ASSET_SUPPLIER.ENTR_SUPP_NAME',
      data: 'supplierName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CONTACT.MOBILE_NO',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      data: 'supplierMobileNo',
      translate: true,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.ASSETSUPPLIERS_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.ASSETSUPPLIERS_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.ASSETSUPPLIERS_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.ASSETSUPPLIERS_MODULE.VIEW_URL;
    this.permissions.delete_url =
      AppConstants.ASSETSUPPLIERS_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.ASSETSUPPLIERS_MODULE.ACTIVATE_URL;

  }
  ngOnInit(): void {}
}
