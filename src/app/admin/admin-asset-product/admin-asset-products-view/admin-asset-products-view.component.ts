import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-admin-asset-products-view',
  templateUrl: './admin-asset-products-view.component.html',
  styleUrls: ['./admin-asset-products-view.component.scss'],
})
export class AdminAssetProductsViewComponent implements OnInit, OnDestroy {
  assetProduct: any = null;

  constructor(
    private global: GlobalFunctionsService,
    private localStorage: LocalstorageService,
    private router: Router,
    private _location: Location
  ) {
    this.global.checkForUserPermission(this.router.url);
    this.assetProduct = this.localStorage.getStoredValue('insideViewData');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('insideViewData');
  }

  goBack() {
    this._location.back();
  }
}
