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
  selector: 'app-view-gpo',
  templateUrl: './view-gpo.component.html',
  styleUrls: ['./view-gpo.component.scss'],
})
export class ViewGrievancePoliceOfficialComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  grievancePoliceOfficial: any;

  changeStatusPath: string =
    AppConstants.GrievancePoliceOfficial_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'COMPLAINT_GPO';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.GrievancePoliceOfficial_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'COMPLAINT_GPO';
  forwardDestinationId: number = null;

  smsSendingPath: string =
    AppConstants.GrievancePoliceOfficial_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'COMPLAINT_GPO';
  smsSendingId: number = null;

  grievancePoliceOfficialSMS: string = 'grievancePoliceOfficial';
  // change status dropdown options
  changeStatusForModule: string = 'COMPLAINT_GPO';
  characterModuleStatus: string = null;

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
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.grievancePoliceOfficial = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.grievancePoliceOfficial.id;
    this.forwardDestinationId = this.grievancePoliceOfficial.id;
    this.smsSendingId = this.grievancePoliceOfficial.id;

    this.changeStatusSubmitURL =
      AppConstants.GrievancePoliceOfficial_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.GrievancePoliceOfficial_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.GrievancePoliceOfficial_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    this.smsSendingSubmitURL =
      AppConstants.GrievancePoliceOfficial_MODULE.SMS_SENDING_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.GrievancePoliceOfficial_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.GrievancePoliceOfficial_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.GrievancePoliceOfficial_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.GrievancePoliceOfficial_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievancePoliceOfficial_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievancePoliceOfficial_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievancePoliceOfficial_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievancePoliceOfficial_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievancePoliceOfficial_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.GrievancePoliceOfficial_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievancePoliceOfficial_MODULE.SMS_TO_USER_TABLE
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

  goBack() {
    this._location.back();
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.GrievancePoliceOfficial_MODULE.FETCH_VIEW_DATA,
        { id: this.grievancePoliceOfficial.id },
        true
      )
      .subscribe((data) => {
        this.grievancePoliceOfficial = data.grievancePoliceOfficialDTO;

        this.characterModuleStatus =
          this.grievancePoliceOfficial.complaintStatus;

        this.isComplete =
          AppConstants.GrievancePoliceOfficial_MODULE.COPM_CLOSED !=
          this.grievancePoliceOfficial.complaintStatus
            ? AppConstants.GrievancePoliceOfficial_MODULE.COPM_REJECT !=
              this.grievancePoliceOfficial.complaintStatus
            : false;

        this.isPending =
          this.grievancePoliceOfficial.complaintStatus == AppConstants.PENDING;
      });
  };
}
