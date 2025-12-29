import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshViewDataStart,
  RefreshViewDataStop,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-ecomm-dispatch',
  templateUrl: './view-ecomm-dispatch.component.html',
  styleUrls: ['./view-ecomm-dispatch.component.scss'],
})
export class ViewEcommDispatchComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  ecomDispatch: any;

  changeStatusPath: string =
    AppConstants.ECOM_DISPATCH_MODULE.FETCH_CHANGE_STATUS_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'DISPATCH';
  assignForModule: string = 'DISPATCH';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.ECOM_DISPATCH_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'DISPATCH';
  forwardDestinationId: number = null;

  forwardExtraInputLabel = 'ECOM_DISPATCH.DISP_NO';
  forwardExtraInputPlaceholder = 'ECOM_DISPATCH.DISP_NO';
  forwardExtraInputName = 'dispatchNo';
  forwardExtraInputFormControl = new UntypedFormControl(null);

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  // change status dropdown options
  changeStatusForModule: string = 'DISPATCH';
  moduleStatus: string = null;

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
    this.ecomDispatch = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.ecomDispatch.id;
    this.forwardDestinationId = this.ecomDispatch.id;

    this.changeStatusSubmitURL =
      AppConstants.ECOM_DISPATCH_MODULE.CHANGE_STATUS_SUBMIT;
    // this.assignToOfficerSubmitURL =
    //   AppConstants.ECOM_DISPATCH_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.ECOM_DISPATCH_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.ECOM_DISPATCH_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.ECOM_DISPATCH_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.ECOM_DISPATCH_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.ECOM_DISPATCH_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_DISPATCH_MODULE.CHANGE_STATUS_FORM
      );

    // this.permissions.asssignToOfficer =
    //   this.global.checkForUserButtonPermission(
    //     AppConstants.ECOM_DISPATCH_MODULE.ASSIGN_TO_OFFICER_FORM
    //   );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_DISPATCH_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_DISPATCH_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_DISPATCH_MODULE.FORWARD_TO_OFFICER_FORM
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
        AppConstants.ECOM_DISPATCH_MODULE.FETCH_VIEW_URL,
        { id: this.ecomDispatch.id },
        true
      )
      .subscribe((data) => {
        this.ecomDispatch = data.ecommDispatch;

        // this.isComplete =
        //   AppConstants.ECOM_DISPATCH_MODULE.COPM_CLOSED !=
        //   this.ecomDispatch.updateStatus
        //     ? AppConstants.ECOM_DISPATCH_MODULE.COPM_REJECT !=
        //       this.ecomDispatch.updateStatus
        //     : false;

        this.moduleStatus = this.ecomDispatch.ecommStatus;
      });
  };
}
