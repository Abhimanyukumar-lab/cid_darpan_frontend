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
  selector: 'app-view-gfpo',
  templateUrl: './view-gfpo.component.html',
  styleUrls: ['./view-gfpo.component.scss'],
})
export class ViewGrievanceFemalePoliceOfficialComponent
  implements OnInit, OnDestroy
{
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  grievanceFemalePoliceOfficial: any;

  changeStatusPath: string =
    AppConstants.GrievanceFemalePoliceOfficial_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'COMPLAINT_GFPO';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.GrievanceFemalePoliceOfficial_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'COMPLAINT_GFPO';
  forwardDestinationId: number = null;

  smsSendingPath: string =
    AppConstants.GrievanceFemalePoliceOfficial_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'COMPLAINT_GFPO';
  smsSendingId: number = null;

  grievanceFemalePoliceOfficialSMS: string = 'grievanceFemalePoliceOfficial';
  // change status dropdown options
  changeStatusForModule: string = 'COMPLAINT_GFPO';
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
    this.grievanceFemalePoliceOfficial =
      this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.grievanceFemalePoliceOfficial.id;
    this.forwardDestinationId = this.grievanceFemalePoliceOfficial.id;
    this.smsSendingId = this.grievanceFemalePoliceOfficial.id;

    this.changeStatusSubmitURL =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    this.smsSendingSubmitURL =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.SMS_SENDING_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE
          .FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE
          .FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.SMS_TO_USER_TABLE
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
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.FETCH_VIEW_DATA,
        { id: this.grievanceFemalePoliceOfficial.id },
        true
      )
      .subscribe((data) => {
        this.grievanceFemalePoliceOfficial =
          data.grievanceFemalePoliceOfficialDTO;

        this.characterModuleStatus =
          this.grievanceFemalePoliceOfficial.complaintStatus;

        this.isComplete =
          AppConstants.GrievanceFemalePoliceOfficial_MODULE.COPM_CLOSED !=
          this.grievanceFemalePoliceOfficial.complaintStatus
            ? AppConstants.GrievanceFemalePoliceOfficial_MODULE.COPM_REJECT !=
              this.grievanceFemalePoliceOfficial.complaintStatus
            : false;

        this.isPending =
          this.grievanceFemalePoliceOfficial.complaintStatus ==
          AppConstants.PENDING;
      });
  };
}
