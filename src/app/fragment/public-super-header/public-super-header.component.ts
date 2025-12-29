import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DistrictDetail } from 'src/app/models/districtDetails';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { TranslateService } from 'src/app/services/translate.service';
import {
  AppChangeLanguage,
  UpdateDistrictDetails,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-super-header',
  templateUrl: './public-super-header.component.html',
  styleUrls: ['./public-super-header.component.scss'],
})
export class PublicSuperHeaderComponent implements OnInit, OnDestroy {
  subscription: any;
  control: any;

  defaultLang: string;
  otherLang: string;
  language: string;

  districtDetails: DistrictDetail;

  style: string = environment.STYLE;

  constructor(
    private translate: TranslateService,
    private appStore: Store<{ app: any }>,
    private apiCaller: ApiCallerService
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.districtDetails = data.districtDetails;
      this.language = data.defaultLang;
      if (data.defaultLang == 'en') {
        this.otherLang = 'हिंदी';
        translate.disableTranslation();
      } else {
        this.otherLang = 'English';
        translate.onLoad();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchDetails();
  }

  doLangChange = () => {
    if (this.defaultLang == 'en') {
      this.otherLang = 'English';
      this.defaultLang = 'hi';
    } else {
      this.otherLang = 'हिंदी';
      this.defaultLang = 'en';
    }

    this.appStore.dispatch(new AppChangeLanguage(this.defaultLang));

    this.fetchDetails();
  };

  fetchDetails = () => {
    var body = {
      language: this.language,
    };
    this.apiCaller
      .apiPostCall(AppConstants.PUBLIC_APIS.DISTRICTDETAILS, body, false)
      .subscribe((data) => {
        this.appStore.dispatch(
          new UpdateDistrictDetails(data.districtDetailsDTOs)
        );
      });
  };
}
