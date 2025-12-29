import { Component, Input, OnInit } from '@angular/core';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  @Input('imageURL')
  imageURL: string;

  @Input('imgHeight')
  imgHeight: string = '40px';

  @Input('imgHeight')
  imgWidth: string = '40px';

  baseURL: string;

  constructor(private globalService: GlobalFunctionsService) {
    this.baseURL =
      this.globalService.getSiteBackUrl() || AppConstants.backServer;
  }

  ngOnInit(): void {}
}
