import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-press-release',
  templateUrl: './press-release.component.html',
  styleUrls: ['./press-release.component.scss'],
})
export class PressReleaseComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  pressRelease: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    private route: Router
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'PRESS_RELEASE' },
        false
      )
      .subscribe((data) => {
        this.pressRelease = data.pageData;
      });
  }

  ngOnInit(): void {}

  goToDetails = (pressRelease: any) => {
    localStorage.setItem('pressRelease', JSON.stringify(pressRelease));
    this.route.navigate(['/pressReleaseDetails']);
  };
}
