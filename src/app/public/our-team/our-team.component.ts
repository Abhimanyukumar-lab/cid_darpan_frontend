import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss'],
})
export class OurTeamComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  our_team: any;
  language: string;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    public langModule: LangModule
  ) {
    this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'OUR_TEAM' },
        false
      )
      .subscribe((data) => {
        this.our_team = data.pageData;
      });
  }

  ngOnInit(): void {}
}
