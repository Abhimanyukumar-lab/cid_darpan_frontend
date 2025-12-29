import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModelService } from 'src/app/common/popup/model.service';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshTableAndForm,
  RefreshViewDataStop,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-citizen-report',
  templateUrl: './view-citizen-report.component.html',
  styleUrls: ['./view-citizen-report.component.scss'],
})
export class ViewCitizenReportComponent implements OnInit, OnDestroy {
  subscription: any;

  baseUrl: string = AppConstants.backServer;
  citizenReport: any;

  changeStatusPath: string = AppConstants.CITIZEN_REPORT_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'CITIZENREPORT';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.CITIZEN_REPORT_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'CITIZENREPORT';
  forwardDestinationId: number = null;

  smsSendingPath: string = AppConstants.CITIZEN_REPORT_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'CITIZENREPORT';
  smsSendingId: number = null;

  citizenReportSMS: string = 'citizenreport';

  // change status dropdown options
  changeStatusForModule: string = 'CITIZENREPORT';
  moduleStatus: string = null;

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
    private appStore: Store<{ app: any }>,
    private modelService: ModelService
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);

    this.citizenReport = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.citizenReport.id;
    this.forwardDestinationId = this.citizenReport.id;
    this.smsSendingId = this.citizenReport.id;

    this.changeStatusSubmitURL =
      AppConstants.CITIZEN_REPORT_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.CITIZEN_REPORT_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.CITIZEN_REPORT_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    this.smsSendingSubmitURL =
      AppConstants.CITIZEN_REPORT_MODULE.SMS_SENDING_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.CITIZEN_REPORT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.CITIZEN_REPORT_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.CITIZEN_REPORT_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.CITIZEN_REPORT_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.CITIZEN_REPORT_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.CITIZEN_REPORT_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.CITIZEN_REPORT_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.CITIZEN_REPORT_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.CITIZEN_REPORT_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.CITIZEN_REPORT_MODULE.SMS_TO_USER_TABLE
      );

    this.permissions.activeInactive = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.ACTIVE_BUTTON
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
        AppConstants.CITIZEN_REPORT_MODULE.FETCH_VIEW_DATA,
        { id: this.citizenReport.id },
        true
      )
      .subscribe((data) => {
        this.citizenReport = data.citizenReportDTO;
        this.moduleStatus = this.citizenReport.status;
        this.isComplete =
          AppConstants.CITIZEN_REPORT_MODULE.COPM_CLOSED !=
          this.citizenReport.status
            ? AppConstants.CITIZEN_REPORT_MODULE.COPM_REJECT !=
              this.citizenReport.status
            : false;

        this.isPending = this.citizenReport.status == AppConstants.PENDING;
      });
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };

  acceptApp = (acceptReject: number, id: string) => {
    this.apiCaller
      .apiPostCall(
        AppConstants.CITIZEN_REPORT_MODULE.SHO_HIDE_PUBLICE,
        {
          id: this.citizenReport.id,
          agreeReject: acceptReject,
        },
        true
      )
      .subscribe((data) => {
        this.closeModal(id);
        this.appStore.dispatch(new RefreshTableAndForm(true));
        this.fetchData();
      });
  };

  goBack() {
    this._location.back();
  }
}
