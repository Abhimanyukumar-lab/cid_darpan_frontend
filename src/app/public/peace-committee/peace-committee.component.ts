import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-peace-committee',
  templateUrl: './peace-committee.component.html',
  styleUrls: ['./peace-committee.component.scss'],
})
export class PeaceCommitteeComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  peaceCommity: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'PEACE_COMMITY' },
        false
      )
      .subscribe((data) => {
        this.peaceCommity = data.pageData;
      });
  }

  ngOnInit(): void {}
}
