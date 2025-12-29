import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-important-places',
  templateUrl: './important-places.component.html',
  styleUrls: ['./important-places.component.scss'],
})
export class ImportantPlacesComponent implements OnInit {
  importantPlaces: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService
  ) {
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.GETIMPORTANTPLACES, false)
      .subscribe((data) => {
        this.importantPlaces = data.importantPlacesDTOs;
      });
  }

  ngOnInit(): void {}

  readMore = (places: any) => {
    places.readMore = true;
  };

  readLess = (places: any) => {
    places.readMore = false;
  };
}
