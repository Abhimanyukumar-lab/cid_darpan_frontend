import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RefreshViewDataStop } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-rti',
  templateUrl: './view-rti.component.html',
  styleUrls: ['./view-rti.component.scss'],
})
export class ViewRtiComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  rti: any;

  changeStatusPath: string = AppConstants.RTI_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'RTI';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.RTI_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'RTI';
  forwardDestinationId: number = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  
  forwardExtraInputLabel = 'Dispatch No:';
  forwardExtraInputPlaceholder = 'Enter Dispatch Number';
  forwardExtraInputName = 'dispatchNo';
  forwardExtraInputFormControl = new UntypedFormControl(null);

  receiptNo = new UntypedFormControl('');
  isReceiptBlock: boolean = false;
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
    this.rti = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.rti.id;
    this.forwardDestinationId = this.rti.id;

    this.changeStatusSubmitURL = AppConstants.RTI_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.RTI_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.RTI_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.RTI_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.RTI_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.RTI_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.RTI_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.RTI_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.RTI_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.RTI_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.RTI_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.RTI_MODULE.FORWARD_TO_OFFICER_FORM
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
        AppConstants.RTI_MODULE.FETCH_VIEW_DATA,
        { id: this.rti.id },
        true
      )
      .subscribe((data) => {
        this.rti = data.rtiDTO;

        if (!this.rti.reciptNo) {
          this.isReceiptBlock = true;
        } else {
          this.isReceiptBlock = false;
        }

        this.isComplete =
          AppConstants.RTI_MODULE.COPM_CLOSED != this.rti.status
            ? AppConstants.RTI_MODULE.COPM_REJECT != this.rti.status
            : false;
      });
  };

  submitRecieptNo = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.RTI_MODULE.SUBMIT_REC_NO,
        {
          id: this.rti.id,
          reciptNo: this.receiptNo.value,
        },
        true
      )
      .subscribe((data) => {
        this.receiptNo.setValue('');
        this.fetchData();
      });
  };

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
