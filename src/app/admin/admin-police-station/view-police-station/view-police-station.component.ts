import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshViewDataStop,
  StopEditFormData,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-police-station',
  templateUrl: './view-police-station.component.html',
  styleUrls: ['./view-police-station.component.scss'],
})
export class ViewPoliceStationComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  policeStation: any;
  baseUrl: string = AppConstants.backServer;

  stationUserPath: string =
    AppConstants.POLICE_STATION_MODULE.FETCH_VIEW_STATION_USERS;
  stationUserDeleteCode: string;
  stationUserDeleteUrl: string;
  stationUserId: number = null;
  stationUserEditCurrentFormCode: string;
  stationUserForm: UntypedFormGroup;
  stationUserSubmitURL: string;
  stationUserEditURL: string;

  permissions: Permissions = new Permissions();
  table: boolean = false;
  view: boolean = false;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private authStore: Store<{ auth: User }>
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.policeStation = this.localStorage.getStoredValue('viewData');

    if (this.policeStation) this.stationUserId = this.policeStation.id;

    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data && data.user && !this.policeStation) {
          this.stationUserId = data.user.stationId;
        }
      });

    this.fetchData();

    this.stationUserSubmitURL =
      AppConstants.POLICE_STATION_MODULE.STATION_USER_SUBMIT;

      this.stationUserEditURL =
        AppConstants.POLICE_STATION_MODULE.STATION_USER_EDIT;

    this.stationUserDeleteCode =
      AppConstants.POLICE_STATION_MODULE.DELETE_STATION_USER_BUTTON;
    this.stationUserDeleteUrl =
      AppConstants.POLICE_STATION_MODULE.DETELE_STATION_USER_URL;

    this.stationUserEditCurrentFormCode =
      AppConstants.POLICE_STATION_MODULE.STATION_USER_CURRENT_FORM_EDIT;

    this.permissions.stationUserList = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.STATION_USER_TABLE
    );

    this.permissions.stationUser = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.STATION_USER_FORM
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.EDIT_BUTTON
    );

    appStore.dispatch(new StopEditFormData({}));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isViewDataRefresh) {
        this.appStore.dispatch(new RefreshViewDataStop({}));
        this.fetchData();
      }

      this.table = data.isTableRefresh;
      this.view = data.isViewDataRefresh;
    });
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.POLICE_STATION_MODULE.FETCH_VIEW_DATA,
        { id: this.stationUserId },
        true
      )
      .subscribe((data) => {
        this.policeStation = data.stationDTO;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (stationUserForm: UntypedFormGroup) => {
    this.stationUserForm = stationUserForm;
  };

  editInfo = () => {
    this.localStorage.setStoredValue('editData', this.policeStation);
    this.router.navigate(['/official/policeStation/edit']);
  };
}
