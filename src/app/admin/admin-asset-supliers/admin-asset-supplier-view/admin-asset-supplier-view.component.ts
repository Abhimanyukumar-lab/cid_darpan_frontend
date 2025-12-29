import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-asset-supplier-view',
  templateUrl: './admin-asset-supplier-view.component.html',
  styleUrls: ['./admin-asset-supplier-view.component.scss'],
})
export class AdminAssetSupplierViewComponent implements OnInit, OnDestroy {
  subscription: any;

  assetSupplier: any;
  baseUrl: string = AppConstants.backServer;

  supplierProductsPath: string =
    AppConstants.ASSETSUPPLIERS_MODULE.FETCH_VIEW_PRODUCTS;
  supplierProductsDeactivate: string;
  supplierProductsDeactivateUrl: string;
  supplierProductsActivate: string;
  supplierProductsActivateUrl: string;
  supplierProductsEdit: string;
  supplierProductsEditUrl: string;
  supplierProductsId: number = null;

  permissions: Permissions = new Permissions();

  table: boolean = false;

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
    this.assetSupplier = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.supplierProductsId = this.assetSupplier.id;

    this.supplierProductsDeactivate =
      AppConstants.ASSETPRODUCT_MODULE.DEACTIVATE_BUTTON;
    this.supplierProductsDeactivateUrl =
      AppConstants.ASSETPRODUCT_MODULE.DEACTIVATE_URL;

    this.supplierProductsActivate =
      AppConstants.ASSETPRODUCT_MODULE.ACTIVATE_BUTTON;
    this.supplierProductsActivateUrl =
      AppConstants.ASSETPRODUCT_MODULE.ACTIVATE_URL;

    this.supplierProductsEdit = AppConstants.ASSETPRODUCT_MODULE.EDIT_BUTTON;
    this.supplierProductsEditUrl = AppConstants.ASSETPRODUCT_MODULE.EDIT_URL;

    this.permissions.supplierProductsList = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.PRODUCTS_TABLE
    );

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.ADD_BUTTON
    );

    this.permissions.add_url = AppConstants.ASSETPRODUCT_MODULE.ADD_URL;
  }
  ngOnDestroy(): void {
    // this.localStorage.destroyStoredValue('viewData');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.table = data.isTableRefresh;
    });
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.ASSETSUPPLIERS_MODULE.FETCH_VIEW_DATA,
        { id: this.assetSupplier.id },
        true
      )
      .subscribe((data) => {
        this.assetSupplier = data.assetSupplierDTO;
      });
  };

  goBack() {
    this._location.back();
  }
}
