import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-view-admin-asset-types',
  templateUrl: './view-admin-asset-types.component.html',
  styleUrls: ['./view-admin-asset-types.component.scss'],
})
export class ViewAdminAssetTypesComponent implements OnInit, OnDestroy {
  assetType: any = null;

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private localStorage: LocalstorageService,
    private _location: Location
  ) {
    this.global.checkForUserPermission(this.router.url);
    this.assetType = this.localStorage.getStoredValue('viewData');
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }
}
