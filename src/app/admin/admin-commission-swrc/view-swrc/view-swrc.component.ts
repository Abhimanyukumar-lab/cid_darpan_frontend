import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RefreshViewDataStop } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-swrc',
  templateUrl: './view-swrc.component.html',
  styleUrls: ['./view-swrc.component.scss'],
})
export class ViewSwrcComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  swrc: any;

  changeStatusPath: string = AppConstants.SWRC_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'COMMISSION';
  assignForModule: string = 'COMMISSION';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.SWRC_MODULE.FETCH_VIEW_FORWARDURL;
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

    this.swrc = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.swrc.id;
    this.forwardDestinationId = this.swrc.id;

    this.changeStatusSubmitURL = AppConstants.SWRC_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.SWRC_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.SWRC_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.SWRC_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.SWRC_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.SWRC_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.SWRC_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.CHANGE_STATUS_FORM
    );

    this.permissions.asssignToOfficer = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.ASSIGN_TO_OFFICER_FORM
    );

    this.permissions.changeStatusList = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.CHANGE_STATUS_TABLE
    );

    this.permissions.forwardToDestinationList = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.FORWARD_TO_OFFICER_TABLE
    );

    this.permissions.forwardToDestination = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.FORWARD_TO_OFFICER_FORM
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
        AppConstants.SWRC_MODULE.FETCH_VIEW_DATA,
        { id: this.swrc.id },
        true
      )
      .subscribe((data) => {
        this.swrc = data.commissionDTO;

        this.isComplete =
          AppConstants.SWRC_MODULE.COPM_CLOSED != this.swrc.status
            ? AppConstants.SWRC_MODULE.COPM_REJECT != this.swrc.status
            : false;
      });
  };

  goBack() {
    this._location.back();
  }
}
