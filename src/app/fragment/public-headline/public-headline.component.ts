import { Component, Input, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-headline',
  templateUrl: './public-headline.component.html',
  styleUrls: ['./public-headline.component.scss'],
})
export class PublicHeadlineComponent implements OnInit {
  @Input()
  title: string;

  baseUrl: string = AppConstants.backServer;
  headlines: any;

  style = environment.STYLE;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;

    // this.apiCaller
    //   .apiPostCall(AppConstants.PUBLIC_APIS.HEADLINESFETCH, {}, false)
    //   .subscribe((data) => {
    //     this.headlines = data.headlinesDTOs;
    //   });

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

  ngOnInit(): void {}
}
