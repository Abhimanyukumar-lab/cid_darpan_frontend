import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Location } from '@angular/common';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-police-station-details',
  templateUrl: './police-station-details.component.html',
  styleUrls: ['./police-station-details.component.scss'],
})
export class PoliceStationDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  id: number;
  policeStation: any = {};

  shoList: any;
  InvestigationOfficer: any;
  LawOrderOfficer: any;

  officerUsers: any[] = [];
  staffUsers: any[] = [];
  chakidarUsers: any[] = [];
  otherUsers: any[] = [];

  stationUsers: any[];

  allStationUsers: any;
  currrentLang: string;

  isCollapsed = false;
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiCaller: ApiCallerService,
    private localStorage: LocalstorageService,
    private _location: Location,
    private global: GlobalFunctionsService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.id = this.localStorage.getStoredValue('stationId');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPOLICEDETAILS,
        { id: this.id },
        false
      )
      .subscribe((data) => {
        this.policeStation = data.station;
        this.shoList = data.station.stationUserDTO[0];
        this.InvestigationOfficer = data.station.stationUserDTO[1];
        this.LawOrderOfficer = data.station.stationUserDTO[2];
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.FETCHALLSTATIONUSERS,
        { id: this.id },
        false
      )
      .subscribe((data) => {
        this.stationUsers = data.stationUserDTOs;

        this.stationUsers.forEach((user) => {
          if (user.type == 'IO and Law and order') {
            this.officerUsers.push(user);
          } else if (user.type == 'police Staff Details') {
            this.staffUsers.push(user);
          } else if (user.type == 'Chaukidar Dafadar Details') {
            this.chakidarUsers.push(user);
          } else if (user.type == 'Other Details') {
            this.otherUsers.push(user);
           
          }
        });
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
  };
  toggle1 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = !this.isCollapsed1;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
  };
  toggle2 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = !this.isCollapsed2;
    this.isCollapsed3 = false;
  };
  toggle3 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = !this.isCollapsed3;
  };
}
