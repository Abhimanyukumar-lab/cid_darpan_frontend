import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  transfer: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'TRANSFER' },
        false
      )
      .subscribe((data) => {
        this.transfer = data.pageData;
      });
  }

  ngOnInit(): void {}
}
