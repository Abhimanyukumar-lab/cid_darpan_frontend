import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  rules: any[] = [];

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'RULES' },
        false
      )
      .subscribe((data) => {
        this.rules = data.pageData;
      });
  }

  ngOnInit(): void {}
}
