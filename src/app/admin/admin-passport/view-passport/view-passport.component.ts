import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RefreshViewDataStop } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-passport',
  templateUrl: './view-passport.component.html',
  styleUrls: ['./view-passport.component.scss'],
})
export class ViewPassportComponent implements OnInit, OnDestroy {
  subscription: any;
  passport: any;

  changeStatusPath: string = AppConstants.PASSPORT_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'PASSPORT';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.PASSPORT_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'PASSPORT';
  forwardDestinationId: number = null;

  smsSendingPath: string = AppConstants.PASSPORT_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'PASSPORT';
  smsSendingId: number = null;

  passportSMS: string = 'passport';
  // change status dropdown options
  changeStatusForModule: string = 'PASSPORT';
  passportModuleStatus: string = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;
  smsSendingSubmitURL: string;

  isComplete: boolean = false;
  isPending: boolean = false;
  permissions: Permissions = new Permissions();

  view: boolean = false;
  table: boolean = false;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>
  ) {
    this.global.checkForUserPermission(this.router.url);
    this.passport = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.passport.id;
    this.forwardDestinationId = this.passport.id;
    this.smsSendingId = this.passport.id;

    this.changeStatusSubmitURL =
      AppConstants.PASSPORT_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.PASSPORT_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.PASSPORT_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    this.smsSendingSubmitURL = AppConstants.PASSPORT_MODULE.SMS_SENDING_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.PASSPORT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.PASSPORT_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.PASSPORT_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.PASSPORT_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.PASSPORT_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.PASSPORT_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.PASSPORT_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.PASSPORT_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.PASSPORT_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.PASSPORT_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.PASSPORT_MODULE.SMS_TO_USER_TABLE
      );
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
    this.subscription.unsubscribe();
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
        AppConstants.PASSPORT_MODULE.FETCH_VIEW_DATA,
        { id: this.passport.id },
        true
      )
      .subscribe((data) => {
        this.passport = data.passportDTO;

        this.passportModuleStatus = this.passport.status;

        this.isComplete =
          AppConstants.PASSPORT_MODULE.COPM_CLOSED != this.passport.status
            ? AppConstants.PASSPORT_MODULE.COPM_REJECT != this.passport.status
            : false;

        this.isPending = this.passport.status == AppConstants.PENDING;
      });
  };

  goBack() {
    this._location.back();
  }
}
