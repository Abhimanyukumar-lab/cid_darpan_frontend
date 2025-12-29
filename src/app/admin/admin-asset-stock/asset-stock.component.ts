import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetStock } from 'src/app/models/AssetStock';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-asset-stock',
  templateUrl: './asset-stock.component.html',
  styleUrls: ['./asset-stock.component.scss'],
})
export class AssetStockComponent implements OnInit {

  permissions: Permissions = new Permissions();
  
  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);
     
    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.ADD_BUTTON
    );
    this.permissions.add_url = AppConstants.ASSETALLOCATION_MODULE.ADD_URL;
  }
  ngOnInit(): void {}
}
