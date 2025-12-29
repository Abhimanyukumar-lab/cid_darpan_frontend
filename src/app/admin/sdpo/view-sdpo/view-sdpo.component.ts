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
  selector: 'app-view-sdpo',
  templateUrl: './view-sdpo.component.html',
  styleUrls: ['./view-sdpo.component.scss']
})
export class ViewSdpoComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  sdpo: any;
  baseUrl: string = AppConstants.backServer;

  sdpoUserPath: string =
    AppConstants.SDPO_MODULE.FETCH_VIEW_SDPO_USERS;
  sdpoUserDeleteCode: string;
  sdpoUserDeleteUrl: string;
  sdpoUserId: number = null;
  sdpoUserEditCurrentFormCode: string;
  sdpoUserForm: UntypedFormGroup;
  sdpoUserSubmitURL: string;
  sdpoUserEditURL: string;

  permissions: Permissions = new Permissions();
  table: boolean = false;
  view: boolean = false;
  language: string;

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

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.global.checkForUserPermission(this.router.url);
    this.sdpo = this.localStorage.getStoredValue('viewData');

    if (this.sdpo) this.sdpoUserId = this.sdpo.id;

    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data && data.user && !this.sdpo) {
          this.sdpoUserId = data.user.sdpoId;
        }
      });

    this.fetchData();

    this.sdpoUserSubmitURL =
      AppConstants.SDPO_MODULE.SDPO_USER_SUBMIT;

      this.sdpoUserEditURL =
        AppConstants.SDPO_MODULE.SDPO_USER_EDIT;

    this.sdpoUserDeleteCode =
      AppConstants.SDPO_MODULE.DELETE_SDPO_USER_BUTTON;
    this.sdpoUserDeleteUrl =
      AppConstants.SDPO_MODULE.DETELE_SDPO_USER_URL;

    this.sdpoUserEditCurrentFormCode =
      AppConstants.SDPO_MODULE.SDPO_USER_CURRENT_FORM_EDIT;

    this.permissions.sdpoUserList = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.SDPO_USER_TABLE
    );

    this.permissions.sdpoUser = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.SDPO_USER_FORM
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.EDIT_BUTTON
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
        AppConstants.SDPO_MODULE.FETCH_VIEW_DATA,
        { id: this.sdpoUserId },
        true
      )
      .subscribe((data) => {
        this.sdpo = data.sdpoDTOs;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (sdpoUserForm: UntypedFormGroup) => {
    this.sdpoUserForm = sdpoUserForm;
  };

  editInfo = () => {
    this.localStorage.setStoredValue('editData', this.sdpo);
    this.router.navigate(['/official/sdpo/edit']);
  };
}
