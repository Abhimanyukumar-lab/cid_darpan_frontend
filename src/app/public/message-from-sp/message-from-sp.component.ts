import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DistrictDetail } from 'src/app/models/districtDetails';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-message-from-sp',
  templateUrl: './message-from-sp.component.html',
  styleUrls: ['./message-from-sp.component.scss'],
})
export class MessageFromSpComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  districtDetails: DistrictDetail;

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
