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
  selector: 'app-view-court-high',
  templateUrl: './view-court-high.component.html',
  styleUrls: ['./view-court-high.component.scss'],
})
export class ViewCourtHighComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  highCourt: any;

  courtDetailsPath: string =
    AppConstants.HIGH_COURT_MODULE.FETCH_COURT_DETAILS_LIST;
  courtDetailsDeleteCode: string = null;
  courtDetailsDeleteUrl: string = null;
  courtDetailsModule: string = 'COURT';
  courtDetailsId: number = null;
  changeStatusPath: string = AppConstants.HIGH_COURT_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'COURT';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.HIGH_COURT_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'COURT';
  forwardDestinationId: number = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;
  smsSendingSubmitURL: string;

  permissions: Permissions = new Permissions();

  isComplete: boolean = false;
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
    this.highCourt = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.courtDetailsId = this.highCourt.id;
    this.changeStatusId = this.highCourt.id;
    this.forwardDestinationId = this.highCourt.id;

    this.courtDetailsDeleteCode =
      AppConstants.HIGH_COURT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.courtDetailsDeleteUrl =
      AppConstants.HIGH_COURT_MODULE.DETELE_CHECK_STATUS_URL;

    this.changeStatusSubmitURL =
      AppConstants.HIGH_COURT_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.HIGH_COURT_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.HIGH_COURT_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.HIGH_COURT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.HIGH_COURT_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.HIGH_COURT_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.HIGH_COURT_MODULE.DETELE_FORWARD_URL;

    this.permissions.courtDetailsForm = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.CHANGE_STATUS_FORM
    );

    this.permissions.courtDetailsList = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.COURT_DETAILS_TABLE
    );

    this.permissions.changeStatusForm = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.CHANGE_STATUS_FORM
    );

    this.permissions.asssignToOfficer = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.ASSIGN_TO_OFFICER_FORM
    );

    this.permissions.changeStatusList = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.CHANGE_STATUS_TABLE
    );

    this.permissions.forwardToDestinationList = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.FORWARD_TO_OFFICER_TABLE
    );

    this.permissions.forwardToDestination = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.FORWARD_TO_OFFICER_FORM
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
        AppConstants.HIGH_COURT_MODULE.FETCH_VIEW_DATA,
        { id: this.highCourt.id },
        true
      )
      .subscribe((data) => {
        this.highCourt = data.courtDTO;

        this.isComplete =
          AppConstants.HIGH_COURT_MODULE.COPM_CLOSED != this.highCourt.status
            ? AppConstants.HIGH_COURT_MODULE.COPM_REJECT !=
              this.highCourt.status
            : false;
      });
  };
}
