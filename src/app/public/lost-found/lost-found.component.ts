import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-lost-found',
  templateUrl: './lost-found.component.html',
  styleUrls: ['./lost-found.component.scss'],
})
export class LostFoundComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  citizenReports: any;

  type: string = null;
  reportFor: string = null;

  count: number = 0;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.CITIZENREPORTFETCH, false)
      .subscribe((data) => {
        this.citizenReports = data.citizenReportDTOs;
        this.count = this.citizenReports.length;
      });
  }

  ngOnInit(): void {}

  statusPopup = () => {};

  printData = () => {
    this.type == 'null' ? (this.type = null) : (this.type = this.type);

    this.reportFor == 'null'
      ? (this.reportFor = null)
      : (this.reportFor = this.reportFor);
  };
}
