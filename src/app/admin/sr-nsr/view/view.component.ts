import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RefreshViewDataStop } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  entry: any;

  // changeStatusPath: string = AppConstants.COMPLAINT_MODULE.FETCH_VIEW_URL;
  // changeStatusDeleteCode: string;
  // changeStatusDeleteUrl: string;
  // changeStatusModule: string = 'POLICE_DIARY';
  // changeStatusId: number = null;

  // forwardDestinationPath: string =
  //   AppConstants.COMPLAINT_MODULE.FETCH_VIEW_FORWARDURL;
  // forwardDestinationDeleteCode: string;
  // forwardDestinationDeleteUrl: string;
  // forwardDestinationModule: string = 'POLICE_DIARY';
  // forwardDestinationId: number = null;

  // complaintSMS: string = 'police_diary';
  // // change status dropdown options
  // changeStatusForModule: string = 'POLICE_DIARY';
  // characterModuleStatus: string = null;

  // changeStatusSubmitURL: string;
  // assignToOfficerSubmitURL: string;
  // forwatdToDestinationSubmitURL: string;

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
    this.entry = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    // this.changeStatusId = this.entry.id;
    // this.forwardDestinationId = this.entry.id;

    // this.changeStatusSubmitURL =
    //   AppConstants.COMPLAINT_MODULE.CHANGE_STATUS_SUBMIT;
    // this.assignToOfficerSubmitURL =
    //   AppConstants.COMPLAINT_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    // this.forwatdToDestinationSubmitURL =
    //   AppConstants.COMPLAINT_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    // this.smsSendingSubmitURL = AppConstants.COMPLAINT_MODULE.SMS_SENDING_SUBMIT;

    // this.changeStatusDeleteCode =
    //   AppConstants.COMPLAINT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    // this.changeStatusDeleteUrl =
    //   AppConstants.COMPLAINT_MODULE.DETELE_CHECK_STATUS_URL;

    // this.forwardDestinationDeleteCode =
    //   AppConstants.COMPLAINT_MODULE.DELETE_FORWARD_TO_BUTTON;
    // this.forwardDestinationDeleteUrl =
    //   AppConstants.COMPLAINT_MODULE.DETELE_FORWARD_URL;

    // this.permissions.changeStatusForm =
    //   this.global.checkForUserButtonPermission(
    //     AppConstants.COMPLAINT_MODULE.CHANGE_STATUS_FORM
    //   );

    // this.permissions.asssignToOfficer =
    //   this.global.checkForUserButtonPermission(
    //     AppConstants.COMPLAINT_MODULE.ASSIGN_TO_OFFICER_FORM
    //   );

    // this.permissions.changeStatusList =
    //   this.global.checkForUserButtonPermission(
    //     AppConstants.COMPLAINT_MODULE.CHANGE_STATUS_TABLE
    //   );

    // this.permissions.forwardToDestinationList =
    //   this.global.checkForUserButtonPermission(
    //     AppConstants.COMPLAINT_MODULE.FORWARD_TO_OFFICER_TABLE
    //   );

    // this.permissions.forwardToDestination =
    //   this.global.checkForUserButtonPermission(
    //     AppConstants.COMPLAINT_MODULE.FORWARD_TO_OFFICER_FORM
    //   );
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
        AppConstants.SR_NSR_MODULE.FETCH_VIEW_DATA,
        { dataId: this.entry.id },
        true
      )
      .subscribe((data) => {
        this.entry = data.srNsr;

        // this.characterModuleStatus = this.entry.complaintStatus;

        // this.isComplete =
        //   AppConstants.COMPLAINT_MODULE.COPM_CLOSED !=
        //   this.entry.complaintStatus
        //     ? AppConstants.COMPLAINT_MODULE.COPM_REJECT !=
        //       this.entry.complaintStatus
        //     : false;

        // this.isPending = this.entry.complaintStatus == AppConstants.PENDING;
      });
  };
}
