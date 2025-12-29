import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { AppConstants } from '../storage/localdata/AppConstants';
import { environment } from 'src/environments/environment';
import { select, Store } from '@ngrx/store';
import { GlobalFunctionsService } from '../services/global-functions.service';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss'],
})
export class SummeryComponent implements OnInit {
  mostWanted: any[] = [];
  ourTeam: any[] = [];
  importantAchievement: any[] = [];
  headlines: any[] = [];

  allData: any[] = [];

  baseUrl: string = AppConstants.backServer;

  isOurTeam = environment.OURTEAM;
  isBestOurTeam = environment.BEST_OUR_TEAM;

  currrentLang: string;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  constructor(
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });
  }

  ngOnInit(): void {
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'MOST_WANTED' },
        false
      )
      .subscribe((data) => {
        this.mostWanted = data.pageData;
        this.allData.push(...this.mostWanted);
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'IMPORTANT_ACHIEVEMENT' },
        false
      )
      .subscribe((data) => {
        this.importantAchievement = data.pageData;
        this.allData.push(...this.importantAchievement);
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'BEST_OUR_TEAM' },
        false
      )
      .subscribe((data) => {
        this.ourTeam = data.pageData;
        this.allData.push(...this.ourTeam);
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'PRESS_RELEASE' },
        false
      )
      .subscribe((data) => {
        this.headlines = data.pageData;
      });
  }
}
