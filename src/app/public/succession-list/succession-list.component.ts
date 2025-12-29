import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-succession-list',
  templateUrl: './succession-list.component.html',
  styleUrls: ['./succession-list.component.scss'],
})
export class SuccessionListComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  successionList: any = [];

  currrentLang: string;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;

    this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'SUCCESSION_LIST' },
        false
      )

      .subscribe((data) => {
        this.successionList = data.pageData;
      });
  }

  ngOnInit(): void {}
}
