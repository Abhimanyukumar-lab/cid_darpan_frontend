import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
})
export class PhotoGalleryComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  imageGallery: any[];
  selected: string = 'See All';
  eventList: any[] = [];

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'IMAGE_GALLERY' },
        false
      )
      .subscribe((data) => {
        this.imageGallery = data.pageData;
        this.imageGallery.map((image) => {
          this.eventList.push(image.releasedBy);
        });

        this.eventList = Array.from(new Set(this.eventList));
      });
  }

  ngOnInit(): void {}

  changePhoto = (name: string) => {
    this.selected = name;
  };
}
