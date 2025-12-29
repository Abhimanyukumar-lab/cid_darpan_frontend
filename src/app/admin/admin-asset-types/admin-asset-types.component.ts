import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetType } from 'src/app/models/AssetType';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { AssetSupplier } from 'src/app/models/AssetSupplier';
import { SupplierProducts } from 'src/app/models/SupplierProducts';

@Component({
  selector: 'app-admin-asset-types',
  templateUrl: './admin-asset-types.component.html',
  styleUrls: ['./admin-asset-types.component.scss'],
})
export class AdminAssetTypesComponent implements OnInit {
  typepage = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new AssetType(true, null, null, null)
  );
  typerows = new Array<AssetType>();

  typecolumns = [
    { name: 'Id', props: 'id', size: 1, colName: 'Id', sort: true },
    {
      name: 'AssetsName',
      props: 'assetsName',
      size: 2,
      colName: 'ASSET_TYPES.ASSET_TYPE_NAME',
      colPlaceHolder: 'ASSET_TYPES.ENTR_ASSET_TYPE_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'assetsNameHi',
    //   props: 'assetsNameHi',
    //   size: 2,
    //   colName: 'ASSET_TYPES.ASSET_TYPE_NAME',
    //   colPlaceHolder: 'ASSET_TYPES.ENTR_ASSET_TYPE_NAME',
    //   isTranslate: true,
    //   sort: true,
    //   filter: true,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'categoryName',
    //   props: 'categoryName',
    //   size: 2,
    //   colName: 'ASSET_TYPES.ASSETY_TYPE_CAT',
    //   colPlaceHolder: 'ASSET_TYPES.ENTR_ASSETY_TYPE_CAT',
    //   isTranslate: true,
    //   sort: true,
    //   filter: true,
    //   isNeedToTranslate: false,
    // },
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
      colName: 'ASSET_TYPES.ASSET_TYPE_NAME',
      colPlaceHolder: 'ASSET_TYPES.ENTR_ASSET_TYPE_NAME',
      data: 'assetsName',
      translate: true,
      type: 'INPUT',
    },
  ];

  typepath: string = AppConstants.ASSETTYPE_MODULE.FETCH_URL;
  typepermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.typepermissions.view = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.VIEW_BUTTON
    );
    this.typepermissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.ADD_BUTTON
    );
    this.typepermissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.EDIT_BUTTON
    );
    this.typepermissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.DEACTIVATE_BUTTON
    );
    this.typepermissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.ACTIVATE_BUTTON
    );

    this.typepermissions.view_url = AppConstants.ASSETTYPE_MODULE.VIEW_URL;
    this.typepermissions.add_url = AppConstants.ASSETTYPE_MODULE.ADD_URL;
    this.typepermissions.edit_url = AppConstants.ASSETTYPE_MODULE.EDIT_URL;
    this.typepermissions.delete_url =
      AppConstants.ASSETTYPE_MODULE.DEACTIVATE_URL;
    this.typepermissions.activate_url =
      AppConstants.ASSETTYPE_MODULE.ACTIVATE_URL;

  }

  ngOnInit(): void {}
}
