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
  selector: 'app-view-circle-inspector',
  templateUrl: './view-circle-inspector.component.html',
  styleUrls: ['./view-circle-inspector.component.scss']
})
export class ViewCircleInspectorComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  circle: any;
  baseUrl: string = AppConstants.backServer;

  circleUserPath: string =
    AppConstants.CIRCLE_INSPECTOR_MODULE.FETCH_VIEW_CIRCLE_USERS;
  circleUserDeleteCode: string;
  circleUserDeleteUrl: string;
  circleUserId: number = null;
  circleUserEditCurrentFormCode: string;
  circleUserForm: UntypedFormGroup;
  circleUserSubmitURL: string;
  circleUserEditURL: string;

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
    this.circle = this.localStorage.getStoredValue('viewData');

    if (this.circle) this.circleUserId = this.circle.id;

    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data && data.user && !this.circle) {
          this.circleUserId = data.user.circleInspectorId;
        }
      });

    this.fetchData();

    this.circleUserSubmitURL =
      AppConstants.CIRCLE_INSPECTOR_MODULE.CIRCLE_USER_SUBMIT;

      this.circleUserEditURL =
        AppConstants.CIRCLE_INSPECTOR_MODULE.CIRCLE_USER_EDIT;

    this.circleUserDeleteCode =
      AppConstants.CIRCLE_INSPECTOR_MODULE.DELETE_CIRCLE_USER_BUTTON;
    this.circleUserDeleteUrl =
      AppConstants.CIRCLE_INSPECTOR_MODULE.DETELE_CIRCLE_USER_URL;

    this.circleUserEditCurrentFormCode =
      AppConstants.CIRCLE_INSPECTOR_MODULE.CIRCLE_USER_CURRENT_FORM_EDIT;

    this.permissions.circleUserList = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.CIRCLE_USER_TABLE
    );

    this.permissions.circleUser = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.CIRCLE_USER_FORM
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.EDIT_BUTTON
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
        AppConstants.CIRCLE_INSPECTOR_MODULE.FETCH_VIEW_DATA,
        { id: this.circleUserId },
        true
      )
      .subscribe((data) => {
        this.circle = data.circleDTO;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (circleUserForm: UntypedFormGroup) => {
    this.circleUserForm = circleUserForm;
  };

  editInfo = () => {
    this.localStorage.setStoredValue('editData', this.circle);
    this.router.navigate(['/official/circleInspector/edit']);
  };
}
