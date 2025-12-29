import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DistrictDetail } from 'src/app/models/districtDetails';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  districtDetails: DistrictDetail;
  name: string;

  constructor(
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService,
    private translateService: TranslateService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.districtDetails = data.districtDetails;

      this.translateService
        .get('HOME.DISTRICT_POLICE')
        .subscribe((text: string) => {
          this.name = text;
        });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
