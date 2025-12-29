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
  selector: 'app-view-dsp',
  templateUrl: './view-dsp.component.html',
  styleUrls: ['./view-dsp.component.scss']
})
export class ViewDspComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  dsp: any;
  baseUrl: string = AppConstants.backServer;

  dspUserPath: string =
    AppConstants.DSP_MODULE.FETCH_VIEW_DSP_USERS;
  dspUserDeleteCode: string;
  dspUserDeleteUrl: string;
  dspUserId: number = null;
  dspUserEditCurrentFormCode: string;
  dspUserForm: UntypedFormGroup;
  dspUserSubmitURL: string;
  dspUserEditURL: string;

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
    this.dsp = this.localStorage.getStoredValue('viewData');

    if (this.dsp) this.dspUserId = this.dsp.id;
    
    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data && data.user && !this.dsp) {
          this.dspUserId = data.user.dspId;
          
        }
      });

    this.fetchData();

    this.dspUserSubmitURL =
      AppConstants.DSP_MODULE.DSP_USER_SUBMIT;

      this.dspUserEditURL =
        AppConstants.DSP_MODULE.DSP_USER_EDIT;

    this.dspUserDeleteCode =
      AppConstants.DSP_MODULE.DELETE_DSP_USER_BUTTON;
    this.dspUserDeleteUrl =
      AppConstants.DSP_MODULE.DETELE_DSP_USER_URL;

    this.dspUserEditCurrentFormCode =
      AppConstants.DSP_MODULE.DSP_USER_CURRENT_FORM_EDIT;

    this.permissions.dspUserList = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.DSP_USER_TABLE
    );

    this.permissions.dspUser = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.DSP_USER_FORM
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.EDIT_BUTTON
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
        AppConstants.DSP_MODULE.FETCH_VIEW_DATA,
        { id: this.dspUserId },
        true
      )
      .subscribe((data) => {
        this.dsp = data.dspDTO;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (dspUserForm: UntypedFormGroup) => {
    this.dspUserForm = dspUserForm;
  };

  
  editInfo = () => {
    this.localStorage.setStoredValue('editData', this.dsp);
    this.router.navigate(['/official/aboutDSP/edit']);
  };

}
