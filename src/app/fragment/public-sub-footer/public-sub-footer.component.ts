import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DistrictDetail } from 'src/app/models/districtDetails';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-sub-footer',
  templateUrl: './public-sub-footer.component.html',
  styleUrls: ['./public-sub-footer.component.scss'],
})
export class PublicSubFooterComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  districtDetails: DistrictDetail;

  allowDownload = environment.ALLOW_DOWNLOAD;

  constructor(
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.districtDetails = data.districtDetails;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
