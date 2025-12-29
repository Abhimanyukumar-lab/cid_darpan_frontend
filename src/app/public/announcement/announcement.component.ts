import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  announcement: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'ANNOUNCEMENT' },
        false
      )
      .subscribe((data) => {
        this.announcement = data.pageData;
      });
  }

  ngOnInit(): void {}
}
