import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-video-garrely',
  templateUrl: './video-garrely.component.html',
  styleUrls: ['./video-garrely.component.scss'],
})
export class VideoGarrelyComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  videoGallery: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'VIDEO_GALLERY' },
        false
      )
      .subscribe((data) => {
        this.videoGallery = data.pageData;
      });
  }

  ngOnInit(): void {}
}
