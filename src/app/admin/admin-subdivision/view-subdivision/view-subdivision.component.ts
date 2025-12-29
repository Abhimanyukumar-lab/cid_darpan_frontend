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
  selector: 'app-view-subdivision',
  templateUrl: './view-subdivision.component.html',
  styleUrls: ['./view-subdivision.component.scss']
})
export class ViewSubdivisionComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  subdivision: any;
  baseUrl: string = AppConstants.backServer;

  subdivisionUserPath: string =
    AppConstants.SUBDIVISION_MODULE.FETCH_VIEW_SUBDIVISION_USERS;
  subdivisionUserDeleteCode: string;
  subdivisionUserDeleteUrl: string;
  subdivisionUserId: number = null;
  subdivisionUserEditCurrentFormCode: string;
  subdivisionUserForm: UntypedFormGroup;
  subdivisionUserSubmitURL: string;
  subdivisionUserEditURL: string;

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
    this.subdivision = this.localStorage.getStoredValue('viewData');

    if (this.subdivision) this.subdivisionUserId = this.subdivision.id;

    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data && data.user && !this.subdivision) {
          this.subdivisionUserId = data.user.subdivisionId;
        }
      });

    this.fetchData();

    this.subdivisionUserSubmitURL =
      AppConstants.SUBDIVISION_MODULE.SUBDIVISION_USER_SUBMIT;

      this.subdivisionUserEditURL =
        AppConstants.SUBDIVISION_MODULE.SUBDIVISION_USER_EDIT;

    this.subdivisionUserDeleteCode =
      AppConstants.SUBDIVISION_MODULE.DELETE_SUBDIVISION_USER_BUTTON;
    this.subdivisionUserDeleteUrl =
      AppConstants.SUBDIVISION_MODULE.DETELE_SUBDIVISION_USER_URL;

    this.subdivisionUserEditCurrentFormCode =
      AppConstants.SUBDIVISION_MODULE.SUBDIVISION_USER_CURRENT_FORM_EDIT;

    this.permissions.subdivisionUserList = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.SUBDIVISION_USER_TABLE
    );

    this.permissions.subdivisionUser = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.SUBDIVISION_USER_FORM
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.EDIT_BUTTON
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
        AppConstants.SUBDIVISION_MODULE.FETCH_VIEW_DATA,
        { id: this.subdivisionUserId },
        true
      )
      .subscribe((data) => {
        this.subdivision = data.subdivisionDTO;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (subdivisionUserForm: UntypedFormGroup) => {
    this.subdivisionUserForm = subdivisionUserForm;
  };

  editInfo = () => {
    this.localStorage.setStoredValue('editData', this.subdivision);
    this.router.navigate(['/official/subdivision/edit']);
  };
}
