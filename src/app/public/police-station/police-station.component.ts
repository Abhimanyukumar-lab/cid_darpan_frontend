import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-police-station',
  templateUrl: './police-station.component.html',
  styleUrls: ['./police-station.component.scss'],
})
export class PoliceStationComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  sdpo: any;
  dsp: any;
  circleInspector: any;
  policeStation: any;
  subdivisions: any;

  subDiv: string = null;
  currrentLang: string;

  circleInspectorTemp: any;
  policeStationTemp: any;
  subdivisionTemp: any;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiCaller: ApiCallerService,
    private localStorage: LocalstorageService,
    private router: Router,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSDPO, false)
      .subscribe((data) => {
        this.sdpo = data.sdpoDTO;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHDSP, false)
      .subscribe((data) => {
        this.dsp = data.dspDTOs;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHCIRCLEINSPECTOR, false)
      .subscribe((data) => {
        this.circleInspector = data.circleInspectorDTO;
        this.circleInspectorTemp = data.circleInspectorDTO;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, false)
      .subscribe((data) => {
        this.policeStation = data.stationDtos;
        this.policeStationTemp = data.stationDtos;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSUBDIVISION, false)
      .subscribe((data) => {
        this.subdivisions = data.subdivisionDTOs;
        this.subdivisionTemp = data.subdivisionDTOs;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  goToPage = (id: number) => {
    this.localStorage.setStoredValue('stationId', id);
    this.router.navigate(['policeStationDetails']);
  };

  filterData = () => {
    this.circleInspector = [];
    this.policeStation = [];
    this.subdivisions = [];

    if (this.subDiv.length > 0) {
      this.circleInspectorTemp.forEach((ci) => {
        if (ci.subdivisionId == this.subDiv) {
          this.circleInspector.push(ci);
        }
      });

      this.policeStationTemp.forEach((ps) => {
        this.circleInspector.forEach((ci) => {
          if (ci.id == ps.circleId) {
            this.policeStation.push(ps);
          }
        });
      });

      this.subdivisionTemp.forEach((sub) => {
        if (sub.id == this.subDiv) {
          this.subdivisions.push(sub);
        }
      });
    } else {
      this.circleInspector = this.circleInspectorTemp;
      this.policeStation = this.policeStationTemp;
      this.subdivisions = this.subdivisionTemp;
    }
  };
}
