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
  selector: 'app-view-nhrc',
  templateUrl: './view-nhrc.component.html',
  styleUrls: ['./view-nhrc.component.scss'],
})
export class ViewNHRCComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  nhrc: any;

  changeStatusPath: string = AppConstants.NHRC_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'COMMISSION';
  assignForModule: string = 'COMMISSION';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.NHRC_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'COMMISSION';
  forwardDestinationId: number = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  isComplete: boolean = false;
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

    this.nhrc = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.nhrc.id;
    this.forwardDestinationId = this.nhrc.id;

    this.changeStatusSubmitURL = AppConstants.NHRC_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.NHRC_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.NHRC_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.NHRC_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.NHRC_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.NHRC_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.NHRC_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.CHANGE_STATUS_FORM
    );

    this.permissions.asssignToOfficer = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.ASSIGN_TO_OFFICER_FORM
    );

    this.permissions.changeStatusList = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.CHANGE_STATUS_TABLE
    );

    this.permissions.forwardToDestinationList = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.FORWARD_TO_OFFICER_TABLE
    );

    this.permissions.forwardToDestination = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.FORWARD_TO_OFFICER_FORM
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
        AppConstants.NHRC_MODULE.FETCH_VIEW_DATA,
        { id: this.nhrc.id },
        true
      )
      .subscribe((data) => {
        this.nhrc = data.commissionDTO;

        this.isComplete =
          AppConstants.NHRC_MODULE.COPM_CLOSED != this.nhrc.status
            ? AppConstants.NHRC_MODULE.COPM_REJECT != this.nhrc.status
            : false;
      });
  };

  goBack() {
    this._location.back();
  }
}
